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
        url: "/grayvally-social.jpg",
        width: 1200,
        height: 630,
        alt: "GrayVally – Simplifying Your Digital Life",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GrayVally | Simplifying Your Digital Life.",
    description:
      "End-to-end digital infrastructure, from idea to reliable production systems.",
    images: ["/grayvally-social.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", rel: "shortcut icon" },
    ],
    apple: "/apple-touch-icon.png",
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
