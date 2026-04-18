import React from "react";
import RolesHero from "../components/RolesHero";
import { FAQSection } from "../components/Faq";
import { Roles } from "../components/Roles";

const FAQS = [
  {
    q: "Can MLTs find contract or per diem positions in Ontario through Vetted?",
    a: "Yes. Medical Laboratory Technologists are in demand across hospitals, independent labs, and community collection centres in Ontario. Your CMLTO registration, specialized areas (hematology, microbiology, chemistry, etc.), and availability are all captured in your profile.",
  },
  {
    q: "How do Diagnostic Imaging Technologists get found by employers on Vetted?",
    a: "Once your profile is live, employers searching for CMRITO-registered DIT, UST, or XRT professionals in Ontario can find your profile directly. They see your modality specializations, clinical settings experience, and availability before paying to connect.",
  },
  {
    q: "Are phlebotomists and lab assistants welcome even without CMLTO registration?",
    a: "Yes. Phlebotomists and Lab Technicians/Assistants are welcome on Vetted. While CMLTO registration is voluntary, you can reflect any voluntary certification on your profile. Community collection sites, hospital outpatient labs, and point-of-care testing sites actively look for skilled phlebotomists.",
  },
  {
    q: "Is Vetted relevant for ultrasound technologists looking for part-time or casual work?",
    a: "Absolutely. Many ultrasound technologists use Vetted to find casual or part-time contracts at private imaging clinics, hospitals, or OB/GYN practices across Ontario while maintaining their primary position elsewhere.",
  },
  {
    q: "How is Vetted different from healthcare-specific staffing agencies for diagnostics roles?",
    a: "Staffing agencies act as a middleman and take a portion of your earnings. Vetted connects you directly with employers who pay to access your contact information — your rate is between you and the employer, with no agency cut.",
  },
];
const ROLES = [
  {
    code: "MLT",
    title: "Medical Laboratory Technologist",
    regulated: true,
    body: "CMLTO",
  },
  {
    code: "PHL",
    title: "Phlebotomist",
    regulated: false,
    note: "Voluntary · CMLTO roster",
  },
  {
    code: "LAB",
    title: "Lab Technician / Assistant",
    regulated: false,
    note: "Voluntary · CMLTO roster",
  },
  {
    code: "DIT",
    title: "Diagnostic Imaging Technologist",
    regulated: true,
    body: "CMRITO",
  },
  {
    code: "UST",
    title: "Ultrasound Technologist",
    regulated: true,
    body: "CMRITO",
  },
  { code: "XRT", title: "X-Ray Technologist", regulated: true, body: "CMRITO" },
];

export default function page() {
  return (
    <div>
      <RolesHero
        name="Diagnostics & Lab"
        caption={
          <>
            Your precision powers diagnosis.
            <br />
            <span className="italic text-[#2D5016]">Your profile{" "}</span>
             should reflect that precision.
          </>
        }
        sub="MLTs, Phlebotomists, Diagnostic Imaging Technologists, Ultrasound and X-Ray Technologists — Vetted connects Ontario's most skilled lab and imaging professionals directly with the organizations that need them."
      />
      <Roles roles={ROLES} />
      <FAQSection faqs={FAQS} />
    </div>
  );
}
