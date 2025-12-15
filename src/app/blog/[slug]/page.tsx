import type { Metadata } from "next";
import Link from "next/link";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";

const articles = {
  "choose-web-development-company-bangladesh": {
    title: "How to choose a web development company in Bangladesh (practical guide)",
    description:
      "A practical, non-technical checklist for founders and business owners evaluating web development companies in Bangladesh.",
  },
  "nextjs-performance-optimization-lessons": {
    title: "Next.js performance optimization: lessons from real projects",
    description:
      "Concrete techniques we use at GrayVally to improve performance and Core Web Vitals on Next.js websites.",
  },
} as const;

type ArticleKey = keyof typeof articles;

type PageProps = {
  params: Promise<{ slug: ArticleKey }>;
};

export async function generateMetadata(
  { params }: PageProps,
): Promise<Metadata> {
  const { slug } = await params;
  const article = articles[slug];

  if (!article) {
    return {
      title: "Blog | GrayVally",
    };
  }

  return {
    title: `${article.title} | GrayVally Blog`,
    description: article.description,
  };
}

export default async function BlogArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = articles[slug];

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
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-text-primary">
              {article.title}
            </h1>
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
                  developers—they just want a clear way to evaluate partners and make a confident decision.
                </p>

                <h2>1. Get clear on what you really need</h2>
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

                <h2>2. Look for a real portfolio, not just pretty homepages</h2>
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

                <h2>3. Check technical stack and infrastructure thinking</h2>
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
                    and safety—or just “it works on my laptop”?
                  </li>
                </ul>
                <p>
                  At GrayVally, our background is in <Link href="/services">web development and digital
                  infrastructure</Link>, so we design from day one for speed, resilience, and observability—not just
                  visuals.
                </p>

                <h2>4. Evaluate their process, not just their proposal</h2>
                <p>
                  Proposals tell you what you&apos;ll get; <strong>process</strong> tells you how painful it will be to
                  get there. During your calls, ask questions like:
                </p>
                <ul>
                  <li>How do you run discovery? Who will talk to us about goals and constraints?</li>
                  <li>What does your design and development workflow look like week to week?</li>
                  <li>How often do we see progress—weekly demos, staging URLs, or nothing until the end?</li>
                  <li>What tools do you use for communication and project tracking?</li>
                </ul>
                <p>
                  You&apos;re looking for a rhythm like: discovery → wireframes → visual design → development sprints →
                  testing → launch and support. If everything sounds improvised or vague, expect surprises later.
                </p>

                <h2>5. Talk to the actual team you&apos;ll work with</h2>
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

                <h2>6. Compare more than just price</h2>
                <p>
                  When you receive proposals from multiple companies, it&apos;s tempting to line them up by price and
                  pick the lowest. Instead, compare:
                </p>
                <ul>
                  <li>
                    <strong>Scope:</strong> What&apos;s actually included—strategy, design, content, infrastructure,
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

                <h2>7. Red flags to watch out for</h2>
                <p>Some warning signs when choosing a web development company in Bangladesh (or anywhere):</p>
                <ul>
                  <li>No real portfolio or only generic template sites.</li>
                  <li>Unclear ownership of code and infrastructure accounts.</li>
                  <li>All communication happening in informal chat with no written plan or timeline.</li>
                  <li>Guarantees of instant SEO rankings or unrealistic timelines for complex projects.</li>
                  <li>Reluctance to sign even a simple written agreement.</li>
                </ul>

                <h2>8. Questions you can copy-paste into your next call</h2>
                <p>Use these questions directly when talking to agencies:</p>
                <ul>
                  <li>Can you walk us through a recent project that&apos;s similar to ours?</li>
                  <li>How do you typically structure a 3–6 month engagement?</li>
                  <li>Who owns the code, design files, and hosting accounts when the project ends?</li>
                  <li>How do you measure success after launch?</li>
                  <li>What does ongoing maintenance and support look like?</li>
                </ul>

                <h2>9. When GrayVally might be a good fit</h2>
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
                  <Link href="/services">Services</Link> page and see real results on our
                  <Link href="/portfolio">Portfolio</Link>. When you&apos;re ready to start a conversation, reach out
                  through our <Link href="/contact">contact page</Link>—we&apos;d be happy to discuss your project.
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