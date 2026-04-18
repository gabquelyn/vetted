import React from "react";
import Hero from "../components/RolesHero";
import { FAQSection } from "../components/Faq";
import { Roles } from "../components/Roles";

const ROLES = [
  { code: "RD", title: "Registered Dietitian", regulated: true, body: "CDO" },
  { code: "NUT", title: "Nutritionist", regulated: false },
  { code: "DA", title: "Dietary Aide", regulated: false },
];

const FAQS = [
  {
    q: "Can Registered Dietitians find private practice or contract opportunities through Vetted?",
    a: "Yes. RDs are in demand across hospitals, long-term care, eating disorder clinics, sports facilities, corporate wellness programs, and private practice settings in Ontario. Your CDO registration, clinical specializations, and therapeutic areas are captured in your profile.",
  },
  {
    q: 'The title "Nutritionist" is unregulated in Ontario — can I still join Vetted?',
    a: "Yes. While the RD designation is regulated by the CDO, many employers seek nutritionists with specific certifications and experience for wellness, community health, and coaching roles. Your training, certifications, and areas of expertise will be prominently reflected in your profile.",
  },
  {
    q: "Can Dietary Aides in long-term care facilities find work through Vetted?",
    a: "Absolutely. Dietary Aides are in consistent demand across long-term care homes, retirement residences, and hospital food services throughout Ontario. Your experience with therapeutic diets, food safety certifications, and kitchen environments will be featured in your profile.",
  },
  {
    q: "What types of organizations hire dietitians and nutrition professionals through Vetted?",
    a: "Hospitals, long-term care homes, public health units, sports performance centres, eating disorder programs, corporate wellness providers, dialysis centres, and private clinics are among the employers using Vetted to find nutrition and dietary professionals across Ontario.",
  },
  {
    q: "Can I specify my dietary specialization — such as renal, oncology, or pediatrics?",
    a: "Yes. Your Vetted profile captures your clinical specialization areas in detail. Whether you specialize in renal nutrition, oncology, eating disorders, pediatrics, or sports dietetics, employers searching for those specific areas will find you.",
  },
];

export default function page() {
  return (
    <div>
      <Hero
        name="Nutrition & Dietary"
        caption={
          <>
            Food is medicine.
            <br />
            <span className="italic text-[#2D5016]">Your expertise</span>
            <br />
            should be easy to find
          </>
        }
        sub="Registered Dietitians, Nutritionists, and Dietary Aides across Ontario — Vetted puts your profile in front of hospitals, long-term care homes, and specialized clinics who need exactly your background."
      />
      <Roles roles={ROLES} />
      <FAQSection faqs={FAQS} />
    </div>
  );
}
