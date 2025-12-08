"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { allServices } from "@/data/services";

const dialingCodes = [
  "+1",
  "+7",
  "+20",
  "+27",
  "+30",
  "+31",
  "+32",
  "+33",
  "+34",
  "+36",
  "+39",
  "+40",
  "+41",
  "+43",
  "+44",
  "+45",
  "+46",
  "+47",
  "+48",
  "+49",
  "+51",
  "+52",
  "+53",
  "+54",
  "+55",
  "+56",
  "+57",
  "+58",
  "+60",
  "+61",
  "+62",
  "+63",
  "+64",
  "+65",
  "+66",
  "+81",
  "+82",
  "+84",
  "+86",
  "+90",
  "+91",
  "+92",
  "+93",
  "+94",
  "+95",
  "+98",
  "+211",
  "+212",
  "+213",
  "+216",
  "+218",
  "+220",
  "+221",
  "+222",
  "+223",
  "+224",
  "+225",
  "+226",
  "+227",
  "+228",
  "+229",
  "+230",
  "+231",
  "+232",
  "+233",
  "+234",
  "+235",
  "+236",
  "+237",
  "+238",
  "+239",
  "+240",
  "+241",
  "+242",
  "+243",
  "+244",
  "+245",
  "+246",
  "+248",
  "+249",
  "+250",
  "+251",
  "+252",
  "+253",
  "+254",
  "+255",
  "+256",
  "+257",
  "+258",
  "+260",
  "+261",
  "+262",
  "+263",
  "+264",
  "+265",
  "+266",
  "+267",
  "+268",
  "+269",
  "+290",
  "+291",
  "+297",
  "+298",
  "+299",
  "+350",
  "+351",
  "+352",
  "+353",
  "+354",
  "+355",
  "+356",
  "+357",
  "+358",
  "+359",
  "+370",
  "+371",
  "+372",
  "+373",
  "+374",
  "+375",
  "+376",
  "+377",
  "+378",
  "+380",
  "+381",
  "+382",
  "+385",
  "+386",
  "+387",
  "+389",
  "+420",
  "+421",
  "+423",
  "+500",
  "+501",
  "+502",
  "+503",
  "+504",
  "+505",
  "+506",
  "+507",
  "+508",
  "+509",
  "+590",
  "+591",
  "+592",
  "+593",
  "+594",
  "+595",
  "+596",
  "+597",
  "+598",
  "+599",
  "+670",
  "+672",
  "+673",
  "+674",
  "+675",
  "+676",
  "+677",
  "+678",
  "+679",
  "+680",
  "+681",
  "+682",
  "+683",
  "+685",
  "+686",
  "+687",
  "+688",
  "+689",
  "+690",
  "+691",
  "+692",
  "+850",
  "+852",
  "+853",
  "+855",
  "+856",
  "+870",
  "+871",
  "+872",
  "+873",
  "+874",
  "+880",
  "+886",
  "+960",
  "+961",
  "+962",
  "+963",
  "+964",
  "+965",
  "+966",
  "+967",
  "+968",
  "+970",
  "+971",
  "+972",
  "+973",
  "+974",
  "+975",
  "+976",
  "+977",
  "+992",
  "+993",
  "+994",
  "+995",
  "+996",
  "+998",
];

export function Contact() {
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setStatus("idle");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/xovgnknl", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-background pt-24 sm:pt-28 pb-16 sm:pb-24">
      <section className="mx-auto flex max-w-5xl flex-col gap-10 sm:gap-12 md:gap-14 px-4 sm:px-6 md:flex-row">
        <div className="w-full md:w-3/5">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary md:text-4xl">
            Let&apos;s talk about your project.
          </h1>
          <p className="mt-3 text-sm text-text-secondary sm:text-base">
            Share a bit about what you&apos;re building, and I&apos;ll
            get back to you with next steps, timelines, and
            possibilities.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="w-full">
                <label className="block text-[11px] font-medium uppercase tracking-wide text-text-secondary">
                  Full Name
                </label>
                <input
                  required
                  type="text"
                  name="fullName"
                  className="mt-2 w-full rounded-lg border border-border/60 bg-background/60 px-3 py-2.5 text-sm text-text-primary outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium uppercase tracking-wide text-text-secondary">
                  Email
                </label>
                <input
                  required
                  type="email"
                  name="email"
                  className="mt-2 w-full rounded-lg border border-border/60 bg-background/60 px-3 py-2.5 text-sm text-text-primary outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
                  placeholder="you@company.com"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1.4fr)]">
              <div className="min-w-[8rem]">
                <label className="block text-[11px] font-medium uppercase tracking-wide text-text-secondary">
                  Company <span className="text-xs lowercase text-text-secondary/60">(optional)</span>
                </label>
                <input
                  type="text"
                  name="company"
                  className="mt-2 w-full rounded-lg border border-border/60 bg-background/60 px-3 py-2.5 text-sm text-text-primary outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
                  placeholder="Company or team name"
                />
              </div>
              <div className="min-w-[11rem]">
                <label className="block text-[11px] font-medium uppercase tracking-wide text-text-secondary">
                  Mobile
                </label>
                <div className="mt-2 flex gap-2 items-center">
                  <select
                    name="countryCode"
                    className="w-[70px] rounded-lg border border-border/60 bg-background/60 px-2 py-2 text-xs text-text-primary outline-none focus:border-accent focus:ring-1 focus:ring-accent flex-shrink-0"
                    defaultValue="+880"
                  >
                    {dialingCodes.map((code) => (
                      <option key={code} value={code}>
                        {code}
                      </option>
                    ))}
                  </select>
                  <div className="flex-1 min-w-[9rem]">
                    <input
                      required
                      type="tel"
                      name="phone"
                      className="mt-0 w-full rounded-lg border border-border/60 bg-background/60 px-3 py-2.5 text-sm text-text-primary outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
                      placeholder="Your phone number"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-medium uppercase tracking-wide text-text-secondary">
                Project of interest
              </label>
              <select
                name="projectInterest"
                required
                className="mt-2 w-full rounded-lg border border-border/60 bg-background/60 px-3 py-2.5 text-sm text-text-primary outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                defaultValue=""
              >
                <option value="" disabled>
                  Select a service
                </option>
                {allServices.map((service) => (
                  <option key={service.id} value={service.title}>
                    {service.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-medium uppercase tracking-wide text-text-secondary">
                Tell me about your project
              </label>
              <textarea
                required
                name="description"
                rows={5}
                className="mt-2 w-full rounded-xl border border-border/60 bg-background/60 px-3 py-2.5 text-sm text-text-primary outline-none transition-colors focus:border-accent focus:ring-1 focus:ring-accent"
                placeholder="What are you building? Timelines, scope, existing stack, or links are all helpful."
              />
            </div>

            <div className="flex items-start gap-3">
              <input
                required
                id="agreement"
                type="checkbox"
                name="agreement"
                className="mt-1 h-4 w-4 rounded border-border bg-surface text-accent focus:ring-accent"
              />
              <label htmlFor="agreement" className="text-xs text-text-secondary">
                I agree that my information may be used to contact me about this
                inquiry. Your details will never be shared or sold.
              </label>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center justify-center rounded-md bg-text-primary px-6 py-2 text-sm font-medium text-background transition-transform hover:scale-[1.02] active:scale-95 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {submitting ? "Sending..." : "Submit inquiry"}
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-surface/40 px-4 py-2 text-xs sm:text-sm font-medium text-text-secondary hover:border-blue-500/60 hover:text-blue-400 hover:bg-surface/70 transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                Live chat (coming soon)
              </button>
            </div>

            {status === "success" && (
              <p className="text-xs text-emerald-500">
                Thanks for reaching out. I&apos;ll get back to you shortly.
              </p>
            )}
            {status === "error" && (
              <p className="text-xs text-red-500">
                Something went wrong sending your message. Please try again in a moment or email
                {" "}
                <a
                  href="mailto:contact@grayvally.tech"
                  className="underline underline-offset-2"
                >
                  contact@grayvally.tech
                </a>
                .
              </p>
            )}
          </form>
        </div>

        <aside className="w-full md:w-2/5 border-t md:border-t-0 md:border-l border-border pt-8 md:pt-0 md:pl-8 lg:pl-10">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Image
                src="/GrayVally.png"
                alt="GrayVally logo"
                width={32}
                height={32}
                className="h-8 w-8"
              />
              <div>
                <p className="text-sm font-medium text-text-primary">GrayVally</p>
                <p className="text-xs text-text-secondary">Gulshan 1, Dhaka, Bangladesh</p>
              </div>
            </div>

            <div className="space-y-3 text-sm text-text-secondary">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-text-secondary/70">
                  Support
                </p>
                <a
                  href="mailto:support@grayvally.tech"
                  className="mt-1 inline-flex items-center gap-2 text-text-primary underline-offset-2 hover:underline break-all"
                >
                  <Mail className="h-4 w-4" />
                  support@grayvally.tech
                </a>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-text-secondary/70">
                  General inquiries
                </p>
                <a
                  href="mailto:contact@grayvally.tech"
                  className="mt-1 inline-flex items-center gap-2 text-text-primary underline-offset-2 hover:underline break-all"
                >
                  <Mail className="h-4 w-4" />
                  contact@grayvally.tech
                </a>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-text-secondary/70">
                  Partnerships &amp; media
                </p>
                <a
                  href="mailto:mahenulhaque@grayvally.tech"
                  className="mt-1 inline-flex items-center gap-2 text-text-primary underline-offset-2 hover:underline break-all"
                >
                  <Mail className="h-4 w-4" />
                  mahenulhaque@grayvally.tech
                </a>
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-text-secondary/70">
                  Phone
                </p>
                <a
                  href="tel:+8801798651950"
                  className="mt-1 inline-flex items-center gap-2 text-text-primary underline-offset-2 hover:underline"
                >
                  <Phone className="h-4 w-4" />
                  +880 1798-651950
                </a>
              </div>

              <div className="flex items-start gap-2 text-xs text-text-secondary mt-4 rounded-lg border border-border/50 bg-surface/40 px-3 py-3">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <p>
                  We&apos;re based in <span className="font-medium text-text-primary">Bangladesh</span> and work with clients
                  globally across time zones.
                </p>
              </div>
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}
