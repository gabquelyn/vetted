import React from "react";
import Hero from "../components/RolesHero";
import { FAQSection } from "../components/Faq";
import { Roles } from "../components/Roles";

const ROLES = [
  {
    code: "PA",
    title: "Physician Assistant",
    regulated: true,
    body: "CPSO (since 2023)",
  },
  {
    code: "MDRD",
    title: "Sterile Processing Technician",
    regulated: false,
    note: "Voluntary · CMDRT",
  },
  { code: "ME", title: "Medical Esthetician", regulated: false },
  { code: "DH", title: "Dental Hygienist", regulated: true, body: "CDHO" },
  {
    code: "DA",
    title: "Dental Assistant",
    regulated: false,
    note: "HARP designation recognized",
  },
  { code: "AUD", title: "Audiologist", regulated: true, body: "CASLPO" },
  { code: "MID", title: "Midwife", regulated: true, body: "CMO" },
  { code: "CHW", title: "Community Health Worker", regulated: false },
];

const FAQS = [
  {
    q: "Physician Assistants are newly regulated in Ontario — how does Vetted handle this?",
    a: "Physician Assistants became regulated under CPSO in Ontario in 2023, making this one of the most dynamic roles in the province right now. Vetted captures your CPSO registration status, your supervising physician arrangements, and your clinical specializations so employers can find you confidently.",
  },
  {
    q: "Can Sterile Processing Technicians find work across different healthcare settings?",
    a: "Yes. Sterile Processing Technicians (MDRDs) are needed across hospitals, surgical centres, and dental clinics throughout Ontario. Your CMDRT certification, experience with specific sterilization systems, and availability are all reflected in your profile.",
  },
  {
    q: "Is Vetted relevant for Dental Hygienists in Ontario?",
    a: "Yes. CDHO-regulated Dental Hygienists are in high demand across dental offices, public health units, and long-term care facilities. Your registration, clinical experience, and preferred work settings are captured in your Vetted profile.",
  },
  {
    q: "Can Medical Estheticians find clinical or medispa work through Vetted?",
    a: "Yes. Medical Estheticians are in demand at medical spas, dermatology clinics, plastic surgery offices, and wellness centres across Ontario. While the role is not regulated, your training credentials, treatment certifications, and specialized skills will be featured prominently.",
  },
  {
    q: "What is the benefit of joining Vetted for emerging or niche healthcare roles?",
    a: "General job boards treat niche healthcare roles as afterthoughts. Vetted is built exclusively for the healthcare sector, which means employers searching for specialized roles like PAs, Audiologists, Midwives, and Community Health Workers are already on the platform looking for you.",
  },
  {
    q: "My role is not listed here — can I still join Vetted?",
    a: "Vetted is continuously expanding the roles we support. If your healthcare role is not listed, contact us — we may already be onboarding your profession, or we can tell you when it will be available.",
  },
];

export default function page() {
  return (
    <div>
      <Hero
        name="Specialized & Emerging Roles"
        caption={
          <>
            Your role is specialized.
            <br />
            <span className="italic text-forest">Your platform</span>
            <br />
            should be too.
          </>
        }
        sub="Physician Assistants, Dental Hygienists, Midwives, Audiologists, Sterile Processing Technicians, and more — Vetted is the only curated registry in Ontario built to serve the full spectrum of specialized and emerging roles."
      />
      <Roles roles={ROLES} />
      <FAQSection faqs={FAQS} />
    </div>
  );
}
