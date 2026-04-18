import React from "react";
import Hero from "../components/RolesHero";
import { FAQSection } from "../components/Faq";
import { Roles } from "../components/Roles";

const ROLES = [
  { code: "RSW", title: "Social Worker", regulated: true, body: "OCSWSSW" },
  {
    code: "RSSW",
    title: "Social Service Worker",
    regulated: true,
    body: "OCSWSSW",
  },
  { code: "MHW", title: "Mental Health Worker", regulated: false },
  {
    code: "AC",
    title: "Addictions Counsellor",
    regulated: false,
    note: "Voluntary · CACCF",
  },
  { code: "BT", title: "Behaviour Technician", regulated: false },
  {
    code: "RP",
    title: "Registered Psychotherapist",
    regulated: true,
    body: "CRPO",
  },
];

const FAQS = [
  {
    q: "Can Social Workers find contract or part-time positions through Vetted in Ontario?",
    a: "Yes. RSWs and RSSWs are in demand across community health, hospitals, children's services, school boards, and private practice across Ontario. Vetted lets you specify your preferred work type and setting, so you hear from employers who match what you're looking for.",
  },
  {
    q: "Do Mental Health Workers and Addictions Counsellors need to be regulated to join?",
    a: "No. MHWs and Addictions Counsellors are welcome on Vetted even without regulated status. Your training, certifications (such as CACCF), and experience are what employers care about, and your profile reflects all of that.",
  },
  {
    q: "What types of organizations hire mental health and social services workers through Vetted?",
    a: "Community mental health agencies, hospitals, schools, addiction treatment centres, crisis lines, children's aid societies, long-term care facilities, and private practices are among the organizations using Vetted to find qualified mental health and social services professionals.",
  },
  {
    q: "I am a Registered Psychotherapist — is Vetted for me?",
    a: "Yes. RPs are regulated by the CRPO and are in demand across a wide range of settings. Your CRPO membership, therapeutic modalities, and areas of focus are all captured in your Vetted profile, making it easy for employers to find the right fit.",
  },
  {
    q: "How does Vetted protect my privacy as a candidate?",
    a: "Your full contact information is private by default. Employers can see your professional profile, credentials, and experience — but they must pay to unlock your contact information. This means you're only contacted by employers who are serious about connecting.",
  },
];

export default function page() {
  return (
    <div>
      <Hero
        name="Mental Health & Social Services"
        caption={
          <>
            The work you do is essential.
            <br />
            <span className="italic text-[#2D5016]">Your next role</span>
            <br />
            should feel that way too.
          </>
        }
        sub="Social Workers, Mental Health Workers, Addictions Counsellors, Behaviour Technicians, and Registered Psychotherapists across Ontario — your profile is how the right employers find you."
      />
      <Roles roles={ROLES} />
      <FAQSection faqs={FAQS} />
    </div>
  );
}
