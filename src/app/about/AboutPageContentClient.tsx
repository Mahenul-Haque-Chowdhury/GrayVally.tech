"use client";

import dynamic from "next/dynamic";

const AboutPageContent = dynamic(
  () =>
    import("@/components/AboutPageContent").then(
      (mod) => mod.AboutPageContent
    ),
  { ssr: false }
);

export default function AboutPageContentClient() {
  return <AboutPageContent />;
}
