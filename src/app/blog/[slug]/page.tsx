import type { Metadata } from "next";
import Link from "next/link";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";
import { FloatHeading } from "@/components/ui/ScrollFloat";
import { blogPosts, getBlogPostBySlug } from "@/data/blogPosts";

type ArticleKey = (typeof blogPosts)[number]["slug"];

type PageProps = {
  params: Promise<{ slug: ArticleKey }>;
};

export async function generateMetadata(
  { params }: PageProps,
): Promise<Metadata> {
  const { slug } = await params;
  const article = getBlogPostBySlug(slug);

  if (!article) {
    return {
      title: "Blog | GrayVally",
    };
  }

  return {
    title: `${article.title} | GrayVally Blog`,
    description: article.description,
    alternates: {
      canonical: `https://grayvally.tech/blog/${article.slug}`,
    },
  };
}

export default async function BlogArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getBlogPostBySlug(slug);

  if (!article) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background text-text-primary">
      <NavBar />
      <main className="pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-24">
        <section className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="mb-6">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-xs sm:text-sm text-text-secondary hover:text-blue-400"
            >
              <span aria-hidden>←</span>
              <span>Back to blog</span>
            </Link>
          </div>

          <header className="mb-8">
            <p className="text-[10px] sm:text-xs font-medium uppercase tracking-[0.15em] text-text-secondary mb-3">
              GrayVally Blog
            </p>
            <FloatHeading as="h1" className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-text-primary">
              {article.title}
            </FloatHeading>
          </header>

          <div className="prose prose-invert prose-sm sm:prose-base max-w-none text-text-secondary">
            {slug === "choose-web-development-company-bangladesh" && (
              <>
                <p>
                  Choosing the right <strong>web development company in Bangladesh</strong> can feel risky. There are
                  plenty of agencies and freelancers, but not all of them can design for your users, ship on time, and
                  keep your site stable once it&apos;s live.
                </p>
                <p>
                  This guide is for founders, marketing leads, and business owners who don&apos;t want to become
                  developers. They just want a clear way to evaluate partners and make a confident decision.
                </p>
                <p>
                  <strong>Related services:</strong> <Link href="/audit">Complimentary Website Audit</Link>
                </p>

                <FloatHeading as="h2">1. Get clear on what you really need</FloatHeading>
                <p>
                  Before you talk to any agency, spend a little time clarifying your own requirements. It doesn&apos;t
                  need to be a 20-page brief, but you should be able to explain:
                </p>
                <ul>
                  <li>Your main goal (more leads, signups, sales, investor-ready presence, etc.).</li>
                  <li>What you&apos;re building (marketing site, SaaS app, internal tool, e-commerce, landing pages).</li>
                  <li>What already exists (an old site, brand guidelines, copy, logos, product screenshots).</li>
                  <li>Your rough budget range and ideal timeline.</li>
                </ul>
                <p>
                  When you can communicate this clearly, good agencies can quickly tell you whether they&apos;re a fit
                  and what trade-offs you&apos;re dealing with. It also helps you compare proposals fairly.
                </p>

                <FloatHeading as="h2">2. Look for a real portfolio, not just pretty homepages</FloatHeading>
                <p>
                  Beautiful homepages are easy to fake. What matters is whether a company can show <strong>real
                  projects</strong> with context:
                </p>
                <ul>
                  <li>A short story: who the client is and what problem they had.</li>
                  <li>What was delivered: new website, web app, redesign, performance work, etc.</li>
                  <li>Results: faster load times, higher conversion rate, better engagement, or client feedback.</li>
                </ul>
                <p>
                  When you browse any agency&apos;s <Link href="/portfolio">portfolio</Link>, ask yourself:
                </p>
                <ul>
                  <li>Do these projects look similar to what I&apos;m trying to build?</li>
                  <li>Are they working with businesses roughly my size?</li>
                  <li>Do they show both <strong>design</strong> and <strong>engineering</strong> strength?</li>
                </ul>

                <FloatHeading as="h2">3. Check technical stack and infrastructure thinking</FloatHeading>
                <p>
                  For simple brochure sites, almost anyone can put something together that looks fine. The difference
                  shows up when you need your site to be <strong>fast, secure, and reliable</strong>. Ask each company
                  how they think about:
                </p>
                <ul>
                  <li>
                    <strong>Tech stack:</strong> Do they use modern, battle-tested tools like Next.js, TypeScript, and
                    a reliable hosting platform such as Vercel?
                  </li>
                  <li>
                    <strong>Performance:</strong> Do they actively aim for good Core Web Vitals, image optimization,
                    and caching, or is it an afterthought?
                  </li>
                  <li>
                    <strong>Infrastructure:</strong> For apps and dashboards, do they design for scaling, monitoring,
                    and safety, or is it just &quot;it works on my laptop&quot;?
                  </li>
                </ul>
                <p>
                  At GrayVally, our background is in <Link href="/web-solutions">web development and digital
                  infrastructure</Link>, so we design from day one for speed, resilience, and observability, not just
                  visuals.
                </p>

                <FloatHeading as="h2">4. Evaluate their process, not just their proposal</FloatHeading>
                <p>
                  Proposals tell you what you&apos;ll get; <strong>process</strong> tells you how painful it will be to
                  get there. During your calls, ask questions like:
                </p>
                <ul>
                  <li>How do you run discovery? Who will talk to us about goals and constraints?</li>
                  <li>What does your design and development workflow look like week to week?</li>
                  <li>How often do we see progress? Weekly demos, staging URLs, or nothing until the end?</li>
                  <li>What tools do you use for communication and project tracking?</li>
                </ul>
                <p>
                  You&apos;re looking for a rhythm like: discovery → wireframes → visual design → development sprints →
                  testing → launch and support. If everything sounds improvised or vague, expect surprises later.
                </p>

                <FloatHeading as="h2">5. Talk to the actual team you&apos;ll work with</FloatHeading>
                <p>
                  In some agencies, the person who sells you the project is not the person who delivers it. When
                  possible, ask to meet at least:
                </p>
                <ul>
                  <li>The project manager or main point of contact.</li>
                  <li>The lead developer or technical architect.</li>
                  <li>The designer responsible for UX/UI, if design is included.</li>
                </ul>
                <p>
                  Pay attention to how they explain things. Do they make concepts clearer, or more confusing? A good
                  team should be able to talk about technical topics in plain language and connect decisions back to
                  your business goals.
                </p>

                <FloatHeading as="h2">6. Compare more than just price</FloatHeading>
                <p>
                  When you receive proposals from multiple companies, it&apos;s tempting to line them up by price and
                  pick the lowest. Instead, compare:
                </p>
                <ul>
                  <li>
                    <strong>Scope:</strong> What&apos;s actually included: strategy, design, content, infrastructure,
                    analytics, SEO, training?
                  </li>
                  <li>
                    <strong>Timelines:</strong> Are they realistic? Does someone explain why it takes that long?
                  </li>
                  <li>
                    <strong>Support:</strong> What happens after launch? Is there a warranty period or a support plan?
                  </li>
                  <li>
                    <strong>Risk:</strong> Do they talk honestly about trade-offs, or just say yes to everything?
                  </li>
                </ul>
                <p>
                  A quote that&apos;s slightly higher but includes real QA, documentation, and support can be far cheaper
                  than a low bid that leaves you with bugs and no one to fix them.
                </p>

                <FloatHeading as="h2">7. Red flags to watch out for</FloatHeading>
                <p>Some warning signs when choosing a web development company in Bangladesh (or anywhere):</p>
                <ul>
                  <li>No real portfolio or only generic template sites.</li>
                  <li>Unclear ownership of code and infrastructure accounts.</li>
                  <li>All communication happening in informal chat with no written plan or timeline.</li>
                  <li>Guarantees of instant SEO rankings or unrealistic timelines for complex projects.</li>
                  <li>Reluctance to sign even a simple written agreement.</li>
                </ul>

                <FloatHeading as="h2">8. Questions you can copy-paste into your next call</FloatHeading>
                <p>Use these questions directly when talking to agencies:</p>
                <ul>
                  <li>Can you walk us through a recent project that&apos;s similar to ours?</li>
                  <li>How do you typically structure a 3–6 month engagement?</li>
                  <li>Who owns the code, design files, and hosting accounts when the project ends?</li>
                  <li>How do you measure success after launch?</li>
                  <li>What does ongoing maintenance and support look like?</li>
                </ul>

                <FloatHeading as="h2">9. When GrayVally might be a good fit</FloatHeading>
                <p>
                  GrayVally is a focused <strong>web development and UI/UX agency based in Bangladesh</strong>. We&apos;re
                  usually a good fit when you:
                </p>
                <ul>
                  <li>Care about long-term reliability more than quick hacks.</li>
                  <li>Want a partner who can handle both design and infrastructure.</li>
                  <li>Prefer clear written communication, check-ins, and visibility into the work.</li>
                </ul>
                <p>
                  If that sounds like what you&apos;re looking for, you can learn more about how we work on our
                  <Link href="/web-solutions">Web Solutions</Link> page and see real results on our
                  <Link href="/portfolio">Portfolio</Link>. When you&apos;re ready to start a conversation, reach out
                  through our <Link href="/contact">contact page</Link>. We&apos;d be happy to discuss your project.
                </p>
                <p>
                  <strong>Related reading:</strong>{" "}
                  <Link href="/blog/nextjs-performance-optimization-lessons">
                    Next.js performance optimization: lessons from real projects
                  </Link>
                </p>
              </>
            )}

            {slug === "nextjs-performance-optimization-lessons" && (
              <>
                <p>
                  Performance work in Next.js is not a single tweak. It is a sequence of small, compounding decisions that
                  shape Core Web Vitals, perceived speed, and long-term stability. In real projects, the fastest wins come
                  from profiling the user journey and fixing bottlenecks that repeat on every page view.
                </p>
                <p>
                  This article summarizes the lessons we see most often: how images, fonts, caching, and rendering
                  strategies interact, and how a few disciplined choices can make a site feel instantly more responsive.
                </p>
                <p>
                  <strong>Related services:</strong> <Link href="/audit">Complimentary Website Audit</Link>
                </p>

                <FloatHeading as="h2">1. Start with the slowest, most visited pages</FloatHeading>
                <p>
                  Many teams optimize an internal demo page and call it done. Instead, profile the pages that receive the
                  most traffic and generate revenue. If the homepage, pricing, or blog template is slow, those are the
                  first targets because fixes there reduce friction for the largest audience.
                </p>

                <FloatHeading as="h2">2. Make images do less work</FloatHeading>
                <p>
                  The easiest performance wins usually come from images. Use modern formats, keep dimensions realistic,
                  and avoid shipping 2–3x larger assets than the layout needs. For decorative visuals, prioritize
                  compression over pixel perfection. For product screenshots, ensure the container size is stable so the
                  layout does not shift while loading.
                </p>

                <FloatHeading as="h2">3. Audit fonts and third-party scripts</FloatHeading>
                <p>
                  Fonts and third-party scripts are common hidden costs. Use only the font weights you actually display,
                  preload critical fonts, and avoid loading full icon packs when a few SVGs would do. For analytics and
                  marketing tags, delay non-critical scripts until the main content is interactive.
                </p>

                <FloatHeading as="h2">4. Choose rendering strategies intentionally</FloatHeading>
                <p>
                  Server-rendered content is great for fast first paint, but client-side data fetching can still block
                  interaction. Use static generation or caching where possible. If a page is personalized, keep the
                  critical content server-rendered and progressively enhance the rest.
                </p>

                <FloatHeading as="h2">5. Measure, then lock in wins</FloatHeading>
                <p>
                  Run Lighthouse or WebPageTest after each change, and compare before/after. The goal is not a perfect
                  score; it is stable performance under real conditions. Once a fix helps, make it part of the system so
                  future pages inherit the improvement.
                </p>

                <FloatHeading as="h2">Key takeaways</FloatHeading>
                <ul>
                  <li>Optimize the pages that matter most, not just the easiest ones.</li>
                  <li>Right-size images and prevent layout shifts with stable containers.</li>
                  <li>Ship fewer fonts and delay non-essential scripts.</li>
                  <li>Match rendering strategy to content criticality and update frequency.</li>
                  <li>Measure regularly and bake wins into reusable patterns.</li>
                </ul>

                <FloatHeading as="h2">When to use this approach</FloatHeading>
                <p>
                  Use this checklist when a Next.js site feels sluggish, when Core Web Vitals fall below target, or when a
                  new release adds noticeable load time. It is especially helpful for marketing sites and SaaS apps where
                  speed directly affects conversion.
                </p>

                <p>
                  <strong>Related reading:</strong>{" "}
                  <Link href="/blog/choose-web-development-company-bangladesh">
                    How to choose a web development company in Bangladesh (practical guide)
                  </Link>
                </p>
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

