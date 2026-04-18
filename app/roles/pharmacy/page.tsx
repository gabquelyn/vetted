import React from "react";
import Hero from "../components/RolesHero";
import { FAQSection } from "../components/Faq";
import { Roles } from "../components/Roles";

const ROLES = [
  { code: "RPH", title: "Pharmacist", regulated: true, body: "OCP" },
  { code: "PHT", title: "Pharmacy Technician", regulated: true, body: "OCP" },
  { code: "PHA", title: "Pharmacy Assistant", regulated: false },
];

const FAQS = [
  {
    q: "Can pharmacists find locum or part-time positions in Ontario through Vetted?",
    a: "Yes. Many pharmacists use Vetted to find locum coverage, part-time positions, or permanent roles across independent pharmacies, chain retail pharmacies, and clinical settings in Ontario. Your OCP registration and availability are clearly displayed for employers.",
  },
  {
    q: "Are Pharmacy Technicians in high demand through Vetted?",
    a: "Yes. Regulated Pharmacy Technicians (RPHTs) are increasingly in demand as pharmacy scopes of practice expand in Ontario. Your OCP registration, compounding experience, and familiarity with dispensary software (Kroll, Fillware, etc.) will stand out to employers.",
  },
  {
    q: "Can Pharmacy Assistants join Vetted without OCP registration?",
    a: "Yes. Pharmacy Assistants are welcome on Vetted. While they are not regulated by the OCP, your training, dispensing software experience, and pharmacy environment knowledge are reflected in your profile and valued by employers.",
  },
  {
    q: "What types of pharmacy employers are on Vetted?",
    a: "Independent community pharmacies, chain retail locations, hospital pharmacy departments, long-term care pharmacies, and compounding pharmacies across Ontario are among the employers using Vetted to find pharmacy professionals.",
  },
  {
    q: "How does Vetted handle confidentiality for pharmacy professionals?",
    a: "Your contact details are private until an employer pays to unlock them. You are discoverable by your credentials, experience, and location — but you remain in full control of who you actually speak with.",
  },
];

export default function page() {
  return (
    <div>
      <Hero
        name="Pharmacy"
        caption={
          <>
            The prescription for
            <br />
            <span className="italic text-[#2D5016]">your next role is</span>
            <br />
            already here.
          </>
        }
        sub="Pharmacists, Pharmacy Technicians, and Pharmacy Assistants across Ontario — Vetted puts your verified credentials in front of the community pharmacies, hospital departments, and LTC pharmacies searching for you."
      />
      <Roles roles={ROLES} />
      <FAQSection faqs={FAQS} />
    </div>
  );
}
