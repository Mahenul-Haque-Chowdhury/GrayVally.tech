"use client";

export function About() {
  return (
    <section id="about" className="bg-surface py-24 sm:py-32 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
              About GrayVally
            </h2>
            <div className="mt-6 space-y-6 text-lg leading-relaxed text-text-secondary">
              <p>
                Founded by Arnob, GrayVally is a boutique digital infrastructure studio.
                We don&apos;t just manage servers; we architect the systems that power your business.
              </p>
              <p>
                We believe in &quot;boring&quot; infrastructure. The best systems are the ones you don&apos;t
                have to think about—they just work, scale, and remain secure. We bring
                enterprise-grade engineering to agile teams.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square w-full max-w-md overflow-hidden bg-surfaceHighlight">
               {/* Placeholder for an image or abstract graphic */}
               <div className="h-full w-full bg-gradient-to-br from-surfaceHighlight to-background p-8">
                  <div className="h-full w-full border border-border flex items-center justify-center">
                    <span className="font-mono text-text-secondary">EST. 2024</span>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
