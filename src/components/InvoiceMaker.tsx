"use client";

import { useMemo, useState } from "react";
import NextImage from "next/image";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Plus, Trash2, Download, RotateCcw, Save } from "lucide-react";
import { FloatHeading } from "@/components/ui/ScrollFloat";

type CurrencyCode = "USD" | "BDT" | "EUR" | "GBP";

type PartyInfo = {
  name: string;
  address: string;
  email: string;
  phone: string;
  website: string;
  taxId: string;
};

type LineItem = {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
};

type DiscountType = "percent" | "fixed";

type InvoiceLineStyle = "detailed" | "simple";

type InvoiceDraft = {
  currency: CurrencyCode;
  lineStyle: InvoiceLineStyle;
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  from: PartyInfo;
  to: PartyInfo;
  items: LineItem[];
  discountType: DiscountType;
  discountValue: number;
  taxRate: number;
  notes: string;
  terms: string;
};

const STORAGE_KEY = "grayvally.invoice.draft.v1";

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

function addDaysISO(baseISO: string, days: number): string {
  const base = new Date(baseISO + "T00:00:00");
  base.setDate(base.getDate() + days);
  return base.toISOString().slice(0, 10);
}

function makeId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `id_${Math.random().toString(16).slice(2)}_${Date.now()}`;
}

function makeDefaultDraft(): InvoiceDraft {
  const issueDate = todayISO();
  const invoiceNumber = `INV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

  return {
    currency: "USD",
    lineStyle: "detailed",
    invoiceNumber,
    issueDate,
    dueDate: addDaysISO(issueDate, 7),
    from: {
      name: "GrayVally",
      address: "Dhaka, Bangladesh",
      email: "support@grayvally.tech",
      phone: "+8801608613747",
      website: "https://grayvally.tech",
      taxId: "",
    },
    to: {
      name: "",
      address: "",
      email: "",
      phone: "",
      website: "",
      taxId: "",
    },
    items: [
      {
        id: makeId(),
        description: "Web development services",
        quantity: 1,
        unitPrice: 500,
      },
    ],
    discountType: "percent",
    discountValue: 0,
    taxRate: 0,
    notes: "Thank you for your business.",
    terms: "Payment due within 7 days.",
  };
}

function safeNumber(value: unknown, fallback = 0): number {
  const n = typeof value === "number" ? value : Number(value);
  return Number.isFinite(n) ? n : fallback;
}

function clampNonNegative(n: number): number {
  return n < 0 ? 0 : n;
}

function money(amount: number, currency: CurrencyCode): string {
  try {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch {
    return `${amount.toFixed(2)} ${currency}`;
  }
}

function inputBaseClass(): string {
  return "w-full rounded-lg bg-[color:var(--card-bg)] border border-[color:var(--border)] px-3 py-2 text-sm text-text-primary placeholder:text-text-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)]";
}

function labelClass(): string {
  return "text-xs font-medium text-text-secondary";
}

async function loadImageDataUrl(src: string): Promise<{ dataUrl: string; width: number; height: number } | null> {
  try {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.decoding = "async";

    const loaded = new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error("Failed to load image"));
    });

    img.src = src;
    await loaded;

    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, img.naturalWidth || img.width || 1);
    canvas.height = Math.max(1, img.naturalHeight || img.height || 1);

    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    ctx.drawImage(img, 0, 0);
    const dataUrl = canvas.toDataURL("image/png");
    return { dataUrl, width: canvas.width, height: canvas.height };
  } catch {
    return null;
  }
}

export function InvoiceMaker() {
  const [draft, setDraft] = useState<InvoiceDraft>(() => {
    const base = makeDefaultDraft();
    if (typeof window === "undefined") return base;

    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return base;

      const parsed = JSON.parse(raw) as Partial<InvoiceDraft>;
      if (!parsed || typeof parsed !== "object") return base;

      return {
        ...base,
        ...parsed,
        from: { ...base.from, ...(parsed.from ?? {}) },
        to: { ...base.to, ...(parsed.to ?? {}) },
        items:
          Array.isArray(parsed.items) && parsed.items.length > 0
            ? parsed.items.map((it) => ({
                id: typeof it?.id === "string" ? it.id : makeId(),
                description: typeof it?.description === "string" ? it.description : "",
                quantity: clampNonNegative(safeNumber(it?.quantity, 1)),
                unitPrice: clampNonNegative(safeNumber(it?.unitPrice, 0)),
              }))
            : base.items,
        discountType: parsed.discountType === "fixed" ? "fixed" : "percent",
        discountValue: clampNonNegative(safeNumber(parsed.discountValue, 0)),
        taxRate: clampNonNegative(safeNumber(parsed.taxRate, 0)),
        currency: (parsed.currency as CurrencyCode) ?? base.currency,
        lineStyle: parsed.lineStyle === "simple" ? "simple" : "detailed",
      };
    } catch {
      return base;
    }
  });

  const totals = useMemo(() => {
    const subtotal = draft.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
    const discountAmount = draft.discountType === "percent"
      ? (subtotal * clampNonNegative(draft.discountValue)) / 100
      : clampNonNegative(draft.discountValue);
    const taxable = Math.max(0, subtotal - discountAmount);
    const taxAmount = (taxable * clampNonNegative(draft.taxRate)) / 100;
    const total = Math.max(0, taxable + taxAmount);

    return {
      subtotal,
      discountAmount,
      taxAmount,
      total,
    };
  }, [draft.items, draft.discountType, draft.discountValue, draft.taxRate]);

  function update<K extends keyof InvoiceDraft>(key: K, value: InvoiceDraft[K]) {
    setDraft((prev) => ({ ...prev, [key]: value }));
  }

  function updateParty(which: "from" | "to", key: keyof PartyInfo, value: string) {
    setDraft((prev) => ({
      ...prev,
      [which]: {
        ...prev[which],
        [key]: value,
      },
    }));
  }

  function updateItem(id: string, key: keyof Omit<LineItem, "id">, value: string) {
    setDraft((prev) => ({
      ...prev,
      items: prev.items.map((item) => {
        if (item.id !== id) return item;
        if (key === "description") return { ...item, description: value };
        if (key === "quantity") return { ...item, quantity: clampNonNegative(safeNumber(value, 0)) };
        return { ...item, unitPrice: clampNonNegative(safeNumber(value, 0)) };
      }),
    }));
  }

  function addItem() {
    setDraft((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        { id: makeId(), description: "", quantity: 1, unitPrice: 0 },
      ],
    }));
  }

  function removeItem(id: string) {
    setDraft((prev) => ({
      ...prev,
      items: prev.items.length <= 1 ? prev.items : prev.items.filter((i) => i.id !== id),
    }));
  }

  function saveDraft() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
    } catch {
      // ignore
    }
  }

  function resetDraft() {
    setDraft(makeDefaultDraft());
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }

  async function exportPdf() {
    const doc = new jsPDF({ unit: "pt", format: "a4" });

    const marginX = 48;
    let y = 56;

    const logo = await loadImageDataUrl("/GrayVally.png");

    const logoTargetH = 26;
    const logoGap = 10;
    let titleX = marginX;

    if (logo?.dataUrl) {
      const ratio = logo.width / logo.height;
      const logoW = Math.max(1, Math.round(logoTargetH * ratio));
      try {
        doc.addImage(logo.dataUrl, "PNG", marginX, y - logoTargetH + 4, logoW, logoTargetH);
        titleX = marginX + logoW + logoGap;
      } catch {
        // ignore
      }
    }

    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text(draft.from.name || "Invoice", titleX, y);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);

    y += 18;
    const fromLines = [draft.from.address, draft.from.email, draft.from.phone, draft.from.website, draft.from.taxId ? `Tax ID: ${draft.from.taxId}` : ""]
      .filter(Boolean);
    fromLines.forEach((line) => {
      doc.text(String(line), marginX, y);
      y += 14;
    });

    const rightX = 360;
    let ry = 74;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("INVOICE", rightX, ry);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    ry += 16;
    doc.text(`Invoice #: ${draft.invoiceNumber}`, rightX, ry);
    ry += 14;
    doc.text(`Issue date: ${draft.issueDate}`, rightX, ry);
    ry += 14;
    doc.text(`Due date: ${draft.dueDate}`, rightX, ry);

    y = Math.max(y + 12, ry + 20);

    doc.setDrawColor(39, 39, 42);
    doc.line(marginX, y, 547, y);
    y += 18;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("Bill To", marginX, y);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    y += 14;
    const toLines = [draft.to.name, draft.to.address, draft.to.email, draft.to.phone, draft.to.website, draft.to.taxId ? `Tax ID: ${draft.to.taxId}` : ""]
      .filter(Boolean);
    if (toLines.length === 0) {
      doc.text("(Client details)", marginX, y);
      y += 14;
    } else {
      toLines.forEach((line) => {
        doc.text(String(line), marginX, y);
        y += 14;
      });
    }

    y += 12;

    if (draft.lineStyle === "simple") {
      const body = draft.items.map((it) => [it.description || "(service)"]);
      autoTable(doc, {
        startY: y,
        head: [["Description"]],
        body,
        styles: { font: "helvetica", fontSize: 10, cellPadding: 6 },
        headStyles: { fillColor: [10, 10, 10], textColor: [229, 229, 229] },
        margin: { left: marginX, right: marginX },
      });
    } else {
      const body = draft.items.map((it) => {
        const lineTotal = it.quantity * it.unitPrice;
        return [
          it.description || "(item)",
          String(it.quantity),
          money(it.unitPrice, draft.currency),
          money(lineTotal, draft.currency),
        ];
      });

      autoTable(doc, {
        startY: y,
        head: [["Description", "Qty", "Unit Price", "Amount"]],
        body,
        styles: { font: "helvetica", fontSize: 10, cellPadding: 6 },
        headStyles: { fillColor: [10, 10, 10], textColor: [229, 229, 229] },
        columnStyles: {
          1: { halign: "right" },
          2: { halign: "right" },
          3: { halign: "right" },
        },
        margin: { left: marginX, right: marginX },
      });
    }

    const finalY = (doc as unknown as { lastAutoTable?: { finalY: number } }).lastAutoTable?.finalY ?? y;
    let ty = finalY + 18;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);

    const summaryX = 360;
    doc.text(`Subtotal: ${money(totals.subtotal, draft.currency)}`, summaryX, ty);
    ty += 14;
    doc.text(`Discount: -${money(totals.discountAmount, draft.currency)}`, summaryX, ty);
    ty += 14;
    doc.text(`Tax: ${money(totals.taxAmount, draft.currency)}`, summaryX, ty);
    ty += 16;

    doc.setFont("helvetica", "bold");
    doc.text(`Total: ${money(totals.total, draft.currency)}`, summaryX, ty);

    ty += 22;
    doc.setFont("helvetica", "bold");
    doc.text("Notes", marginX, ty);
    doc.setFont("helvetica", "normal");
    ty += 12;
    doc.text(draft.notes || "", marginX, ty, { maxWidth: 520 });

    ty += 40;
    doc.setFont("helvetica", "bold");
    doc.text("Terms", marginX, ty);
    doc.setFont("helvetica", "normal");
    ty += 12;
    doc.text(draft.terms || "", marginX, ty, { maxWidth: 520 });

    doc.save(`invoice-${draft.invoiceNumber}.pdf`);
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10">
      <div className="mb-6 flex flex-col gap-2">
        <FloatHeading as="h1" className="text-3xl font-bold tracking-tight">Invoice Maker</FloatHeading>
        <p className="text-text-secondary text-sm">
          Private tool (not linked anywhere). Fill the form, then export as PDF.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--card-bg)] p-5">
          <div className="flex items-center justify-between gap-3">
            <FloatHeading as="h2" className="text-lg font-semibold">Details</FloatHeading>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={saveDraft}
                className="inline-flex items-center gap-2 rounded-lg bg-[color:var(--surface-highlight)] px-3 py-2 text-sm font-medium text-text-primary border border-[color:var(--border)] hover:opacity-90"
                title="Save draft (local)"
              >
                <Save className="h-4 w-4" />
                Save
              </button>
              <button
                type="button"
                onClick={resetDraft}
                className="inline-flex items-center gap-2 rounded-lg bg-transparent px-3 py-2 text-sm font-medium text-text-secondary border border-[color:var(--border)] hover:text-text-primary"
                title="Reset"
              >
                <RotateCcw className="h-4 w-4" />
                Reset
              </button>
              <button
                type="button"
                onClick={() => void exportPdf()}
                className="inline-flex items-center gap-2 rounded-lg bg-[color:var(--accent)] px-3 py-2 text-sm font-semibold text-[color:var(--accent-foreground)] hover:opacity-90"
                title="Download PDF"
              >
                <Download className="h-4 w-4" />
                Export PDF
              </button>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass()}>Invoice #</label>
              <input
                className={inputBaseClass()}
                value={draft.invoiceNumber}
                onChange={(e) => update("invoiceNumber", e.target.value)}
              />
            </div>
            <div>
              <label className={labelClass()}>Invoice style</label>
              <select
                className={inputBaseClass()}
                value={draft.lineStyle}
                onChange={(e) => update("lineStyle", e.target.value as InvoiceLineStyle)}
              >
                <option value="detailed">Detailed (Qty / Unit / Amount)</option>
                <option value="simple">Simple (Description only)</option>
              </select>
            </div>
            <div>
              <label className={labelClass()}>Currency</label>
              <select
                className={inputBaseClass()}
                value={draft.currency}
                onChange={(e) => update("currency", e.target.value as CurrencyCode)}
              >
                <option value="USD">USD</option>
                <option value="BDT">BDT</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
              </select>
            </div>
            <div>
              <label className={labelClass()}>Issue date</label>
              <input
                type="date"
                className={inputBaseClass()}
                value={draft.issueDate}
                onChange={(e) => update("issueDate", e.target.value)}
              />
            </div>
            <div>
              <label className={labelClass()}>Due date</label>
              <input
                type="date"
                className={inputBaseClass()}
                value={draft.dueDate}
                onChange={(e) => update("dueDate", e.target.value)}
              />
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6">
            <div className="grid grid-cols-1 gap-4 rounded-xl border border-[color:var(--border)] p-4">
              <FloatHeading as="h3" className="text-sm font-semibold">From</FloatHeading>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelClass()}>Company name</label>
                  <input className={inputBaseClass()} value={draft.from.name} onChange={(e) => updateParty("from", "name", e.target.value)} />
                </div>
                <div>
                  <label className={labelClass()}>Tax/VAT ID</label>
                  <input className={inputBaseClass()} value={draft.from.taxId} onChange={(e) => updateParty("from", "taxId", e.target.value)} />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelClass()}>Address</label>
                  <textarea className={inputBaseClass()} rows={2} value={draft.from.address} onChange={(e) => updateParty("from", "address", e.target.value)} />
                </div>
                <div>
                  <label className={labelClass()}>Email</label>
                  <input className={inputBaseClass()} value={draft.from.email} onChange={(e) => updateParty("from", "email", e.target.value)} />
                </div>
                <div>
                  <label className={labelClass()}>Phone</label>
                  <input className={inputBaseClass()} value={draft.from.phone} onChange={(e) => updateParty("from", "phone", e.target.value)} />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelClass()}>Website</label>
                  <input className={inputBaseClass()} value={draft.from.website} onChange={(e) => updateParty("from", "website", e.target.value)} />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 rounded-xl border border-[color:var(--border)] p-4">
              <FloatHeading as="h3" className="text-sm font-semibold">Bill To</FloatHeading>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelClass()}>Client name</label>
                  <input className={inputBaseClass()} value={draft.to.name} onChange={(e) => updateParty("to", "name", e.target.value)} />
                </div>
                <div>
                  <label className={labelClass()}>Tax/VAT ID</label>
                  <input className={inputBaseClass()} value={draft.to.taxId} onChange={(e) => updateParty("to", "taxId", e.target.value)} />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelClass()}>Address</label>
                  <textarea className={inputBaseClass()} rows={2} value={draft.to.address} onChange={(e) => updateParty("to", "address", e.target.value)} />
                </div>
                <div>
                  <label className={labelClass()}>Email</label>
                  <input className={inputBaseClass()} value={draft.to.email} onChange={(e) => updateParty("to", "email", e.target.value)} />
                </div>
                <div>
                  <label className={labelClass()}>Phone</label>
                  <input className={inputBaseClass()} value={draft.to.phone} onChange={(e) => updateParty("to", "phone", e.target.value)} />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelClass()}>Website</label>
                  <input className={inputBaseClass()} value={draft.to.website} onChange={(e) => updateParty("to", "website", e.target.value)} />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-[color:var(--border)] p-4">
            <div className="flex items-center justify-between">
              <FloatHeading as="h3" className="text-sm font-semibold">Line items</FloatHeading>
              <button
                type="button"
                onClick={addItem}
                className="inline-flex items-center gap-2 rounded-lg bg-[color:var(--surface-highlight)] px-3 py-2 text-sm font-medium text-text-primary border border-[color:var(--border)] hover:opacity-90"
              >
                <Plus className="h-4 w-4" />
                Add item
              </button>
            </div>

            <div className="mt-4 flex flex-col gap-3">
              {draft.items.map((item) => (
                <div key={item.id} className="grid grid-cols-1 gap-3 rounded-xl border border-[color:var(--border)] p-3 sm:grid-cols-12">
                  <div className="sm:col-span-6">
                    <label className={labelClass()}>Description</label>
                    <input
                      className={inputBaseClass()}
                      value={item.description}
                      onChange={(e) => updateItem(item.id, "description", e.target.value)}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelClass()}>Qty</label>
                    <input
                      inputMode="decimal"
                      className={inputBaseClass()}
                      value={String(item.quantity)}
                      onChange={(e) => updateItem(item.id, "quantity", e.target.value)}
                    />
                  </div>
                  <div className="sm:col-span-3">
                    <label className={labelClass()}>Unit price</label>
                    <input
                      inputMode="decimal"
                      className={inputBaseClass()}
                      value={String(item.unitPrice)}
                      onChange={(e) => updateItem(item.id, "unitPrice", e.target.value)}
                    />
                  </div>
                  <div className="sm:col-span-1 flex sm:items-end">
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="mt-5 inline-flex w-full items-center justify-center rounded-lg border border-[color:var(--border)] bg-transparent px-2 py-2 text-text-secondary hover:text-text-primary"
                      title="Remove"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label className={labelClass()}>Discount type</label>
                <select
                  className={inputBaseClass()}
                  value={draft.discountType}
                  onChange={(e) => update("discountType", e.target.value as DiscountType)}
                >
                  <option value="percent">Percent (%)</option>
                  <option value="fixed">Fixed amount</option>
                </select>
              </div>
              <div>
                <label className={labelClass()}>Discount</label>
                <input
                  inputMode="decimal"
                  className={inputBaseClass()}
                  value={String(draft.discountValue)}
                  onChange={(e) => update("discountValue", clampNonNegative(safeNumber(e.target.value, 0)))}
                />
              </div>
              <div>
                <label className={labelClass()}>Tax rate (%)</label>
                <input
                  inputMode="decimal"
                  className={inputBaseClass()}
                  value={String(draft.taxRate)}
                  onChange={(e) => update("taxRate", clampNonNegative(safeNumber(e.target.value, 0)))}
                />
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass()}>Notes</label>
              <textarea
                className={inputBaseClass()}
                rows={4}
                value={draft.notes}
                onChange={(e) => update("notes", e.target.value)}
              />
            </div>
            <div>
              <label className={labelClass()}>Terms</label>
              <textarea
                className={inputBaseClass()}
                rows={4}
                value={draft.terms}
                onChange={(e) => update("terms", e.target.value)}
              />
            </div>
          </div>

          <p className="mt-4 text-xs text-text-secondary">
            Draft auto-loads from this browser (localStorage). Use Save/Reset to control it.
          </p>
        </section>

        <section className="rounded-2xl border border-[color:var(--border)] bg-[color:var(--card-bg)] p-5">
          <FloatHeading as="h2" className="text-lg font-semibold">Preview</FloatHeading>

          <div className="mt-4 overflow-hidden rounded-xl border border-[color:var(--border)] bg-background">
            <div className="relative border-b border-[color:var(--border)] bg-[color:var(--card-bg)]/60 p-5">
              <div className="absolute inset-0 opacity-25 [background:radial-gradient(600px_circle_at_10%_0%,hsl(var(--accent)/0.35),transparent_40%)]" />
              <div className="relative flex items-start justify-between gap-6">
                <div>
                  <div className="flex items-center gap-3">
                    <NextImage
                      src="/GrayVally.png"
                      alt="GrayVally logo"
                      width={36}
                      height={36}
                      priority
                      className="h-9 w-9 rounded-md border border-[color:var(--border)] bg-white object-contain"
                    />
                    <div>
                      <div className="text-xl font-bold leading-tight">{draft.from.name || "Invoice"}</div>
                      <div className="mt-0.5 text-xs text-text-secondary">{draft.from.website || ""}</div>
                    </div>
                  </div>

                  <div className="mt-3 whitespace-pre-line text-sm text-text-secondary">{draft.from.address}</div>
                  <div className="mt-2 space-y-1 text-sm text-text-secondary">
                    {[draft.from.email, draft.from.phone, draft.from.taxId ? `Tax ID: ${draft.from.taxId}` : ""]
                      .filter(Boolean)
                      .map((line) => (
                        <div key={String(line)}>{line}</div>
                      ))}
                  </div>
                </div>

                <div className="flex flex-col items-end gap-3 text-right">
                  <div className="inline-flex items-center rounded-full border border-[color:var(--border)] bg-background px-3 py-1 text-xs font-semibold tracking-wide">
                    INVOICE
                  </div>
                  <div className="w-full max-w-xs rounded-xl border border-[color:var(--border)] bg-background/60 p-3">
                    <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-sm">
                      <div className="text-text-secondary">Invoice #</div>
                      <div className="font-medium">{draft.invoiceNumber}</div>
                      <div className="text-text-secondary">Issue</div>
                      <div>{draft.issueDate}</div>
                      <div className="text-text-secondary">Due</div>
                      <div>{draft.dueDate}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-[color:var(--border)] bg-[color:var(--card-bg)]/40 p-4">
                  <div className="text-xs font-semibold tracking-wide text-text-secondary">BILL TO</div>
                  <div className="mt-1 text-sm font-semibold">{draft.to.name || "(Client)"}</div>
                  <div className="mt-1 whitespace-pre-line text-sm text-text-secondary">{draft.to.address}</div>
                  <div className="mt-2 space-y-1 text-sm text-text-secondary">
                    {[draft.to.email, draft.to.phone, draft.to.website, draft.to.taxId ? `Tax ID: ${draft.to.taxId}` : ""]
                      .filter(Boolean)
                      .map((line) => (
                        <div key={String(line)}>{line}</div>
                      ))}
                  </div>
                </div>

                <div className="rounded-xl border border-[color:var(--border)] bg-[color:var(--card-bg)]/40 p-4">
                  <div className="text-xs font-semibold tracking-wide text-text-secondary">SUMMARY</div>
                  <div className="mt-3 space-y-2 text-sm">
                    <div className="flex justify-between text-text-secondary">
                      <span>Subtotal</span>
                      <span>{money(totals.subtotal, draft.currency)}</span>
                    </div>
                    <div className="flex justify-between text-text-secondary">
                      <span>Discount</span>
                      <span>-{money(totals.discountAmount, draft.currency)}</span>
                    </div>
                    <div className="flex justify-between text-text-secondary">
                      <span>Tax</span>
                      <span>{money(totals.taxAmount, draft.currency)}</span>
                    </div>
                    <div className="mt-2 flex items-center justify-between rounded-lg border border-[color:var(--border)] bg-background px-3 py-2 font-semibold">
                      <span>Total</span>
                      <span className="text-[color:var(--accent)]">{money(totals.total, draft.currency)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 overflow-x-auto rounded-xl border border-[color:var(--border)]">
                {draft.lineStyle === "simple" ? (
                  <table className="w-full text-sm">
                    <thead className="bg-[color:var(--card-bg)]/70">
                      <tr className="text-left text-xs uppercase tracking-wide text-text-secondary">
                        <th className="px-4 py-3">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {draft.items.map((it, idx) => (
                        <tr
                          key={it.id}
                          className={
                            "border-t border-[color:var(--border)] " +
                            (idx % 2 === 0 ? "bg-background" : "bg-[color:var(--card-bg)]/20")
                          }
                        >
                          <td className="px-4 py-3">{it.description || "(service)"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <table className="w-full text-sm">
                    <thead className="bg-[color:var(--card-bg)]/70">
                      <tr className="text-left text-xs uppercase tracking-wide text-text-secondary">
                        <th className="px-4 py-3">Description</th>
                        <th className="px-4 py-3 text-right">Qty</th>
                        <th className="px-4 py-3 text-right">Unit</th>
                        <th className="px-4 py-3 text-right">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {draft.items.map((it, idx) => {
                        const lineTotal = it.quantity * it.unitPrice;
                        return (
                          <tr
                            key={it.id}
                            className={
                              "border-t border-[color:var(--border)] " +
                              (idx % 2 === 0 ? "bg-background" : "bg-[color:var(--card-bg)]/20")
                            }
                          >
                            <td className="px-4 py-3">{it.description || "(item)"}</td>
                            <td className="px-4 py-3 text-right">{it.quantity}</td>
                            <td className="px-4 py-3 text-right">{money(it.unitPrice, draft.currency)}</td>
                            <td className="px-4 py-3 text-right font-medium">{money(lineTotal, draft.currency)}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>

              {(draft.notes || draft.terms) ? (
                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-[color:var(--border)] bg-[color:var(--card-bg)]/40 p-4">
                    <div className="text-xs font-semibold tracking-wide text-text-secondary">NOTES</div>
                    <div className="mt-2 whitespace-pre-line text-sm text-text-secondary">{draft.notes}</div>
                  </div>
                  <div className="rounded-xl border border-[color:var(--border)] bg-[color:var(--card-bg)]/40 p-4">
                    <div className="text-xs font-semibold tracking-wide text-text-secondary">TERMS</div>
                    <div className="mt-2 whitespace-pre-line text-sm text-text-secondary">{draft.terms}</div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          <p className="mt-4 text-xs text-text-secondary">
            Tip: hit Export PDF to download. For best results, keep addresses short.
          </p>
        </section>
      </div>
    </div>
  );
}

