"use client";

import Link from "next/link";
import Image from "next/image";
import { 
  Mail, 
  Phone, 
  MapPin, 
  ArrowUpRight,
  Linkedin,
  Github,
  Twitter,
  Facebook
} from "lucide-react";

const footerLinks = {
  services: [
    { name: "Website Development", href: "/services" },
    { name: "UI/UX Design", href: "/services" },
    { name: "Mobile App Development", href: "/services" },
    { name: "E-Commerce Solutions", href: "/services" },
    { name: "Custom Software", href: "/services" },
    { name: "SEO & Marketing", href: "/services" },
  ],
  company: [
    { name: "About Us", href: "/#about" },
    { name: "Our Team", href: "/#about" },
    { name: "Portfolio", href: "/#portfolio" },
    { name: "Careers", href: "/careers" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ],
  support: [
    { name: "Help Center", href: "/help" },
    { name: "FAQs", href: "/faqs" },
    { name: "Documentation", href: "/docs" },
    { name: "System Status", href: "/status" },
    { name: "Support Ticket", href: "/contact" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms of Service", href: "/terms-of-service" },
    { name: "Cookie Policy", href: "/cookie-policy" },
    { name: "Refund Policy", href: "/refund-policy" },
  ],
};

const socialLinks = [
  { name: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
  { name: "GitHub", href: "https://github.com", icon: Github },
  { name: "Twitter", href: "https://twitter.com", icon: Twitter },
  { name: "Facebook", href: "https://facebook.com", icon: Facebook },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface/50 border-t border-border/40">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 xs:grid-cols-2 gap-8 sm:gap-10 lg:grid-cols-6 lg:gap-8">
          {/* Brand Column */}
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2 mb-4 sm:mb-6">
              <Image
                src="/GrayVally.png"
                alt="GrayVally Logo"
                width={32}
                height={32}
                className="h-8 w-8"
              />
              <span className="text-xl font-bold text-text-primary">GrayVally</span>
            </Link>
            <p className="text-sm text-text-secondary leading-relaxed max-w-xs mb-6">
              Building digital infrastructure that powers ambitious businesses. From concept to deployment, we deliver excellence.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <a 
                href="mailto:hello@grayvally.tech" 
                className="flex items-center gap-2 text-sm text-text-secondary hover:text-blue-400 transition-colors"
              >
                <Mail className="h-4 w-4" />
                hello@grayvally.tech
              </a>
              <a 
                href="tel:+1234567890" 
                className="flex items-center gap-2 text-sm text-text-secondary hover:text-blue-400 transition-colors"
              >
                <Phone className="h-4 w-4" />
                +1 (234) 567-890
              </a>
              <div className="flex items-start gap-2 text-sm text-text-secondary">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>123 Tech Street, Silicon Valley, CA 94025</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-surface/60 border border-border/30 text-text-secondary transition-all duration-300 hover:bg-blue-500/10 hover:border-blue-500/30 hover:text-blue-400"
                  aria-label={social.name}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Services Column */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-text-primary mb-4">Services</h3>
            <ul className="space-y-2.5">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-blue-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-text-primary mb-4">Company</h3>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-blue-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Column */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-text-primary mb-4">Support</h3>
            <ul className="space-y-2.5">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-blue-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Column */}
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-text-primary mb-4">Legal</h3>
            <ul className="space-y-2.5">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-blue-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-12 sm:mt-16 pt-8 sm:pt-10 border-t border-border/30">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                Stay Updated
              </h3>
              <p className="text-sm text-text-secondary">
                Subscribe to our newsletter for the latest updates and insights.
              </p>
            </div>
            <form className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 lg:w-64 rounded-full border border-border/50 bg-background/50 px-4 py-2.5 text-sm text-text-primary placeholder:text-text-secondary/60 focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/50 transition-colors"
              />
              <button
                type="submit"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-text-primary px-6 py-2.5 text-sm font-semibold text-background transition-all duration-300 hover:bg-blue-500"
              >
                Subscribe
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border/30 bg-background/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs sm:text-sm text-text-secondary text-center sm:text-left">
              © {currentYear} GrayVally. All rights reserved.
            </p>
            <div className="flex items-center gap-4 sm:gap-6">
              <Link
                href="/privacy-policy"
                className="text-xs sm:text-sm text-text-secondary hover:text-blue-400 transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/terms-of-service"
                className="text-xs sm:text-sm text-text-secondary hover:text-blue-400 transition-colors"
              >
                Terms
              </Link>
              <Link
                href="/cookie-policy"
                className="text-xs sm:text-sm text-text-secondary hover:text-blue-400 transition-colors"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
