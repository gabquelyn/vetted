import React from "react";
import RolesHero from "../components/RolesHero";
import { FAQSection } from "../components/Faq";
import { Roles } from "../components/Roles";
const FAQS = [
  {
    q: "Can OTs and PTs find private clinic contracts in Ontario through Vetted?",
    a: "Yes. Private clinics, rehabilitation centres, and community health organizations actively search for OTs and PTs on Vetted. Your profile highlights your specializations, preferred settings, and availability so employers know you're the right fit before they reach out.",
  },
  {
    q: "I am a Registered Massage Therapist — is Vetted relevant for me?",
    a: "Absolutely. RMTs are in high demand across wellness clinics, physiotherapy practices, and corporate settings in Ontario. Vetted connects you directly with employers, eliminating the need to apply through job boards or agencies.",
  },
  {
    q: "How do allied health professionals verify their regulatory college membership on Vetted?",
    a: "Your regulatory college information (COTO, CPO, CMTO, etc.) is included in your profile and reviewed by the Vetted team during the manual verification process. This gives employers immediate confidence in your credentials.",
  },
  {
    q: "Can PTAs and OTAs join even though they are not regulated?",
    a: "Yes. PTA/OTA assistants are valuable and in demand. Vetted welcomes unregulated allied health support roles. Your training, supervised hours, and work experience will be reflected in your profile.",
  },
  {
    q: "What types of employers look for allied health professionals on Vetted?",
    a: "Private rehabilitation clinics, hospitals, community health centres, long-term care homes, school boards, occupational health firms, and home care providers are among the employers using Vetted to find allied health professionals across Ontario.",
  },
  {
    q: "Can I specify that I only want part-time or contract work through Vetted?",
    a: "Yes. Your profile captures your preferred work type — full-time, part-time, contract, casual, or per diem. Employers see your preferences upfront, so you only hear from those offering what you're actually looking for.",
  },
];

const ROLES = [
  {
    code: "OT",
    title: "Occupational Therapist",
    regulated: true,
    body: "COTO",
  },
  { code: "PT", title: "Physiotherapist", regulated: true, body: "CPO" },
  {
    code: "SLP",
    title: "Speech-Language Pathologist",
    regulated: true,
    body: "CASLPO",
  },
  { code: "RT", title: "Respiratory Therapist", regulated: true, body: "CRTO" },
  {
    code: "RKIN",
    title: "Registered Kinesiologist",
    regulated: true,
    body: "COKO",
  },
  {
    code: "RMT",
    title: "Registered Massage Therapist",
    regulated: true,
    body: "CMTO",
  },
  { code: "DC", title: "Chiropractor", regulated: true, body: "CCO" },
  { code: "PTA/OTA", title: "Physiotherapy / OT Assistant", regulated: false },
  { code: "PMD", title: "Paramedic", regulated: true, body: "MOH / CPCS" },
];
export default function page() {
  return (
    <div>
      <RolesHero
        name="Allied Health & Therapy"
        caption={
          <>
            Your credentials are rare.
            <br />
            <span className="italic text-[#2D5016]">
              Employers should find you
            </span>
            ,<br />
            not the other way around.
          </>
        }
        sub="    OTs, PTs, SLPs, RMTs, Kinesiologists, Chiropractors and more — Vetted
      puts your verified profile in front of employers actively searching
      for your expertise."
      />
      <Roles roles={ROLES} />
      <FAQSection faqs={FAQS} />
    </div>
  );
}
