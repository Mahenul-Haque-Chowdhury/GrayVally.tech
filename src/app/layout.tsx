import type { Metadata } from "next";
import Script from "next/script";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { ReactNode } from "react";
import { PageTransition } from "@/components/PageTransition";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { ScrollProgress } from "@/components/ScrollProgress";
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
  title: {
    default: "GrayVally Software Solutions | Web Development & Software Company in Bangladesh",
    template: "%s | GrayVally Software Solutions"
  },
  applicationName: "GrayVally Software Solutions",
  description:
    "GrayVally Software Solutions is a leading web development and software company in Bangladesh. We specialize in custom websites, web applications, mobile apps, UI/UX design, ERP, CRM, and cloud-native solutions for startups and enterprises. Get a free consultation today!",
  metadataBase: new URL("https://grayvally.tech"),
  keywords: [
    // Primary services
    "web development company Bangladesh",
    "software development company Bangladesh",
    "UI/UX design agency Bangladesh",
    "web design Bangladesh",
    "mobile app development Bangladesh",
    "custom software development",
    // Service-specific
    "ecommerce website development",
    "React development services",
    "Next.js development company",
    "Node.js development",
    "full stack development",
    "frontend development services",
    "backend development services",
    // Business solutions
    "ERP software development",
    "CRM development company",
    "HRMS software Bangladesh",
    "inventory management system",
    "POS software development",
    // Location-based
    "web developer Dhaka",
    "software company Dhaka",
    "IT company Bangladesh",
    "tech startup Bangladesh",
    // Brand
    "GrayVally",
    "GrayVally Software Solutions",
    // Intent-based
    "hire web developers Bangladesh",
    "affordable web development",
    "professional website design",
    "business website development",
    "startup web development",
    "cloud infrastructure services",
    "website maintenance services",
    "SEO services Bangladesh"
  ],
  authors: [{ name: "GrayVally Software Solutions", url: "https://grayvally.tech" }],
  creator: "GrayVally Software Solutions",
  publisher: "GrayVally Software Solutions",
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  category: "technology",
  openGraph: {
    title: "GrayVally Software Solutions | Web Development & Software Company in Bangladesh",
    description:
      "Leading web development & software company in Bangladesh. Custom websites, mobile apps, UI/UX design, ERP, CRM solutions. Trusted by startups & enterprises. Get free consultation!",
    url: "https://grayvally.tech",
    siteName: "GrayVally Software Solutions",
    locale: "en_US",
    images: [
      {
        url: "/grayvally-social.jpg",
        width: 1200,
        height: 630,
        alt: "GrayVally Software Solutions - Web Development & Software Company Bangladesh",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GrayVally Software Solutions | Web Development & Software Company Bangladesh",
    description:
      "Leading web development & software company in Bangladesh. Custom websites, mobile apps, UI/UX design, ERP, CRM solutions. Get free consultation!",
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
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Theme initialization script - must run before CSS to prevent flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark'){document.documentElement.classList.add('theme-'+t);document.documentElement.style.colorScheme=t}else{var d=window.matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light';document.documentElement.classList.add('theme-'+d);document.documentElement.style.colorScheme=d}}catch(e){}document.documentElement.classList.add('theme-resolved')})();`,
          }}
        />
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
              name: "GrayVally Software Solutions",
              legalName: "GrayVally Software Solutions",
              alternateName: ["GrayVally", "GrayVally Tech", "GrayVally Agency"],
              url: "https://grayvally.tech",
              logo: {
                "@type": "ImageObject",
                "@id": "https://grayvally.tech/#logo",
                url: "https://grayvally.tech/GrayVally.png",
                contentUrl: "https://grayvally.tech/GrayVally.png",
                width: 512,
                height: 512,
                caption: "GrayVally Software Solutions Logo"
              },
              image: {
                "@type": "ImageObject",
                url: "https://grayvally.tech/grayvally-social.jpg",
                width: 1200,
                height: 630
              },
              description: "GrayVally Software Solutions is a leading web development and software company in Bangladesh, specializing in custom websites, mobile apps, UI/UX design, ERP, CRM, and cloud-native solutions for startups and enterprises worldwide.",
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
                "Website Design",
                "UI/UX Design",
                "Software Development",
                "Mobile App Development",
                "E-Commerce Solutions",
                "ERP Development",
                "CRM Development",
                "HRMS Solutions",
                "Cloud Infrastructure",
                "React Development",
                "Next.js Development",
                "Node.js Development",
                "Full Stack Development",
                "SEO Services",
                "Digital Marketing"
              ],
              makesOffer: [
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Custom Web Development",
                    description: "Professional website development using React, Next.js, and modern technologies"
                  }
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Mobile App Development",
                    description: "Native and cross-platform mobile applications for iOS and Android"
                  }
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "UI/UX Design",
                    description: "User interface and user experience design for web and mobile applications"
                  }
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "E-Commerce Development",
                    description: "Custom e-commerce solutions and online store development"
                  }
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "ERP Software Development",
                    description: "Enterprise Resource Planning systems tailored to your business needs"
                  }
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "CRM Development",
                    description: "Customer Relationship Management software solutions"
                  }
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "SEO & Digital Marketing",
                    description: "Search engine optimization and digital marketing services"
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
              name: "GrayVally Software Solutions",
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
              alternateName: ["GrayVally Software Solutions", "GrayVally Tech"],
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
      <body className="antialiased">
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
