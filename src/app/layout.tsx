import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { ReactNode } from "react";
import { PageTransition } from "@/components/PageTransition";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
});

export const metadata: Metadata = {
  title: "GrayVally | Simplifying Your Digital Life.",
  description: "We design and build resilient, cloud-native infrastructure for forward-thinking companies.",
  metadataBase: new URL("https://grayvally.tech"),
  openGraph: {
    title: "GrayVally | Simplifying Your Digital Life.",
    description:
      "GrayVally builds reliable, scalable digital infrastructure so your business can move faster with less chaos.",
    url: "https://grayvally.tech",
    siteName: "GrayVally",
    images: [
      {
        url: "/GrayVally.png",
        width: 1200,
        height: 630,
        alt: "GrayVally logo and brand preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GrayVally | Simplifying Your Digital Life.",
    description:
      "End-to-end digital infrastructure, from idea to reliable production systems.",
    images: ["/GrayVally.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/devicon.min.css"
        />
      </head>
      <body className="antialiased transition-colors duration-300">
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
