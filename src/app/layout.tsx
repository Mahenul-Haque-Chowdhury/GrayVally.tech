import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { ReactNode } from "react";
import { PageTransition } from "@/components/PageTransition";
import { ErrorBoundary } from "@/components/ErrorBoundary";
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
  title: "GrayVally | Web Development & UI/UX Agency in Bangladesh",
  description:
    "GrayVally builds fast, scalable websites and web apps with modern web development, UI/UX design, and cloud-native infrastructure for startups and businesses.",
  metadataBase: new URL("https://grayvally.tech"),
  openGraph: {
    title: "GrayVally | Web Development & UI/UX Agency in Bangladesh",
    description:
      "GrayVally builds reliable, scalable digital infrastructure, websites, and web apps so your business can move faster with less chaos.",
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
    title: "GrayVally | Web Development & UI/UX Agency in Bangladesh",
    description:
      "End-to-end web development, UI/UX design, and cloud-native infrastructure from Bangladesh to global clients.",
    images: ["/grayvally-social.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "GrayVally",
              url: "https://grayvally.tech",
              description: "GrayVally builds fast, scalable websites and web apps with modern web development, UI/UX design, and cloud-native infrastructure for startups and businesses.",
              publisher: {
                "@type": "Organization",
                name: "GrayVally",
                logo: "https://grayvally.tech/GrayVally.png",
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "GrayVally",
              url: "https://grayvally.tech",
              logo: "https://grayvally.tech/GrayVally.png",
              address: {
                "@type": "PostalAddress",
                addressCountry: "BD",
                addressLocality: "Dhaka",
                addressRegion: "Dhaka",
              },
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  contactType: "customer support",
                  email: "support@grayvally.tech",
                  telephone: "+8801798651950",
                },
              ],
            }),
          }}
        />
      </head>
      <body className="antialiased transition-colors duration-300">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-text-primary text-background px-4 py-2 rounded-md z-50"
        >
          Skip to main content
        </a>
        <ErrorBoundary>
          <PageTransition>{children}</PageTransition>
        </ErrorBoundary>
      </body>
    </html>
  );
}
