import { ArrowRight } from "lucide-react";

const FOUNDERS = [
  {
    name: "Irvan Lathief",
    role: "Founder, OMA Townhouse",
    image: "/founder/irvan-lathief.jpg",
    alt: "Irvan Lathief, founder of OMA Townhouse",
    bio: "Irvan brings more than a decade in product design and delivery to OMA's first development. He keeps the project focused on the decisions that shape how each home is built, bought and lived in.",
    href: "https://irvanlathief.com",
  },
  {
    name: "Derek",
    role: "Development partner, OMA Townhouse",
    image: "/founder/derek.jpg",
    alt: "Derek, development partner at OMA Townhouse",
    bio: "Derek is an internationally experienced entrepreneur and business leader who has successfully delivered projects across multiple industries and diverse cultural environments. Known for building strong relationships and adapting to complex challenges, he combines strategic thinking with practical execution to drive innovation, create value, and achieve lasting results. His broad experience enables him to connect people, ideas, and opportunities on a global scale.",
  },
] as const;

export function FoundersSection() {
  return (
    <section className="px-5 py-24 sm:px-8 lg:px-12 lg:py-36">
      <div className="mx-auto max-w-[1450px]">
        <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
          <p className="text-sm text-black/50">Who is behind OMA</p>
          <h2 className="max-w-5xl font-editorial text-5xl leading-[0.96] tracking-[-0.04em] sm:text-7xl">
            Built with global experience and founder-level attention.
          </h2>
        </div>

        <div className="mt-16 grid gap-14 lg:grid-cols-2 lg:gap-x-12 lg:gap-y-16">
          {FOUNDERS.map(founder => (
            <article
              key={founder.name}
              className="grid items-start gap-6 sm:grid-cols-[220px_1fr]"
            >
              <div className="w-44 overflow-hidden rounded-[20px] bg-black sm:w-full">
                <img
                  src={founder.image}
                  alt={founder.alt}
                  loading="lazy"
                  className="aspect-square w-full object-cover grayscale"
                />
              </div>
              <div className="flex flex-col border-t border-black/20 pt-5">
                <strong className="text-2xl font-medium tracking-[-0.03em]">
                  {founder.name}
                </strong>
                <span className="mt-1 block text-sm text-black/45">
                  {founder.role}
                </span>
                <p className="mt-7 text-sm leading-relaxed text-black/60">
                  {founder.bio}
                </p>
                {"href" in founder ? (
                  <a
                    href={founder.href}
                    data-external="true"
                    className="mt-8 inline-flex w-fit items-center gap-4 rounded-full border border-black/20 px-5 py-3 text-sm font-medium transition-colors hover:bg-black hover:text-white"
                  >
                    Meet Irvan
                    <ArrowRight className="h-4 w-4" />
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>

        <p className="mt-12 max-w-3xl border-t border-black/20 pt-7 text-base leading-relaxed text-black/60">
          Irvan and Derek are keeping OMA's first 12 homes intentionally
          focused, with direct team access, milestone payments and owner
          inspections built into the buyer conversation.
        </p>
      </div>
    </section>
  );
}
