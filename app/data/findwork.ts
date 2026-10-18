/* ============================================================
   VETTED FIND WORK — DATA + ROUTING HELPERS
   Extracted from the original Find Work module. Contains only what the
   profession directory (and any other page that links to profession /
   city pages) needs: taxonomy, geography, seeded-page registry, search,
   and the single destination builder. FAQs, renderers and the router
   are intentionally NOT included.

   NOTE: routes are real paths (/roles/..., /locations/..., /join). Every
   link in the app is produced by buildDestination() / buildJoinDestination(),
   so changing the URL scheme only ever means editing those two functions.
   ============================================================ */

export function slugify(str: string): string {
  return str.toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// ---------- TYPES ----------
export interface Specialty { name: string; short: string; slug: string; aliases: string[]; }
export interface Profession {
  code: string; name: string; abbrev?: string; slug: string; cluster: string;
  specialist?: boolean; blurb: string; aliases: string[]; settings?: string[];
  specialties?: Specialty[]; launch?: string;
}
export interface City { name: string; slug: string; region: string; }
export interface Cluster { slug: string; name: string; }

// ---------- CLUSTERS ----------
export const CLUSTERS: Cluster[] = [
  { slug: "nursing", name: "Nursing" },
  { slug: "personal-care", name: "Personal Care & Support" },
  { slug: "allied-health", name: "Allied Health" },
  { slug: "medical-admin", name: "Medical Office & Administration" },
  { slug: "diagnostics-lab", name: "Laboratory" },
  { slug: "medical-imaging", name: "Medical Imaging" },
  { slug: "pharmacy", name: "Pharmacy" },
  { slug: "mental-health", name: "Mental Health & Social Services" },
  { slug: "rehab-dental", name: "Rehabilitation & Dental" },
  { slug: "emergency-medical", name: "Emergency & Specialized Medical" },
  { slug: "food-nutrition", name: "Food & Nutrition Services" },
];

export const FILTER_CATEGORIES: { key: string; label: string; clusters: string[] | null }[] = [
  { key: "all", label: "All", clusters: null },
  { key: "nursing", label: "Nursing", clusters: ["nursing"] },
  { key: "personal-care", label: "Personal Care", clusters: ["personal-care"] },
  { key: "allied-health", label: "Allied Health", clusters: ["allied-health", "rehab-dental"] },
  { key: "mental-health", label: "Mental Health", clusters: ["mental-health"] },
  { key: "diagnostics", label: "Diagnostics", clusters: ["diagnostics-lab", "medical-imaging"] },
  { key: "administration", label: "Administration", clusters: ["medical-admin"] },
  { key: "pharmacy", label: "Pharmacy", clusters: ["pharmacy"] },
  { key: "more", label: "More", clusters: ["emergency-medical", "food-nutrition"] },
];

export const CLUSTER_DEFAULT_SETTINGS: Record<string, string[]> = {
  "nursing": ["hospitals", "long-term care", "home care", "community health"],
  "personal-care": ["long-term care", "retirement homes", "home care", "community support"],
  "allied-health": ["hospitals", "rehab clinics", "community health", "private practice"],
  "medical-admin": ["clinics", "hospital departments", "community health centres"],
  "diagnostics-lab": ["hospital labs", "community labs"],
  "medical-imaging": ["hospitals", "community diagnostic imaging clinics"],
  "pharmacy": ["community pharmacies", "hospital pharmacy"],
  "mental-health": ["community mental health programs", "hospitals", "private practice", "schools"],
  "rehab-dental": ["clinics", "private practice", "community health"],
  "emergency-medical": ["hospitals", "clinics"],
  "food-nutrition": ["long-term care", "hospital food service", "retirement homes"],
};

// ---------- LAUNCH STATUS (employer-side visibility; does NOT gate page approval) ----------
export const LAUNCH_STATUS: Record<string, string> = {
  RN: "live", RPN: "live", NP: "live",
  PSW: "live", UCP: "live", CCA: "future", DSW: "live",
  HSK: "coming_soon",
  OT: "coming_soon", PT: "coming_soon", SLP: "future", RT: "future", RD: "future", AUD: "future", MW: "future",
  RT2: "live", RA: "future",
  MOA: "live", MAA: "live", SCHED: "live", UC: "coming_soon", PRC: "future", IHW: "future", CM: "future",
  MLT: "coming_soon", PHL: "coming_soon", LAB: "coming_soon",
  MRTR: "coming_soon", MRTT: "coming_soon", MRTN: "coming_soon", MRTMR: "coming_soon", DMS: "coming_soon",
  PHARM: "future", PHARMT: "coming_soon", PHARMA: "coming_soon",
  RSW: "live", RSSW: "live", RP: "coming_soon", MHW: "coming_soon", BT: "coming_soon",
  CYCP: "live", PSYCH: "coming_soon", PSYA: "coming_soon", RBA: "coming_soon", PSYT: "future",
  KIN: "coming_soon", DC: "future", RMT: "coming_soon", OTA: "future", PTA: "future", DH: "future", DA2: "coming_soon",
  PARA: "future", PA: "future", ME: "coming_soon", MDRD: "coming_soon",
  DA: "live", COOK: "live", NUT: "coming_soon",
};

// ---------- SPECIALTY HELPER ----------
export function spec(name: string, short?: string, aliases: string[] = []): Specialty {
  return { name, short: short || name, slug: slugify(short || name), aliases: aliases || [] };
}

// ---------- PROFESSIONS ----------
export const PROFESSIONS: Profession[] = [
  // ---------------- Nursing ----------------
  { code: "RN", name: "Registered Nurse", abbrev: "RN", slug: "registered-nurse", cluster: "nursing",
    blurb: "Registered Nurses assess, plan and deliver care across acute, community and long-term settings in Ontario, regulated by the College of Nurses of Ontario.",
    aliases: ["nurse", "nursing"],
    specialties: [
      spec("ICU & Critical Care", "ICU & Critical Care", ["ICU", "critical care", "intensive care"]),
      spec("Emergency & Trauma", "Emergency", ["ER", "ED", "emergency room", "emergency department"]),
      spec("PeriAnesthesia & PACU", "PACU", ["PACU", "recovery room", "post-anesthesia", "post-anaesthesia"]),
      spec("Perioperative & OR", "Perioperative & OR", ["OR", "operating room", "surgical"]),
      spec("Neonatal NICU", "NICU", ["NICU", "neonatal", "newborn ICU"]),
      spec("Obstetrics & Labour", "Labour & Delivery", ["labour and delivery", "L&D", "obstetrics", "OBS", "maternity"]),
      spec("Perinatal", "Perinatal", ["PERI", "perinatal care"]),
      spec("Maternal-Newborn", "Maternal-Newborn", ["mother baby", "postpartum"]),
      spec("Paediatrics", "Paediatrics", ["pediatrics", "PEDS", "peds nursing"]),
      spec("Cardiovascular & Cardiac", "Cardiac Care", ["cardiac", "cardiovascular", "cardiology"]),
      spec("Mental Health & Psychiatric", "Mental Health", ["psychiatric", "psych nursing"]),
      spec("Oncology", "Oncology", ["cancer care"]),
      spec("Nephrology & Dialysis", "Dialysis", ["dialysis", "nephrology", "renal"]),
      spec("Palliative Care & Hospice", "Palliative Care", ["hospice", "end of life"]),
      spec("Long-Term Care", "Long-Term Care", ["LTC"]),
      spec("Neuroscience & Stroke", "Stroke & Neuro", ["stroke", "neurology", "neuro"]),
    ] },
  { code: "RPN", name: "Registered Practical Nurse", abbrev: "RPN", slug: "registered-practical-nurse", cluster: "nursing",
    blurb: "Registered Practical Nurses provide hands-on clinical care across long-term care, retirement, hospital and community settings, regulated by the College of Nurses of Ontario.",
    aliases: ["practical nurse"],
    specialties: [
      spec("Long-Term Care", "Long-Term Care", ["LTC"]),
      spec("Medical-Surgical", "Medical-Surgical", ["med-surg"]),
      spec("Mental Health & Psychiatric", "Mental Health", ["psychiatric"]),
      spec("Palliative Care & Hospice", "Palliative Care", ["hospice"]),
      spec("Emergency & Trauma", "Emergency", ["ER", "ED"]),
      spec("Rehabilitation", "Rehabilitation", ["rehab"]),
      spec("Geriatrics & Gerontology", "Geriatrics", ["geriatric care"]),
      spec("Wound Care & Ostomy", "Wound Care", ["wound care", "ostomy"]),
    ] },
  { code: "NP", name: "Nurse Practitioner", abbrev: "NP", slug: "nurse-practitioner", cluster: "nursing", specialist: true,
    blurb: "Nurse Practitioners diagnose, treat and prescribe independently across primary care, specialty clinics and remote practice, regulated by the College of Nurses of Ontario.",
    aliases: [],
    specialties: [
      spec("Primary Health Care", "Primary Care"),
      spec("Geriatrics", "Geriatrics"),
      spec("Mental Health", "Mental Health"),
      spec("Paediatrics", "Paediatrics", ["pediatrics"]),
      spec("Palliative Care", "Palliative Care"),
      spec("Remote & Northern", "Remote & Northern"),
    ] },

  // ---------------- Personal Care & Support ----------------
  { code: "PSW", name: "Personal Support Worker", abbrev: "PSW", slug: "personal-support-worker", cluster: "personal-care",
    blurb: "Personal Support Workers provide direct personal care across long-term care, retirement homes, home care and community settings under Ontario's voluntary HSCPOA registration.",
    aliases: [],
    specialties: [
      spec("Geriatric & Seniors Care", "Seniors Care"),
      spec("Dementia & Alzheimer Care", "Dementia Care", ["alzheimer"]),
      spec("Palliative & End-of-Life", "Palliative Care", ["end of life"]),
      spec("Complex Chronic Care", "Complex Care"),
      spec("Developmental Disabilities", "Developmental Disabilities"),
      spec("Paediatric Care", "Paediatric Care", ["pediatric"]),
    ] },
  { code: "UCP", name: "Unregulated Care Provider", abbrev: "UCP", slug: "unregulated-care-provider", cluster: "personal-care",
    blurb: "Unregulated Care Providers cover internationally-educated nurses awaiting registration, IEN candidates and nursing/PSW students building Ontario care experience.",
    aliases: ["HCA", "PCA", "health care aide", "personal care aide", "internationally educated nurse", "IEN", "PSW student", "nursing student"],
    specialties: [
      spec("Geriatric & Seniors Care", "Seniors Care"),
      spec("Dementia & Alzheimer Care", "Dementia Care"),
      spec("Palliative & End-of-Life", "Palliative Care"),
      spec("Complex Chronic Care", "Complex Care"),
    ] },
  { code: "CCA", name: "Continuing Care Assistant", slug: "continuing-care-assistant", cluster: "personal-care",
    blurb: "Continuing Care Assistants support daily living and personal care needs in long-term and community care settings.", aliases: [], specialties: [] },
  { code: "HSK", name: "Housekeeper", slug: "housekeeper", cluster: "personal-care",
    blurb: "Housekeepers provide environmental services and cleaning support across long-term care, retirement and healthcare settings, helping maintain safe, sanitary resident and patient environments.",
    aliases: ["environmental services", "housekeeping"], specialties: [] },
  { code: "DSW", name: "Developmental Services Worker", abbrev: "DSW", slug: "developmental-services-worker", cluster: "personal-care",
    blurb: "Developmental Services Workers support people with intellectual and developmental disabilities across residential, day program and community settings, under OADD voluntary standards.",
    aliases: [],
    specialties: [
      spec("Autism Spectrum Disorder", "Autism"),
      spec("Intellectual & Developmental Disabilities", "Developmental Disabilities"),
      spec("Dual Diagnosis", "Dual Diagnosis"),
      spec("Community Living", "Community Living"),
      spec("Behavioural Support", "Behavioural Support"),
    ] },

  // ---------------- Allied Health ----------------
  { code: "OT", name: "Occupational Therapist", abbrev: "OT", slug: "occupational-therapist", cluster: "allied-health", specialist: true,
    blurb: "Occupational Therapists help people regain independence in daily activities across hospital, rehab, paediatric and community practice, regulated by the College of Occupational Therapists of Ontario.",
    aliases: ["occupational therapy"],
    specialties: [
      spec("Physical Rehab & Musculoskeletal", "Physical Rehab"),
      spec("Neurological Rehab", "Neuro Rehab"),
      spec("Mental Health", "Mental Health"),
      spec("Paediatrics & Developmental", "Paediatrics", ["pediatrics"]),
      spec("Geriatrics & Aging", "Geriatrics"),
      spec("Hand Therapy", "Hand Therapy"),
    ] },
  { code: "PT", name: "Physiotherapist", abbrev: "PT", slug: "physiotherapist", cluster: "allied-health", specialist: true,
    blurb: "Physiotherapists treat movement and function across orthopaedic, neurological, sports and post-surgical practice, regulated by the College of Physiotherapists of Ontario.",
    aliases: ["physio", "physical therapy", "physiotherapy"],
    specialties: [
      spec("Orthopaedic & Musculoskeletal", "Orthopaedic"),
      spec("Neurological", "Neurological"),
      spec("Sports", "Sports"),
      spec("Paediatric", "Paediatric", ["pediatric"]),
      spec("Geriatric", "Geriatric"),
      spec("Post-Surgical", "Post-Surgical"),
    ] },
  { code: "SLP", name: "Speech-Language Pathologist", abbrev: "SLP", slug: "speech-language-pathologist", cluster: "allied-health", specialist: true,
    blurb: "Speech-Language Pathologists assess and treat communication and swallowing disorders, regulated by the College of Audiologists and Speech-Language Pathologists of Ontario.",
    aliases: ["speech therapy", "speech therapist"],
    specialties: [
      spec("Paediatric Language & Speech", "Paediatric Speech", ["pediatric"]),
      spec("Autism Spectrum Disorder", "Autism"),
      spec("Swallowing & Dysphagia", "Dysphagia"),
      spec("Voice Disorders", "Voice Disorders"),
      spec("Aphasia", "Aphasia"),
      spec("Dementia Communication", "Dementia Communication"),
    ] },
  { code: "RT", name: "Respiratory Therapist", slug: "respiratory-therapist", cluster: "allied-health",
    blurb: "Respiratory Therapists manage airway, ventilator and pulmonary care across ICU, emergency and community respiratory practice, regulated by the College of Respiratory Therapists of Ontario.",
    aliases: [], specialties: [] },
  { code: "RD", name: "Registered Dietitian", abbrev: "RD", slug: "registered-dietitian", cluster: "allied-health",
    blurb: "Registered Dietitians deliver clinical nutrition care across hospital, long-term care and community practice, regulated by the College of Dietitians of Ontario.",
    aliases: ["dietitian", "nutrition"], specialties: [] },
  { code: "AUD", name: "Audiologist", slug: "audiologist", cluster: "allied-health",
    blurb: "Audiologists assess and manage hearing and balance disorders, regulated by the College of Audiologists and Speech-Language Pathologists of Ontario.",
    aliases: ["hearing"], specialties: [] },
  { code: "MW", name: "Midwife", slug: "midwife", cluster: "allied-health",
    blurb: "Midwives provide primary maternity care through pregnancy, birth and the postpartum period, regulated by the College of Midwives of Ontario.",
    aliases: [], specialties: [] },
  { code: "RT2", name: "Recreation Therapist", slug: "recreation-therapist", cluster: "allied-health",
    blurb: "Recreation Therapists design therapeutic recreation programming across long-term care, rehab and mental health settings; unregulated in Ontario.",
    aliases: ["recreation", "activation"],
    specialties: [
      spec("LTC & Seniors Care", "Seniors Care"),
      spec("Mental Health & Psychiatric", "Mental Health"),
      spec("Acquired Brain Injury", "Brain Injury"),
      spec("Stroke Rehabilitation", "Stroke Rehab"),
      spec("Palliative Care", "Palliative Care"),
    ] },
  { code: "RA", name: "Recreation Aide", slug: "recreation-aide", cluster: "allied-health",
    blurb: "Recreation Aides support recreation programming under a Recreation Therapist or activity coordinator, helping run day-to-day activities in long-term care and retirement settings.",
    aliases: ["recreation", "activities", "activation"],
    settings: ["long-term care", "retirement communities"],
    specialties: [] },

  // ---------------- Medical Office & Administration ----------------
  { code: "MOA", name: "Medical Office Assistant", abbrev: "MOA", slug: "medical-office-assistant", cluster: "medical-admin",
    blurb: "Medical Office Assistants run the administrative core of clinics and hospital departments — scheduling, billing and patient records.",
    aliases: ["medical receptionist", "medical administration"],
    specialties: [
      spec("Family Medicine", "Family Medicine"),
      spec("Specialist Office", "Specialist Office"),
      spec("Walk-In Clinic", "Walk-In Clinic"),
      spec("Hospital Admissions", "Hospital Admissions"),
    ] },
  { code: "MAA", name: "Medical Administrative Assistant", abbrev: "MAA", slug: "medical-administrative-assistant", cluster: "medical-admin",
    blurb: "Medical Administrative Assistants support healthcare offices and clinical services through scheduling, records, correspondence, referrals and other medical administrative workflows.",
    aliases: ["medical secretary", "administrative assistant — medical", "medical administration"], specialties: [] },
  { code: "SCHED", name: "Scheduling Coordinator", slug: "scheduling-coordinator", cluster: "medical-admin",
    blurb: "Scheduling Coordinators manage staffing desks and shift coverage for healthcare employers, a front-line admin role with real day-to-day agency depth.",
    aliases: [], specialties: [] },
  { code: "UC", name: "Unit Clerk", slug: "unit-clerk", cluster: "medical-admin",
    blurb: "Unit Clerks coordinate ward-level administration, charting support and communication between clinical teams and patients.",
    aliases: ["HUC", "health unit coordinator"], specialties: [] },
  { code: "PRC", name: "Patient Registration Clerk", slug: "patient-registration-clerk", cluster: "medical-admin",
    blurb: "Patient Registration Clerks manage intake, registration and records at hospital and clinic front desks.", aliases: [], specialties: [] },
  { code: "IHW", name: "Indigenous Health Worker", slug: "indigenous-health-worker", cluster: "medical-admin",
    blurb: "Indigenous Health Workers provide culturally safe health navigation and support for First Nations, Métis and Inuit communities.", aliases: [], specialties: [] },
  { code: "CM", name: "Case Manager / Care Coordinator", slug: "case-manager-care-coordinator", cluster: "medical-admin",
    blurb: "Case Managers and Care Coordinators plan and coordinate care across providers for patients with complex or ongoing needs.",
    aliases: ["care coordinator"], specialties: [] },

  // ---------------- Diagnostics & Lab ----------------
  { code: "MLT", name: "Medical Laboratory Technologist", abbrev: "MLT", slug: "medical-laboratory-technologist", cluster: "diagnostics-lab",
    blurb: "Medical Laboratory Technologists perform diagnostic testing across chemistry, hematology, microbiology and transfusion science, regulated by the College of Medical Laboratory Technologists of Ontario.",
    aliases: ["lab technologist"], specialties: [] },
  { code: "PHL", name: "Phlebotomist", slug: "phlebotomist", cluster: "diagnostics-lab",
    blurb: "Phlebotomists perform specimen collection across hospital, community lab and mobile collection settings.", aliases: [], specialties: [] },
  { code: "LAB", name: "Lab Technician / Assistant", slug: "lab-technician-assistant", cluster: "diagnostics-lab",
    blurb: "Lab Technicians and Assistants support specimen processing and point-of-care testing under CMLTO's voluntary roster.", aliases: ["lab tech"], specialties: [] },
  { code: "MRTR", name: "Medical Radiation Technologist — Radiography", abbrev: "MRT(R)", slug: "medical-radiation-technologist-radiography", cluster: "medical-imaging",
    blurb: "Medical Radiation Technologists (Radiography) perform diagnostic X-ray and fluoroscopic imaging, regulated by the College of Medical Radiation and Imaging Technologists of Ontario.",
    aliases: ["MRT(R)", "radiological technologist", "x-ray technologist", "x-ray tech", "MRT", "medical radiation technologist", "medical imaging"], specialties: [] },
  { code: "MRTT", name: "Medical Radiation Technologist — Radiation Therapy", abbrev: "MRT(T)", slug: "medical-radiation-technologist-radiation-therapy", cluster: "medical-imaging",
    blurb: "Medical Radiation Technologists (Radiation Therapy) deliver radiation treatment for cancer care, regulated by the College of Medical Radiation and Imaging Technologists of Ontario.",
    aliases: ["MRT(T)", "radiation therapist", "MRT", "medical radiation technologist", "medical imaging"], specialties: [] },
  { code: "MRTN", name: "Medical Radiation Technologist — Nuclear Medicine", abbrev: "MRT(N)", slug: "medical-radiation-technologist-nuclear-medicine", cluster: "medical-imaging",
    blurb: "Medical Radiation Technologists (Nuclear Medicine) perform diagnostic imaging using radioactive tracers, regulated by the College of Medical Radiation and Imaging Technologists of Ontario.",
    aliases: ["MRT(N)", "nuclear medicine technologist", "MRT", "medical radiation technologist", "medical imaging"], specialties: [] },
  { code: "MRTMR", name: "Medical Radiation Technologist — Magnetic Resonance", abbrev: "MRT(MR)", slug: "medical-radiation-technologist-magnetic-resonance", cluster: "medical-imaging",
    blurb: "Medical Radiation Technologists (Magnetic Resonance) perform MRI imaging, regulated by the College of Medical Radiation and Imaging Technologists of Ontario.",
    aliases: ["MRT(MR)", "MRI technologist", "MRI tech", "MRT", "medical radiation technologist", "medical imaging"], specialties: [] },
  { code: "DMS", name: "Diagnostic Medical Sonographer", abbrev: "DMS", slug: "diagnostic-medical-sonographer", cluster: "medical-imaging",
    blurb: "Diagnostic Medical Sonographers perform ultrasound imaging across general, obstetric, cardiac and vascular examinations.",
    aliases: ["sonographer", "ultrasound technologist", "ultrasound tech", "medical imaging"], specialties: [] },

  // ---------------- Pharmacy ----------------
  { code: "PHARM", name: "Pharmacist", slug: "pharmacist", cluster: "pharmacy",
    blurb: "Pharmacists manage medication therapy across community, hospital and clinical pharmacy practice, regulated by the Ontario College of Pharmacists.",
    aliases: ["pharmacy"], specialties: [] },
  { code: "PHARMT", name: "Pharmacy Technician", slug: "pharmacy-technician", cluster: "pharmacy",
    blurb: "Pharmacy Technicians manage dispensing, compounding and drug distribution, regulated by the Ontario College of Pharmacists.",
    aliases: ["pharmacy", "pharmacy tech"], specialties: [] },
  { code: "PHARMA", name: "Pharmacy Assistant", slug: "pharmacy-assistant", cluster: "pharmacy",
    blurb: "Pharmacy Assistants support dispensing workflow and customer service in community and hospital pharmacy.",
    aliases: ["pharmacy"], specialties: [] },

  // ---------------- Mental Health & Social Services ----------------
  { code: "RSW", name: "Registered Social Worker", abbrev: "RSW", slug: "registered-social-worker", cluster: "mental-health",
    blurb: "Registered Social Workers provide clinical social work and psychotherapy across hospital, mental health and community practice, regulated by the OCSWSSW.",
    aliases: ["social worker"],
    specialties: [
      spec("Clinical Social Work & Psychotherapy", "Clinical Social Work"),
      spec("Mental Health & Addictions", "Mental Health & Addictions"),
      spec("Hospital & Healthcare Social Work", "Hospital Social Work"),
      spec("Trauma & PTSD", "Trauma & PTSD"),
      spec("Geriatric & Seniors Care", "Seniors Care"),
      spec("Palliative Care", "Palliative Care"),
    ] },
  { code: "RSSW", name: "Registered Social Service Worker", abbrev: "RSSW", slug: "registered-social-service-worker", cluster: "mental-health",
    blurb: "Registered Social Service Workers deliver frontline social service support across community, healthcare and social service settings, regulated by the OCSWSSW.",
    aliases: ["social service worker"],
    specialties: [
      spec("Mental Health & Addictions", "Mental Health & Addictions"),
      spec("Hospital & Healthcare Social Work", "Hospital Social Work"),
      spec("Community Development", "Community Development"),
      spec("Geriatric & Seniors Care", "Seniors Care"),
    ] },
  { code: "RP", name: "Registered Psychotherapist", slug: "registered-psychotherapist", cluster: "mental-health",
    blurb: "Registered Psychotherapists provide individual, couples and group therapy across private practice, clinics and community mental health, regulated by the CRPO.",
    aliases: ["psychotherapist", "therapist"],
    specialties: [
      spec("Individual Therapy", "Individual Therapy"),
      spec("Couples & Family", "Couples & Family"),
      spec("Trauma & PTSD", "Trauma & PTSD"),
      spec("Anxiety & Depression", "Anxiety & Depression"),
      spec("Child & Adolescent", "Child & Adolescent"),
      spec("Addictions / Concurrent Disorders", "Addictions"),
    ] },
  { code: "MHW", name: "Mental Health Worker", slug: "mental-health-worker", cluster: "mental-health",
    blurb: "Mental Health Workers deliver crisis, community and psychosocial rehabilitation support across inpatient and community mental health programs.",
    aliases: [],
    specialties: [
      spec("Crisis Intervention", "Crisis Intervention"),
      spec("Community Mental Health", "Community Mental Health"),
      spec("Concurrent Disorders", "Concurrent Disorders"),
      spec("Youth Mental Health", "Youth Mental Health"),
      spec("Peer Support", "Peer Support"),
    ] },
  { code: "BT", name: "Behaviour Therapist / ABA Therapist", slug: "behaviour-therapist-aba", cluster: "mental-health",
    blurb: "Behaviour Therapists deliver ABA-based programming across school, home and children's treatment centre settings; unregulated, front-line autism services role.",
    aliases: ["ABA therapist", "instructor therapist", "autism therapist", "behaviour technician"],
    specialties: [
      spec("ABA Therapy — Autism", "ABA — Autism"),
      spec("Early Intensive Behavioural Intervention", "EIBI"),
      spec("School-Based", "School-Based"),
      spec("Home-Based", "Home-Based"),
    ] },
  { code: "CYCP", name: "Child and Youth Care Practitioner", abbrev: "CYCP", slug: "child-and-youth-care-practitioner", cluster: "mental-health",
    blurb: "Child and Youth Care Practitioners support children, youth and families across residential, school, community and mental health settings.",
    aliases: ["Child and Youth Worker", "CYW", "CYC", "Child and Youth Practitioner", "CYP"], specialties: [] },
  { code: "PSYCH", name: "Psychologist", slug: "psychologist", cluster: "mental-health", specialist: true,
    blurb: "Psychologists provide doctoral-level clinical, assessment and rehabilitation psychology, regulated by the College of Psychologists and Behaviour Analysts of Ontario.",
    aliases: [], specialties: [] },
  { code: "PSYA", name: "Psychological Associate", slug: "psychological-associate", cluster: "mental-health", specialist: true,
    blurb: "Psychological Associates provide master's-level clinical and assessment psychology under the same CPBAO college as Psychologists, with a deeper Ontario supply pool.",
    aliases: [], specialties: [] },
  { code: "RBA", name: "Registered Behaviour Analyst", slug: "registered-behaviour-analyst", cluster: "mental-health", specialist: true,
    blurb: "Registered Behaviour Analysts supervise ABA programming and clinical behaviour plans, regulated by the CPBAO since July 2024.",
    aliases: ["BCBA"], specialties: [] },
  { code: "PSYT", name: "Psychiatrist", slug: "psychiatrist", cluster: "mental-health",
    blurb: "Psychiatrists provide physician-level mental health diagnosis and treatment, regulated by the CPSO.",
    aliases: [], settings: ["hospitals", "outpatient clinics"], specialties: [] },

  // ---------------- Rehabilitation & Dental ----------------
  { code: "KIN", name: "Kinesiologist", slug: "kinesiologist", cluster: "rehab-dental",
    blurb: "Kinesiologists deliver injury rehab, exercise prescription and functional capacity evaluation, regulated by the College of Kinesiologists of Ontario.",
    aliases: [], specialties: [] },
  { code: "DC", name: "Chiropractor", slug: "chiropractor", cluster: "rehab-dental",
    blurb: "Chiropractors treat musculoskeletal and spinal conditions, regulated by the College of Chiropractors of Ontario.", aliases: [], specialties: [] },
  { code: "RMT", name: "Registered Massage Therapist", abbrev: "RMT", slug: "registered-massage-therapist", cluster: "rehab-dental",
    blurb: "Registered Massage Therapists provide therapeutic massage across clinic, sports, prenatal and oncology support practice, regulated by the College of Massage Therapists of Ontario.",
    aliases: ["massage therapist"],
    specialties: [
      spec("Relaxation & Swedish", "Relaxation & Swedish"),
      spec("Deep Tissue & Myofascial Release", "Deep Tissue"),
      spec("Sports", "Sports"),
      spec("Orthopaedic", "Orthopaedic"),
      spec("Prenatal & Perinatal", "Prenatal"),
      spec("Palliative & Oncology Massage", "Oncology Massage"),
    ] },
  { code: "OTA", name: "Occupational Therapist Assistant", slug: "occupational-therapist-assistant", cluster: "rehab-dental",
    blurb: "Occupational Therapist Assistants support physical and functional rehab under OT direction; unregulated, standalone from PTA.",
    aliases: ["OT assistant"], specialties: [] },
  { code: "PTA", name: "Physiotherapy Assistant", slug: "physiotherapy-assistant", cluster: "rehab-dental",
    blurb: "Physiotherapy Assistants support physical rehab programs under PT direction; unregulated, standalone from OTA.",
    aliases: ["physio assistant", "PTA", "physiotherapist assistant"], specialties: [] },
  { code: "DH", name: "Dental Hygienist", slug: "dental-hygienist", cluster: "rehab-dental",
    blurb: "Dental Hygienists provide preventive oral care, regulated by the College of Dental Hygienists of Ontario.",
    aliases: [], settings: ["dental clinics"], specialties: [] },
  { code: "DA2", name: "Dental Assistant", slug: "dental-assistant", cluster: "rehab-dental",
    blurb: "Dental Assistants support chairside care across general, orthodontic and oral surgery practice; not a regulated health profession in Ontario.",
    aliases: [], settings: ["dental clinics"], specialties: [] },

  // ---------------- Emergency & Specialized Medical ----------------
  { code: "PARA", name: "Paramedic", slug: "paramedic", cluster: "emergency-medical",
    blurb: "Paramedics deliver pre-hospital emergency care across land, air and community paramedicine, regulated at PCP, ACP and CCP levels.",
    aliases: [], settings: ["land and air ambulance services", "community paramedicine programs"],
    specialties: [
      spec("Land Ambulance — Urban", "Urban Ambulance"),
      spec("Land Ambulance — Rural & Remote", "Rural & Remote"),
      spec("Community Paramedicine", "Community Paramedicine"),
      spec("Hospital Emergency", "Hospital Emergency"),
    ] },
  { code: "PA", name: "Physician Assistant", abbrev: "PA", slug: "physician-assistant", cluster: "emergency-medical",
    blurb: "Physician Assistants practise under CPSO physician supervision across emergency, surgical and internal medicine settings.", aliases: [], specialties: [] },
  { code: "ME", name: "Medical Esthetician", slug: "medical-esthetician", cluster: "emergency-medical",
    blurb: "Medical Estheticians provide laser and clinical skincare treatments alongside medical and cosmetic practices, within their non-controlled-acts scope.",
    aliases: [], settings: ["medical aesthetics clinics", "cosmetic practices"],
    specialties: [
      spec("Laser Hair Removal", "Laser Hair Removal"),
      spec("Laser Skin Rejuvenation", "Skin Rejuvenation"),
      spec("Chemical Peels", "Chemical Peels"),
    ] },
  { code: "MDRD", name: "Medical Devices Reprocessing Technician", slug: "medical-devices-reprocessing-technician", cluster: "emergency-medical",
    blurb: "Medical Devices Reprocessing Technicians manage sterile processing and instrument reprocessing for surgical and clinical settings.",
    aliases: ["sterile processing", "MDRD"], specialties: [] },

  // ---------------- Food & Nutrition Services ----------------
  { code: "DA", name: "Dietary Aide", slug: "dietary-aide", cluster: "food-nutrition",
    blurb: "Dietary Aides support food service delivery across long-term care, hospital and retirement home kitchens, including texture-modified and allergen-controlled diets.",
    aliases: [], specialties: [] },
  { code: "COOK", name: "Cook", slug: "cook", cluster: "food-nutrition",
    blurb: "Cooks run therapeutic and production food service across long-term care, hospital and retirement home kitchens.", aliases: [], specialties: [] },
  { code: "NUT", name: "Nutritionist", slug: "nutritionist", cluster: "food-nutrition",
    blurb: "Nutritionists provide food and nutrition guidance distinct from clinical dietetics, supporting healthcare and community food service settings.",
    aliases: ["nutrition"], specialties: [] },
];

PROFESSIONS.forEach(p => {
  if (!p.settings) p.settings = CLUSTER_DEFAULT_SETTINGS[p.cluster] || [];
  if (!p.aliases) p.aliases = [];
  p.launch = LAUNCH_STATUS[p.code] || "future";
});

// Curated default selection shown before "View all professions".
// "__PRESENTATION_GROUPS__" is where the Medical Imaging / Laboratory
// group rows are inserted by the directory renderer.
export const FEATURED_PROFESSION_SLUGS: string[] = [
  "registered-nurse", "registered-practical-nurse", "personal-support-worker",
  "occupational-therapist", "physiotherapist", "registered-social-worker",
  "medical-office-assistant", "pharmacy-technician", "__PRESENTATION_GROUPS__",
  "recreation-therapist", "registered-massage-therapist", "child-and-youth-care-practitioner",
  "dietary-aide", "registered-psychotherapist",
];

// Presentation-only groups (NOT professions: no code, no page, no Join value).
export const PRESENTATION_GROUPS: { key: string; label: string; childSlugs: string[] }[] = [
  { key: "medical-imaging-group", label: "Medical Imaging", childSlugs: [
      "medical-radiation-technologist-radiography",
      "medical-radiation-technologist-radiation-therapy",
      "medical-radiation-technologist-nuclear-medicine",
      "medical-radiation-technologist-magnetic-resonance",
      "diagnostic-medical-sonographer",
    ] },
  { key: "laboratory-group", label: "Laboratory", childSlugs: [
      "medical-laboratory-technologist",
      "phlebotomist",
      "lab-technician-assistant",
    ] },
];

// ---------- GEOGRAPHY ----------
export const REGIONS: { name: string; cities: string[] }[] = [
  { name: "Greater Toronto Area", cities: [
    "Toronto", "Mississauga", "Brampton", "Markham", "Vaughan", "Richmond Hill",
    "Newmarket", "Pickering", "Ajax", "Whitby", "Oshawa",
  ]},
  { name: "Hamilton & Halton", cities: ["Hamilton", "Burlington", "Oakville", "Milton", "Halton Hills"]},
  { name: "Niagara", cities: ["St. Catharines", "Niagara Falls", "Welland", "Niagara-on-the-Lake", "Fort Erie", "Grimsby"]},
  { name: "Waterloo & Wellington", cities: ["Kitchener", "Waterloo", "Cambridge", "Guelph"]},
  { name: "Central Ontario", cities: ["Barrie", "Orillia", "Collingwood"]},
  { name: "Eastern Ontario", cities: ["Ottawa", "Kingston", "Belleville", "Peterborough", "Cornwall", "Brockville"]},
  { name: "Southwestern Ontario", cities: ["London", "Windsor", "Sarnia", "Woodstock", "St. Thomas"]},
  { name: "Northern Ontario", cities: ["Sudbury", "Thunder Bay", "North Bay", "Sault Ste. Marie", "Timmins"]},
];
export const CITIES: City[] = [];
REGIONS.forEach(r => {
  r.cities.forEach(name => CITIES.push({ name, slug: slugify(name), region: r.name }));
});

export const FEATURED_CITY_SLUGS: string[] = [
  "toronto", "mississauga", "brampton", "hamilton", "ottawa", "london",
  "burlington", "oakville", "kitchener", "waterloo", "windsor",
  "st-catharines", "barrie", "oshawa",
];

// ---------- LOOKUPS ----------
export function getCluster(slug: string): Cluster | null { return CLUSTERS.find(c => c.slug === slug) || null; }
export function getProfession(slug: string): Profession | null { return PROFESSIONS.find(p => p.slug === slug) || null; }
export function getCity(slug: string): City | null { return CITIES.find(c => c.slug === slug) || null; }
export function professionsInCluster(clusterSlug: string): Profession[] { return PROFESSIONS.filter(p => p.cluster === clusterSlug); }
export function citiesInRegion(regionName: string): City[] { return CITIES.filter(c => c.region === regionName); }
export function findSpecialty(profession: Profession, specialtySlug: string): Specialty | null {
  return profession.specialties?.find(s => s.slug === specialtySlug) || null;
}
export function professionLabel(p: Profession): string { return p.abbrev || p.name; }

// ============================================================
// PAGE APPROVAL
// Layer 2: profession + ONE specialty (Ontario-wide), hand-curated.
// ============================================================
export const INDEXABLE_SPECIALTY_PAGES: [string, string][] = [
  ["registered-nurse", "pacu"],
  ["registered-nurse", "icu-and-critical-care"],
  ["registered-nurse", "emergency"],
  ["registered-nurse", "nicu"],
  ["registered-nurse", "perioperative-and-or"],
  ["registered-nurse", "labour-and-delivery"],
  ["registered-nurse", "cardiac-care"],
];
export function isSpecialtyPageIndexable(profSlug: string, specSlug: string): boolean {
  return INDEXABLE_SPECIALTY_PAGES.some(([p, s]) => p === profSlug && s === specSlug);
}

// ============================================================
// OPPORTUNITIES — curated library. Each record also seeds a permanent
// profession+city page (and specialty+city page where the specialty is
// in INDEXABLE_SPECIALTY_PAGES). "demo" = acquisition-market pattern,
// never a real vacancy; "live" = genuine employer-posted opening.
// ============================================================
export interface Opportunity {
  id: string; profession: string; city: string; specialty: string | null;
  status: "live" | "demo"; title: string;
  setting?: string; shift?: string; employmentType?: string; startDate?: string;
}
export const OPPORTUNITIES: Opportunity[] = [
  { id: "op-live-1", profession: "registered-nurse", city: "toronto", specialty: "icu-and-critical-care", status: "live",
    title: "Registered Nurse — ICU / Critical Care", shift: "Rotating", employmentType: "Full-Time", startDate: "To be confirmed" },

  { id: "op-1", profession: "registered-nurse", city: "oakville", specialty: "pacu", status: "demo",
    title: "Registered Nurse — PACU / Recovery Room", setting: "outpatient surgical clinic" },
  { id: "op-2", profession: "registered-nurse", city: "mississauga", specialty: "perioperative-and-or", status: "demo",
    title: "Registered Nurse — Perioperative / OR", setting: "day-procedure surgical centre" },
  { id: "op-3", profession: "registered-nurse", city: "hamilton", specialty: "emergency", status: "demo",
    title: "Registered Nurse — Emergency", setting: "hospital emergency department" },
  { id: "op-4", profession: "registered-nurse", city: "ottawa", specialty: "nicu", status: "demo",
    title: "Registered Nurse — NICU", setting: "hospital neonatal intensive care unit" },
  { id: "op-5", profession: "registered-nurse", city: "london", specialty: "labour-and-delivery", status: "demo",
    title: "Registered Nurse — Labour & Delivery", setting: "hospital maternity unit" },
  { id: "op-6", profession: "registered-nurse", city: "burlington", specialty: "cardiac-care", status: "demo",
    title: "Registered Nurse — Cardiac Care", setting: "cardiac step-down unit" },
  { id: "op-7", profession: "registered-nurse", city: "sudbury", specialty: "icu-and-critical-care", status: "demo",
    title: "Registered Nurse — ICU / Critical Care", setting: "regional hospital" },
  { id: "op-8", profession: "registered-nurse", city: "brampton", specialty: "long-term-care", status: "demo",
    title: "Registered Nurse — Long-Term Care", setting: "long-term care home" },
  { id: "op-9", profession: "registered-nurse", city: "kingston", specialty: "mental-health", status: "demo",
    title: "Registered Nurse — Mental Health", setting: "inpatient psychiatric unit" },
  { id: "op-10", profession: "registered-nurse", city: "sarnia", specialty: "palliative-care", status: "demo",
    title: "Registered Nurse — Palliative Care", setting: "hospice / palliative care unit" },
  { id: "op-11", profession: "registered-nurse", city: "guelph", specialty: null, status: "demo",
    title: "Registered Nurse — Outpatient Clinic", setting: "community outpatient clinic" },
  { id: "op-12", profession: "registered-nurse", city: "waterloo", specialty: null, status: "demo",
    title: "Registered Nurse — Specialty Clinic (Men's Health)", setting: "specialty outpatient clinic" },
  { id: "op-13", profession: "registered-nurse", city: "woodstock", specialty: null, status: "demo",
    title: "Registered Nurse — Community Health", setting: "community health centre" },
  { id: "op-14", profession: "registered-nurse", city: "markham", specialty: null, status: "demo",
    title: "Registered Nurse — Procedural & Interventional Care", setting: "interventional/fluoroscopy suite" },

  { id: "op-15", profession: "registered-practical-nurse", city: "st-catharines", specialty: "long-term-care", status: "demo",
    title: "RPN — Long-Term Care", setting: "long-term care home" },
  { id: "op-16", profession: "registered-practical-nurse", city: "kitchener", specialty: "medical-surgical", status: "demo",
    title: "RPN — Medical-Surgical", setting: "hospital medical-surgical unit" },
  { id: "op-17", profession: "registered-practical-nurse", city: "oshawa", specialty: null, status: "demo",
    title: "RPN — Retirement Home", setting: "retirement home" },

  { id: "op-18", profession: "personal-support-worker", city: "vaughan", specialty: null, status: "demo",
    title: "PSW — Long-Term Care", setting: "long-term care home" },
  { id: "op-19", profession: "personal-support-worker", city: "whitby", specialty: null, status: "demo",
    title: "PSW — Retirement Home", setting: "retirement home" },
  { id: "op-20", profession: "personal-support-worker", city: "niagara-falls", specialty: null, status: "demo",
    title: "PSW — Community Support", setting: "community home care" },

  { id: "op-23", profession: "physiotherapist", city: "cambridge", specialty: null, status: "demo",
    title: "Physiotherapist — Outpatient Rehab Clinic", setting: "outpatient rehab clinic" },
  { id: "op-24", profession: "occupational-therapist", city: "milton", specialty: null, status: "demo",
    title: "Occupational Therapist — Community & Home Health", setting: "community health agency" },
  { id: "op-25", profession: "psychologist", city: "richmond-hill", specialty: null, status: "demo",
    title: "Psychologist — Child & Adolescent Mental Health", setting: "outpatient mental health clinic" },
  { id: "op-26", profession: "psychologist", city: "brockville", specialty: null, status: "demo",
    title: "Psychologist — Rehabilitation & Trauma", setting: "rehabilitation clinic" },
  { id: "op-27", profession: "medical-office-assistant", city: "barrie", specialty: null, status: "demo",
    title: "Medical Office Assistant — Family Medicine Clinic", setting: "family medicine clinic" },
  { id: "op-28", profession: "child-and-youth-care-practitioner", city: "belleville", specialty: null, status: "demo",
    title: "Child and Youth Care Practitioner — Residential Program", setting: "residential youth program" },
  { id: "op-29", profession: "dietary-aide", city: "collingwood", specialty: null, status: "demo",
    title: "Dietary Aide — Retirement Home Kitchen", setting: "retirement home kitchen" },
  { id: "op-30", profession: "cook", city: "milton", specialty: null, status: "demo",
    title: "Cook — Long-Term Care Food Service", setting: "long-term care kitchen" },

  { id: "op-31", profession: "nurse-practitioner", city: "toronto", specialty: null, status: "demo", title: "Nurse Practitioner" },
  { id: "op-32", profession: "nurse-practitioner", city: "mississauga", specialty: null, status: "demo", title: "Nurse Practitioner" },
  { id: "op-33", profession: "nurse-practitioner", city: "oshawa", specialty: null, status: "demo", title: "Nurse Practitioner" },

  { id: "op-34", profession: "registered-social-service-worker", city: "toronto", specialty: null, status: "demo", title: "Registered Social Service Worker" },
  { id: "op-35", profession: "registered-social-service-worker", city: "mississauga", specialty: null, status: "demo", title: "Registered Social Service Worker" },

  { id: "op-36", profession: "registered-social-worker", city: "hamilton", specialty: null, status: "demo", title: "Registered Social Worker" },
  { id: "op-37", profession: "registered-social-worker", city: "oshawa", specialty: null, status: "demo", title: "Registered Social Worker" },
  { id: "op-38", profession: "registered-social-worker", city: "waterloo", specialty: null, status: "demo", title: "Registered Social Worker" },

  { id: "op-39", profession: "dietary-aide", city: "toronto", specialty: null, status: "demo", title: "Dietary Aide" },
  { id: "op-40", profession: "dietary-aide", city: "mississauga", specialty: null, status: "demo", title: "Dietary Aide" },
  { id: "op-41", profession: "dietary-aide", city: "waterloo", specialty: null, status: "demo", title: "Dietary Aide" },

  { id: "op-42", profession: "unregulated-care-provider", city: "toronto", specialty: null, status: "demo", title: "Unregulated Care Provider" },
  { id: "op-43", profession: "unregulated-care-provider", city: "mississauga", specialty: null, status: "demo", title: "Unregulated Care Provider" },

  { id: "op-44", profession: "housekeeper", city: "mississauga", specialty: null, status: "demo", title: "Housekeeper" },
  { id: "op-45", profession: "housekeeper", city: "brampton", specialty: null, status: "demo", title: "Housekeeper" },
  { id: "op-46", profession: "housekeeper", city: "toronto", specialty: null, status: "demo", title: "Housekeeper" },

  { id: "op-47", profession: "medical-office-assistant", city: "st-catharines", specialty: null, status: "demo", title: "Medical Office Assistant" },
  { id: "op-48", profession: "medical-office-assistant", city: "waterloo", specialty: null, status: "demo", title: "Medical Office Assistant" },
  { id: "op-49", profession: "medical-office-assistant", city: "london", specialty: null, status: "demo", title: "Medical Office Assistant" },

  { id: "op-50", profession: "scheduling-coordinator", city: "mississauga", specialty: null, status: "demo", title: "Scheduling Coordinator" },
  { id: "op-51", profession: "scheduling-coordinator", city: "hamilton", specialty: null, status: "demo", title: "Scheduling Coordinator" },
  { id: "op-52", profession: "scheduling-coordinator", city: "st-catharines", specialty: null, status: "demo", title: "Scheduling Coordinator" },
  { id: "op-53", profession: "scheduling-coordinator", city: "waterloo", specialty: null, status: "demo", title: "Scheduling Coordinator" },

  { id: "op-54", profession: "cook", city: "vaughan", specialty: null, status: "demo", title: "Cook" },
  { id: "op-55", profession: "cook", city: "mississauga", specialty: null, status: "demo", title: "Cook" },

  { id: "op-56", profession: "developmental-services-worker", city: "oshawa", specialty: null, status: "demo", title: "Developmental Services Worker" },
  { id: "op-57", profession: "developmental-services-worker", city: "st-catharines", specialty: null, status: "demo", title: "Developmental Services Worker" },

  { id: "op-58", profession: "medical-administrative-assistant", city: "london", specialty: null, status: "demo", title: "Medical Administrative Assistant" },
  { id: "op-59", profession: "medical-administrative-assistant", city: "waterloo", specialty: null, status: "demo", title: "Medical Administrative Assistant" },
  { id: "op-60", profession: "medical-administrative-assistant", city: "st-catharines", specialty: null, status: "demo", title: "Medical Administrative Assistant" },
  { id: "op-61", profession: "child-and-youth-care-practitioner", city: "toronto", specialty: null, status: "demo", title: "Child and Youth Care Practitioner" },
  { id: "op-62", profession: "child-and-youth-care-practitioner", city: "mississauga", specialty: null, status: "demo", title: "Child and Youth Care Practitioner" },
  { id: "op-63", profession: "registered-social-worker", city: "london", specialty: null, status: "demo", title: "Registered Social Worker" },
  { id: "op-64", profession: "registered-social-worker", city: "st-catharines", specialty: null, status: "demo", title: "Registered Social Worker" },
  { id: "op-65", profession: "scheduling-coordinator", city: "oshawa", specialty: null, status: "demo", title: "Scheduling Coordinator" },
  { id: "op-66", profession: "housekeeper", city: "london", specialty: null, status: "demo", title: "Housekeeper" },
  { id: "op-67", profession: "nurse-practitioner", city: "oakville", specialty: null, status: "demo", title: "Nurse Practitioner" },
  { id: "op-68", profession: "nurse-practitioner", city: "richmond-hill", specialty: null, status: "demo", title: "Nurse Practitioner" },

  { id: "op-69", profession: "medical-radiation-technologist-radiography", city: "toronto", specialty: null, status: "demo", title: "Medical Radiation Technologist — Radiography" },
  { id: "op-70", profession: "medical-radiation-technologist-magnetic-resonance", city: "toronto", specialty: null, status: "demo", title: "Medical Radiation Technologist — Magnetic Resonance" },
  { id: "op-71", profession: "diagnostic-medical-sonographer", city: "toronto", specialty: null, status: "demo", title: "Diagnostic Medical Sonographer" },
  { id: "op-72", profession: "medical-laboratory-technologist", city: "toronto", specialty: null, status: "demo", title: "Medical Laboratory Technologist" },
  { id: "op-73", profession: "diagnostic-medical-sonographer", city: "mississauga", specialty: null, status: "demo", title: "Diagnostic Medical Sonographer" },
  { id: "op-74", profession: "medical-laboratory-technologist", city: "hamilton", specialty: null, status: "demo", title: "Medical Laboratory Technologist" },
  { id: "op-75", profession: "medical-radiation-technologist-radiography", city: "london", specialty: null, status: "demo", title: "Medical Radiation Technologist — Radiography" },
];

// ============================================================
// EXPLICIT SEEDED PAGE REGISTRY — derived from OPPORTUNITIES.
// Layer 3: profession+city and profession+specialty+city pages.
// ============================================================
export const SEEDED_PROFESSION_CITY_PAGES: [string, string][] = [];
export const SEEDED_SPECIALTY_CITY_PAGES: [string, string, string][] = [];
(function deriveSeededPages() {
  const seenPC = new Set<string>(), seenPSC = new Set<string>();
  OPPORTUNITIES.forEach(o => {
    const pcKey = `${o.profession}|${o.city}`;
    if (!seenPC.has(pcKey)) { seenPC.add(pcKey); SEEDED_PROFESSION_CITY_PAGES.push([o.profession, o.city]); }
    if (o.specialty && isSpecialtyPageIndexable(o.profession, o.specialty)) {
      const pscKey = `${o.profession}|${o.specialty}|${o.city}`;
      if (!seenPSC.has(pscKey)) { seenPSC.add(pscKey); SEEDED_SPECIALTY_CITY_PAGES.push([o.profession, o.specialty, o.city]); }
    }
  });
})();

export function isProfessionCityIndexable(profession: Profession, city: City): boolean {
  return SEEDED_PROFESSION_CITY_PAGES.some(([p, c]) => p === profession.slug && c === city.slug);
}
export function isProfessionCitySpecialtyIndexable(profession: Profession, specialty: Specialty, city: City): boolean {
  return SEEDED_SPECIALTY_CITY_PAGES.some(([p, s, c]) => p === profession.slug && s === specialty.slug && c === city.slug);
}

// ============================================================
// SEARCH-LANGUAGE UMBRELLAS (e.g. "Women & Children's Health")
// ============================================================
export const SEARCH_UMBRELLAS = [
  {
    profession: "registered-nurse",
    label: "Women & Children's Health",
    aliases: ["WCHS", "women's and children's health", "women and children's health", "maternal child health", "mom and baby"],
    specialtySlugs: ["labour-and-delivery", "perinatal", "maternal-newborn", "nicu", "paediatrics"],
  },
];

// ============================================================
// CENTRAL DESTINATION BUILDER — the ONE function that turns a
// profession / specialties / city context into a route.
// ============================================================
export interface DestinationCtx {
  profession?: Profession | null;
  specialties?: (Specialty | null | undefined)[];
  city?: City | null;
}
export function buildDestination(ctx: DestinationCtx): string {
  const profession = ctx.profession || null;
  const city = ctx.city || null;
  const specialties = (ctx.specialties || []).filter(Boolean) as Specialty[];
  const specialty = specialties.length === 1 ? specialties[0] : null;

  if (!profession) {
    return city ? `/locations/${city.slug}` : "/findwork";
  }
  const base = `/roles/${profession.cluster}/${profession.slug}`;

  if (city && specialty && isProfessionCitySpecialtyIndexable(profession, specialty, city)) {
    return `${base}/specialty/${specialty.slug}/city/${city.slug}`;
  }
  if (!city && specialty && isSpecialtyPageIndexable(profession.slug, specialty.slug)) {
    return `${base}/specialty/${specialty.slug}`;
  }
  if (city && !specialties.length && isProfessionCityIndexable(profession, city)) {
    return `${base}/city/${city.slug}`;
  }
  // Fallback: preserve everything as query state on the base profession page.
  const params: string[] = [];
  if (specialties.length) params.push(`specialty=${specialties.map(s => s.slug).join(",")}`);
  if (city) params.push(`location=${city.slug}`);
  return `${base}${params.length ? "?" + params.join("&") : ""}`;
}

// ---------- CENTRALIZED JOIN DESTINATION ----------
export const JOIN_REGISTRY_BASE = "/join";
export function buildJoinDestination(ctx?: DestinationCtx): string {
  const c = ctx || {};
  const params: string[] = [];
  const specialties = (c.specialties || []).filter(Boolean) as Specialty[];
  if (c.profession) params.push(`profession=${c.profession.slug}`);
  if (specialties.length) params.push(`specialty=${specialties.map(s => s.slug).join(",")}`);
  if (c.city) params.push(`location=${c.city.slug}`);
  return `${JOIN_REGISTRY_BASE}${params.length ? "?" + params.join("&") : ""}`;
}

// ============================================================
// SEARCH INDEX — entries carry references, never a baked href.
// ============================================================
export interface SearchEntry {
  type: "profession" | "specialty" | "umbrella";
  professionSlug: string;
  specialtySlug?: string | null;
  specialtySlugs?: string[];
  label: string;
  kind: string;
  context: string;
  keywords: string[];
}

export function buildSearchIndex(): SearchEntry[] {
  const index: SearchEntry[] = [];
  PROFESSIONS.forEach(p => {
    const keywords = [p.name, p.abbrev || "", p.code, ...(p.aliases || [])].filter(Boolean).map((k: string) => k.toLowerCase());
    index.push({
      type: "profession", professionSlug: p.slug, specialtySlug: null,
      label: p.abbrev && p.abbrev !== p.name ? `${p.name} (${p.abbrev})` : p.name,
      kind: "Profession", context: CLUSTERS.find(c => c.slug === p.cluster)!.name,
      keywords,
    });
    p.specialties?.forEach((s: Specialty) => {
      const skeywords = [s.name, s.short, ...(s.aliases || [])].filter(Boolean).map(k => k.toLowerCase());
      index.push({
        type: "specialty", professionSlug: p.slug, specialtySlug: s.slug,
        label: s.name, kind: "Area of practice", context: p.name,
        keywords: skeywords,
      });
    });
  });
  SEARCH_UMBRELLAS.forEach(u => {
    const profession = getProfession(u.profession);
    if (!profession) return;
    index.push({
      type: "umbrella", professionSlug: u.profession, specialtySlugs: u.specialtySlugs,
      label: u.label, kind: "Search term", context: profession.name,
      keywords: [u.label.toLowerCase(), ...u.aliases.map(a => a.toLowerCase())],
    });
  });
  return index;
}
export const SEARCH_INDEX: SearchEntry[] = buildSearchIndex();

export function searchProfessions(query: string): SearchEntry[] {
  const q = (query || "").trim().toLowerCase();
  if (q.length < 2) return [];
  const boundary = new RegExp("\\b" + q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\b");
  const scored = SEARCH_INDEX.map(entry => {
    let score = -1;
    entry.keywords.forEach(k => {
      if (k === q) score = Math.max(score, 100);
      else if (k.startsWith(q)) score = Math.max(score, 80);
      else if (boundary.test(k)) score = Math.max(score, 60);
      else if (q.length >= 4 && k.includes(q)) score = Math.max(score, 30);
    });
    if (q.length >= 4 ? entry.label.toLowerCase().includes(q) : boundary.test(entry.label.toLowerCase())) score = Math.max(score, 40);
    return { entry, score };
  }).filter(r => r.score > -1);
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, 8).map(r => r.entry);
}

// Resolve a search-index entry to a route, carrying any existing context (e.g. current city).
export function hrefForSearchEntry(entry: SearchEntry, carryCtx?: { city?: City | null }): string {
  const ctx = carryCtx || {};
  const profession = getProfession(entry.professionSlug);
  if (entry.type === "profession") {
    return buildDestination({ profession, specialties: [], city: ctx.city || null });
  }
  if (entry.type === "specialty") {
    const specialty = profession ? findSpecialty(profession, entry.specialtySlug as string) : null;
    return buildDestination({ profession, specialties: [specialty], city: ctx.city || null });
  }
  const specialties = (entry.specialtySlugs || []).map(s => (profession ? findSpecialty(profession, s) : null)).filter(Boolean);
  return buildDestination({ profession, specialties, city: ctx.city || null });
}

// Location search results resolve through the same builder.
export function hrefForCity(
  city: City,
  carryCtx?: { profession?: Profession | null; specialties?: Specialty[] }
): string {
  const ctx = carryCtx || {};
  return buildDestination({ profession: ctx.profession || null, specialties: ctx.specialties || [], city });
}

// ============================================================
// MARKET GROUPING — consolidates repeated profession-city records into
// one row per profession (+ specialty when that specialty has its own
// approved SEO page). Display-only; never changes page approval.
// ============================================================
export interface MarketGroup { profession: Profession; specialty: Specialty | null; cities: City[]; }

export function consolidatedMarketGroups(opps: Opportunity[]): MarketGroup[] {
  const map = new Map<string, MarketGroup>();
  const order: string[] = [];
  opps.forEach(o => {
    const profession = getProfession(o.profession);
    const city = getCity(o.city);
    if (!profession || !city) return;
    const specialty = (o.specialty && isSpecialtyPageIndexable(o.profession, o.specialty))
      ? findSpecialty(profession, o.specialty) : null;
    const key = `${o.profession}|${specialty ? specialty.slug : ""}`;
    if (!map.has(key)) { map.set(key, { profession, specialty, cities: [] }); order.push(key); }
    const group = map.get(key)!;
    if (!group.cities.some(c => c.slug === city.slug)) group.cities.push(city);
  });
  return order.map(k => map.get(k)!);
}

export function groupDisplayLabel(group: MarketGroup): string {
  return group.specialty ? `${group.specialty.short} ${professionLabel(group.profession)}` : group.profession.name;
}

export function alphabetizedMarketGroups(opps: Opportunity[]): MarketGroup[] {
  return consolidatedMarketGroups(opps)
    .map(g => ({ profession: g.profession, specialty: g.specialty, cities: g.cities.slice().sort((a, b) => a.name.localeCompare(b.name)) }))
    .sort((a, b) => groupDisplayLabel(a).localeCompare(groupDisplayLabel(b)));
}