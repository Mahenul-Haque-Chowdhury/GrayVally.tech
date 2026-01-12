"use client";

import { useMemo, useState } from "react";
import { Lock, LogOut } from "lucide-react";

const SESSION_KEY = "grayvally.invoice.unlocked.v1";

export function InvoiceGate({
  pin,
  children,
}: {
  pin: string;
  children: React.ReactNode;
}) {
  const normalizedPin = useMemo(() => String(pin ?? ""), [pin]);
  const [unlocked, setUnlocked] = useState(() => {
    if (typeof window === "undefined") return false;
    try {
      return window.sessionStorage.getItem(SESSION_KEY) === "1";
    } catch {
      return false;
    }
  });
  const [entered, setEntered] = useState("");
  const [error, setError] = useState<string | null>(null);

  function tryUnlock() {
    const ok = entered.trim() === normalizedPin;
    if (!ok) {
      setError("Wrong PIN");
      return;
    }

    setError(null);
    setUnlocked(true);
    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // ignore
    }
  }

  function lock() {
    setUnlocked(false);
    setEntered("");
    setError(null);
    try {
      sessionStorage.removeItem(SESSION_KEY);
    } catch {
      // ignore
    }
  }

  if (unlocked) {
    return (
      <div>
        <div className="mx-auto w-full max-w-6xl px-4 pt-6">
          <div className="flex justify-end">
            <button
              type="button"
              onClick={lock}
              className="inline-flex items-center gap-2 rounded-lg border border-[color:var(--border)] bg-[color:var(--card-bg)] px-3 py-2 text-sm font-medium text-text-secondary hover:text-text-primary"
              title="Lock invoice page"
            >
              <LogOut className="h-4 w-4" />
              Lock
            </button>
          </div>
        </div>
        {children}
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-[70vh] w-full max-w-2xl items-center px-4 py-10">
      <div className="w-full overflow-hidden rounded-2xl border border-[color:var(--border)] bg-[color:var(--card-bg)]">
        <div className="border-b border-[color:var(--border)] bg-background/40 p-5">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl border border-[color:var(--border)] bg-background">
              <Lock className="h-5 w-5" />
            </div>
            <div>
              <div className="text-lg font-semibold">Invoice page locked</div>
              <div className="text-sm text-text-secondary">Enter your PIN to continue.</div>
            </div>
          </div>
        </div>

        <div className="p-5">
          <label className="text-xs font-medium text-text-secondary">PIN</label>
          <input
            inputMode="numeric"
            autoComplete="one-time-code"
            className="mt-1 w-full rounded-lg bg-[color:var(--card-bg)] border border-[color:var(--border)] px-3 py-2 text-sm text-text-primary placeholder:text-text-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ring)]"
            value={entered}
            onChange={(e) => {
              setEntered(e.target.value);
              setError(null);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") tryUnlock();
            }}
            placeholder="••••"
          />

          {error ? <div className="mt-2 text-sm text-[color:var(--destructive)]">{error}</div> : null}

          <div className="mt-4 flex gap-2">
            <button
              type="button"
              onClick={tryUnlock}
              className="inline-flex items-center justify-center rounded-lg bg-[color:var(--accent)] px-4 py-2 text-sm font-semibold text-[color:var(--accent-foreground)] hover:opacity-90"
            >
              Unlock
            </button>
            <button
              type="button"
              onClick={() => {
                setEntered("");
                setError(null);
              }}
              className="inline-flex items-center justify-center rounded-lg border border-[color:var(--border)] bg-transparent px-4 py-2 text-sm font-medium text-text-secondary hover:text-text-primary"
            >
              Clear
            </button>
          </div>

          <div className="mt-4 text-xs text-text-secondary">
            This lock is client-side and intended for privacy, not strong security.
          </div>
        </div>
      </div>
    </div>
  );
}
