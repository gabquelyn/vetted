import React from "react";
import Hero from "../components/RolesHero";
import { FAQSection } from "../components/Faq";
import { Roles } from "../components/Roles";
const ROLES = [
  { code: "MOA", title: "Medical Office Assistant", regulated: false },
  { code: "MS", title: "Medical Secretary", regulated: false },
  { code: "HUC", title: "Health Unit Coordinator", regulated: false },
  { code: "PRC", title: "Patient Registration Clerk", regulated: false },
];

const FAQS = [
  {
    q: "Can MOAs find work in different types of clinical settings through Vetted?",
    a: "Yes. Medical Office Assistants are needed across family practices, specialist clinics, hospitals, community health centres, and private medical offices across Ontario. Your Vetted profile captures your experience with specific EMR systems, scheduling software, and clinical environments.",
  },
  {
    q: "What makes Vetted better than Indeed or other job boards for medical admin roles?",
    a: "On job boards, your application competes with hundreds of others and often goes unread. On Vetted, employers who have searched for your specific skills and experience are the ones reaching out. It's a fundamentally different quality of interaction.",
  },
  {
    q: "Do Health Unit Coordinators need any specific certification to join Vetted?",
    a: "There is no regulatory requirement for HUCs in Ontario. However, your profile can reflect any relevant certifications, hospital experience, unit specializations, and EMR familiarity. The Vetted team reviews all profiles for quality before they go live.",
  },
  {
    q: "Can I specify that I want to work in a specific city or region in Ontario?",
    a: "Yes. Your location preferences are part of your Vetted profile. Whether you want to work in the GTA, Ottawa, Hamilton, London, or anywhere else in Ontario, employers in your region can find you specifically.",
  },
  {
    q: "Is medical administration experience in non-clinical settings valued on Vetted?",
    a: "Vetted is focused on healthcare settings. Ideal candidates have experience in clinical, hospital, long-term care, or community health environments. However, relevant administrative experience with patient-facing roles is considered during the profile review.",
  },
];
export default function page() {
  return (
    <div>
      <Hero
        name="Medical Administration"
        caption={
          <>
            The clinic runs because you do.
            <br />
            <span className="italic text-[#2D5016]">
              Let employers see that.
            </span>
          </>
        }
        sub="MOAs, Medical Secretaries, Health Unit Coordinators, and Patient Registration Clerks — Vetted puts your administrative expertise in front of the healthcare organizations across Ontario that are actively looking for you."
      />
      <Roles roles={ROLES} />
      <FAQSection faqs={FAQS} />
    </div>
  );
}
