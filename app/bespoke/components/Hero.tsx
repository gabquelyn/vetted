import React from "react";

export default function Hero() {
  return (
    <section className="bg-[#22160B] px-6 md:px-12 pt-30 md:pt-24 pb-16 md:pt-[138px] md:pb-[74px]">
      <div className="max-w-[1120px] mx-auto">
        <div className="text-[11px] font-bold tracking-[0.16em] uppercase text-[#A6C384] mb-6">
          Vetted Bespoke
        </div>

        <h1 className="font-['Cormorant_Garamond',serif] font-medium text-[34px] md:text-[56px] leading-[1.12] tracking-[-0.01em] text-white max-w-[780px] mb-7">
          For hiring challenges that need more.
        </h1>

        <p className="text-[17px] font-light leading-[1.65] text-white/74 max-w-[580px] mb-11">
          Vetted Bespoke works with healthcare organizations on complex
          recruitment and workforce initiatives — from transforming how an
          organization hires and implementing recruitment technology to
          supporting permanent recruitment strategy, expansion, mass recruitment
          and large-scale workforce mobilization.
        </p>
        <a
          href="#inquiry"
          className="group inline-flex items-center gap-[6px] text-[12.5px] font-medium tracking-[0.035em] uppercase text-[#A6C384] pb-[7px] border-b border-current transition-[gap] duration-300 hover:gap-[11px]"
        >
          Discuss a Bespoke Engagement
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-[2px]">
            →
          </span>
        </a>
      </div>
    </section>
  );
}
