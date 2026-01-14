import type { Metadata } from "next";
import Script from "next/script";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { ReactNode } from "react";
import { PageTransition } from "@/components/PageTransition";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
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
  applicationName: "GrayVally IT Solutions",
  description:
    "GrayVally builds fast, scalable websites and web apps with modern web development, UI/UX design, and cloud-native infrastructure for startups and businesses.",
  metadataBase: new URL("https://grayvally.tech"),
  keywords: [
    "web development",
    "UI/UX design",
    "software development",
    "web agency Bangladesh",
    "GrayVally",
    "custom websites",
    "web applications",
    "cloud infrastructure",
    "startup development"
  ],
  authors: [{ name: "GrayVally IT Solutions", url: "https://grayvally.tech" }],
  creator: "GrayVally IT Solutions",
  publisher: "GrayVally IT Solutions",
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  category: "technology",
  openGraph: {
    title: "GrayVally | Web Development & UI/UX Agency in Bangladesh",
    description:
      "GrayVally builds reliable, scalable digital infrastructure, websites, and web apps so your business can move faster with less chaos.",
    url: "https://grayvally.tech",
    siteName: "GrayVally IT Solutions",
    locale: "en_US",
    images: [
      {
        url: "/grayvally-social.jpg",
        width: 1200,
        height: 630,
        alt: "GrayVally – We Build Digital Infrastructure",
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
    creator: "@grayvally",
    site: "@grayvally",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code", // Replace with your actual Google Search Console verification code
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png" },
    ],
  },
  other: {
    "google-site-verification": "your-google-verification-code", // Replace this with your actual code
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
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-SMLFP5R3MC"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-SMLFP5R3MC');
          `}
        </Script>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/devicon.min.css"
        />
        {/* Organization Schema - Primary for Google Knowledge Panel & Logo */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": "https://grayvally.tech/#organization",
              name: "GrayVally IT Solutions",
              legalName: "GrayVally IT Solutions",
              alternateName: ["GrayVally", "GrayVally Tech", "GrayVally Agency"],
              url: "https://grayvally.tech",
              logo: {
                "@type": "ImageObject",
                "@id": "https://grayvally.tech/#logo",
                url: "https://grayvally.tech/GrayVally.png",
                contentUrl: "https://grayvally.tech/GrayVally.png",
                width: 512,
                height: 512,
                caption: "GrayVally IT Solutions Logo"
              },
              image: {
                "@type": "ImageObject",
                url: "https://grayvally.tech/grayvally-social.jpg",
                width: 1200,
                height: 630
              },
              description: "GrayVally builds fast, scalable websites and web apps with modern web development, UI/UX design, and cloud-native infrastructure for startups and businesses.",
              foundingDate: "2024",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Dhaka",
                addressLocality: "Dhaka",
                addressRegion: "Dhaka Division",
                postalCode: "1000",
                addressCountry: "BD"
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: "23.8103",
                longitude: "90.4125"
              },
              telephone: "+880 1798-651950",
              email: "support@grayvally.tech",
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  telephone: "+880 1798-651950",
                  contactType: "customer service",
                  email: "support@grayvally.tech",
                  availableLanguage: ["English", "Bengali"],
                  areaServed: "Worldwide"
                },
                {
                  "@type": "ContactPoint",
                  telephone: "+880 1798-651950",
                  contactType: "sales",
                  email: "hello@grayvally.tech",
                  availableLanguage: ["English", "Bengali"]
                }
              ],
              sameAs: [
                "https://www.facebook.com/grayvally/",
                "https://www.linkedin.com/company/110150957/",
                "https://www.instagram.com/gray.vally/",
                "https://wa.me/message/WKOJFR6PKR5AP1"
              ],
              numberOfEmployees: {
                "@type": "QuantitativeValue",
                minValue: 2,
                maxValue: 10
              },
              slogan: "We Build Digital Infrastructure",
              knowsAbout: [
                "Web Development",
                "UI/UX Design",
                "Software Development",
                "Cloud Infrastructure",
                "Mobile App Development"
              ],
              makesOffer: [
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Web Development",
                    description: "Custom websites and web applications"
                  }
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "UI/UX Design",
                    description: "User interface and experience design"
                  }
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Software Solutions",
                    description: "Custom software development"
                  }
                }
              ]
            }),
          }}
        />
        {/* LocalBusiness Schema - Critical for Google Business Profile Integration */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "@id": "https://grayvally.tech/#localbusiness",
              name: "GrayVally IT Solutions",
              image: [
                "https://grayvally.tech/GrayVally.png",
                "https://grayvally.tech/grayvally-social.jpg"
              ],
              logo: "https://grayvally.tech/GrayVally.png",
              url: "https://grayvally.tech",
              telephone: "+880 1798-651950",
              email: "support@grayvally.tech",
              priceRange: "$$",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Dhaka",
                addressLocality: "Dhaka",
                addressRegion: "Dhaka Division",
                postalCode: "1000",
                addressCountry: "BD"
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: "23.8103",
                longitude: "90.4125"
              },
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                  opens: "09:00",
                  closes: "20:00"
                }
              ],
              areaServed: {
                "@type": "GeoCircle",
                geoMidpoint: {
                  "@type": "GeoCoordinates",
                  latitude: "23.8103",
                  longitude: "90.4125"
                },
                geoRadius: "50000"
              },
              serviceArea: {
                "@type": "Place",
                name: "Worldwide"
              },
              sameAs: [
                "https://www.facebook.com/grayvally/",
                "https://www.linkedin.com/company/110150957/",
                "https://www.instagram.com/gray.vally/",
                "https://wa.me/message/WKOJFR6PKR5AP1"
              ]
            }),
          }}
        />
        {/* WebSite Schema with SearchAction for Sitelinks */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": "https://grayvally.tech/#website",
              name: "GrayVally",
              alternateName: ["GrayVally IT Solutions", "GrayVally Tech"],
              url: "https://grayvally.tech",
              description: "GrayVally builds fast, scalable websites and web apps with modern web development, UI/UX design, and cloud-native infrastructure for startups and businesses.",
              publisher: {
                "@id": "https://grayvally.tech/#organization"
              },
              inLanguage: "en-US",
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate: "https://grayvally.tech/search?q={search_term_string}"
                },
                "query-input": "required name=search_term_string"
              }
            }),
          }}
        />
        {/* SiteNavigationElement for better site structure */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              "itemListElement": [
                {
                  "@type": "SiteNavigationElement",
                  "position": 1,
                  "name": "Web Solutions",
                  "description": "Custom websites and web applications tailored to your business needs.",
                  "url": "https://grayvally.tech/web-solutions"
                },
                {
                  "@type": "SiteNavigationElement",
                  "position": 2,
                  "name": "Software Solutions",
                  "description": "Scalable software systems to empower your organization.",
                  "url": "https://grayvally.tech/software-solutions"
                },
                {
                  "@type": "SiteNavigationElement",
                  "position": 3,
                  "name": "Apps",
                  "description": "Explore useful apps and tools built by GrayVally.",
                  "url": "https://grayvally.tech/apps"
                },
                {
                  "@type": "SiteNavigationElement",
                  "position": 4,
                  "name": "About",
                  "description": "Learn more about GrayVally and our mission.",
                  "url": "https://grayvally.tech/about"
                },
                {
                  "@type": "SiteNavigationElement",
                  "position": 5,
                  "name": "Contact",
                  "description": "Get in touch with us for your next project.",
                  "url": "https://grayvally.tech/contact"
                }
              ]
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
        <SmoothScrollProvider>
          <ErrorBoundary>
            <PageTransition>{children}</PageTransition>
          </ErrorBoundary>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
