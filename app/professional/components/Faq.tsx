"use client";
import { useState } from "react";
const FAQ_ITEMS: { q: string; a: string }[] = [
  {
    q: "What is Vetted, and is it live yet?",
    a: "Vetted is a healthcare talent registry that gives Ontario employers another way to find qualified professionals. Vetted is currently preparing to launch — joining through this page registers your interest, and we'll contact you when it's time to complete your full Vetted profile.",
  },
  {
    q: "Is Vetted free for healthcare professionals?",
    a: "Yes. There's no cost to healthcare professionals to create a profile or be discoverable on Vetted, whether through the Registry, the Directory, or both.",
  },
  {
    q: "Who can see my profile and personal information?",
    a: "Employers can discover your professional profile — your experience, skills and availability — without automatically receiving your name or contact details. Identity and contact access follow the applicable Vetted workflow, including Reveal where relevant. Vetted does not publish your personal contact information publicly.",
  }, 
  {
    q: "Why do I need to confirm my Registry profile every 30 days?",
    a: "Vetted is built around current availability rather than a stale, passive database. Every 30 days, Registry professionals are asked to explicitly reconfirm that their information and availability are still accurate.",
  },
  {
    q: "What happens if I don't confirm after 30 days?",
    a: "Your Registry profile becomes non-discoverable to employers until you reconfirm it. Your profile and information are not deleted — you can reconfirm and become discoverable again at any time.",
  },
  {
    q: "What's the difference between the Registry and the Directory?",
    a: "In the Registry, employers actively search and filter professionals based on their hiring needs. In the Directory, you maintain a standing discoverable presence that employers can browse — when an employer finds someone they'd like to approach, they can send that professional an opportunity directly. You can choose Registry, Directory, both, or neither, depending on what's available to you.",
  },
  {
    q: "Do I have to be actively looking for work to join Vetted?",
    a: "No. You can be currently employed or not actively job hunting while still being open to the right future opportunity, depending on the discoverability choices you make. Joining doesn't obligate you to respond to any opportunity you're sent.",
  },
  {
    q: "I'm an independent contractor. Can I use Vetted?",
    a: "Yes. Independent contractors can indicate that they work independently and share relevant contract preferences, including their minimum notice requirement. Working as an IC doesn't mean you're expected to be available same-day or on-call.",
  },
  {
    q: "What happens when an employer is interested in me?",
    a: "The next step depends on how you were discovered and the applicable Vetted workflow. Your personal contact information isn't simply made public because an employer sees your professional profile — it's shared according to Vetted's controlled access rules.",
  },
];
export default function Faq() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  function toggleFaq(index: number) {
    setOpenFaqIndex((cur) => (cur === index ? null : index));
  }
  return (
    <section
      id="faq"
      className="reveal bg-[#0e1808] px-0 pb-24 pt-22 text-white max-[600px]:pb-19 max-[600px]:pt-16"
    >
      <div className="mx-auto max-w-190 px-8">
        <div className="mb-11 text-center">
          <div className="mb-3.5 text-[11.5px] font-semibold uppercase tracking-[0.08em] text-[#9FC47C]">
            FAQ
          </div>
          <h2 className="font-['Cormorant_Garamond',serif] text-[clamp(26px,3vw,36px)] font-semibold text-white">
            Professional questions, answered.
          </h2>
        </div>

        {FAQ_ITEMS.map((item, i) => {
          const isOpen = openFaqIndex === i;
          return (
            <div
              key={item.q}
              className="border-t border-white/12 last:border-b last:border-white/12"
            >
              <button
                type="button"
                onClick={() => toggleFaq(i)}
                aria-expanded={isOpen}
                aria-controls={`pfaq-a-${i + 1}`}
                id={`pfaq-q-${i + 1}`}
                className="flex w-full items-center justify-between gap-4 px-1 py-5 text-left text-[15px] font-semibold text-inherit focus-visible:rounded  focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9FC47C]"
              >
                <span>{item.q}</span>
                <span
                  aria-hidden="true"
                  className={`shrink-0 text-lg text-[#9FC47C] transition-transform duration-250 ease-in-out ${
                    isOpen ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>
              <div
                id={`pfaq-a-${i + 1}`}
                role="region"
                aria-labelledby={`pfaq-q-${i + 1}`}
                className={`overflow-hidden transition-[max-height] duration-350 ease-in-out ${
                  isOpen ? "max-h-70 max-[600px]:max-h-85" : "max-h-0"
                }`}
              >
                <p className="px-1 pb-5.5 text-sm leading-[1.65] text-white/65">
                  {item.a}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
