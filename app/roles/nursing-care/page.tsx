import React from "react";
import Hero from "../components/RolesHero";
import { FAQSection } from "../components/Faq";
import { Roles } from "../components/Roles";

const ROLES = [
  { code: "RN", title: "Registered Nurse", regulated: true, body: "CNO" },
  {
    code: "RPN",
    title: "Registered Practical Nurse",
    regulated: true,
    body: "CNO",
  },
  { code: "NP", title: "Nurse Practitioner", regulated: true, body: "CNO" },
  {
    code: "PSW",
    title: "Personal Support Worker",
    regulated: false,
    note: "Voluntary — HSCPOA",
  },
  { code: "HCA", title: "Health Care Aide", regulated: false },
  { code: "HSW", title: "Home Support Worker", regulated: false },
  { code: "DSW", title: "Developmental Services Worker", regulated: false },
];

const FAQS = [
  {
    q: "Can PSWs find independent work without going through a staffing agency in Ontario?",
    a: "Yes. Vetted was built with independent PSWs in mind. Many PSWs lose a significant portion of their earnings to agency fees. On Vetted, you set your own terms, your profile is visible to direct employers, and you negotiate directly — no agency in the middle.",
  },
  {
    q: "How do RNs and RPNs find casual or contract positions in Ontario through Vetted?",
    a: "Once your profile is live on Vetted, employers searching for casual, part-time, or contract RNs and RPNs can find you directly. Your preferred availability and work settings are part of your profile, so employers already know what you're looking for before they reach out.",
  },
  {
    q: "Do I need CNO registration to join Vetted as a nurse?",
    a: "If you are practising as an RN, RPN, or NP in Ontario, CNO registration is a legal requirement and will be part of your profile verification. Unregulated roles like PSW, HCA, and HSW do not require a regulatory college.",
  },
  {
    q: "Can HCAs and Home Support Workers join Vetted even though they are not regulated?",
    a: "Absolutely. Vetted welcomes both regulated and unregulated healthcare workers. HCAs, HSWs, and DSWs are in high demand across long-term care, home care, and community settings in Ontario. Your profile will reflect your training, certifications, and experience.",
  },
  {
    q: "What types of employers are looking for nursing and direct care professionals on Vetted?",
    a: "Long-term care homes, retirement residences, home care agencies, private households, group homes, hospitals, and community health centres are among the employers using Vetted to find nursing and direct care staff across Ontario.",
  },
  {
    q: "Is Vetted available in my city in Ontario?",
    a: "Vetted is actively building coverage across all of Ontario — including the GTA, Hamilton, Ottawa, London, Kitchener-Waterloo, Barrie, Sudbury, Thunder Bay, and beyond. No matter where you are in the province, your profile is visible to employers in your area.",
  },
];

export default function page() {
  return (
    <div>
      <Hero
        name="Nursing & Direct Care"
        caption={
          <>
            Nursing is the backbone.
            <br />
            <span className="italic text-[#2D5016]">Your profile</span>
            <br />
            does the work.
          </>
        }
        sub="RNs, RPNs, NPs, PSWs, HCAs, and Home Support Workers across Ontario —
            Vetted puts your verified profile in front of employers who are actively searching
            for exactly your experience. No applications required."
      />
      <Roles roles={ROLES} />
      <FAQSection faqs={FAQS} />
    </div>
  );
}
