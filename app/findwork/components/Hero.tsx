import React from "react";

type Stat = { value: string; label: string };

export interface FindWorkHeroProps {
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  joinHref?: string;
  joinLabel?: string;
  howItWorksHref?: string;
  howItWorksLabel?: string;
  stats?: Stat[];
}

const DEFAULT_STATS: Stat[] = [
  { value: "50+", label: "healthcare roles covered" },
  { value: "45+", label: "Ontario cities & regions" },
  { value: "$0", label: "cost to candidates" },
];

export default function FindWorkHero({
  eyebrow = "For Ontario healthcare professionals",
  heading = "Find healthcare work across Ontario.",
  subheading = "Explore opportunities by profession or city, then join the Registry so employers can find you.",
  joinHref = "/employer#join",
  joinLabel = "Join the Registry →",
  howItWorksHref = "#/how-it-works",
  howItWorksLabel = "How It Works",
  stats = DEFAULT_STATS,
}: FindWorkHeroProps) {
  /*
   * Prototype hero: cream background, 1px bottom border, natural height,
   * padding 72px 48px 56px (52px 20px 40px under 860px), DM Sans for everything
   * except the h1. The fixed 65px site nav sits over the page, so its height is
   * added to the top padding (72 + 65 = 137, 52 + 65 = 117).
   */
  return (
    <section className="border-b border-ash bg-cream px-5 pb-10 pt-[117px] text-center font-['DM_Sans',sans-serif] antialiased min-[860px]:px-12 min-[860px]:pb-14 min-[860px]:pt-[137px]">
      <div className="mx-auto max-w-155">
        <div className="mb-3.5 text-[11.5px] font-medium uppercase leading-[normal] tracking-[0.08em] text-forest">
          {eyebrow}
        </div>

        <h1 className="mb-4 font-serif text-[clamp(34px,5vw,50px)] font-semibold leading-[1.1] text-[#1a1a18]">
          {heading}
        </h1>

        <p className="mb-6.5 text-[16.5px] font-light leading-[1.55] text-[#5c5c58]">
          {subheading}
        </p>

        <div className="mb-5.5 flex w-full flex-col items-center justify-center gap-3.5 min-[460px]:w-auto min-[460px]:flex-row min-[460px]:flex-wrap">
          <a
            href={joinHref}
            className="inline-block w-full rounded-[10px] bg-forest px-6.5 py-3.5 text-center text-[14px] font-semibold leading-[normal] text-white no-underline transition-colors duration-150 hover:bg-[#16260c] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest min-[460px]:w-auto"
          >
            {joinLabel}
          </a>
          <a
            href={howItWorksHref}
            className="inline-block w-full rounded-[10px] border-[1.5px] border-forest bg-transparent px-6 py-[12.5px] text-center text-[14px] font-semibold leading-[normal] text-forest no-underline transition-colors duration-150 hover:bg-forest hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest min-[460px]:w-auto"
          >
            {howItWorksLabel}
          </a>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 text-[12.5px] leading-[normal] text-[#8a8a84] min-[860px]:gap-2.5">
          {stats.map((stat, i) => (
            <React.Fragment key={stat.label}>
              {i > 0 && <span className="text-ash">·</span>}
              <span>
                <b className="font-bold text-[#5c5c58]">{stat.value}</b>{" "}
                {stat.label}
              </span>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}