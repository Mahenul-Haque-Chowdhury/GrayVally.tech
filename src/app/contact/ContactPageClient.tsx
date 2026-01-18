"use client";

import dynamic from "next/dynamic";

const Contact = dynamic(
  () => import("@/components/ContactPage").then((mod) => mod.Contact),
  { ssr: false }
);

export default function ContactPageClient() {
  return <Contact />;
}
