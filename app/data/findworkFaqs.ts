/* ============================================================
   VETTED FIND WORK — FAQ DATA + LOOKUPS
   The FAQ content below is copied verbatim from the original Find Work
   module (founder-authored, literal sets — no runtime generation).
   Every lookup is a straight object lookup; a missing set returns null
   and the page simply omits the FAQ block.
   ============================================================ */
import type { Profession, Specialty, City } from "./findwork";
import type { RouteKind } from "./findworkPages";

export interface FaqItem { q: string; a: string }

// ---------- PROFESSION FAQ POOLS ----------
export const PROFESSION_FAQ_POOLS: Record<string, FaqItem[]> = {
  "registered-nurse": [
    { q: "What types of Registered Nurse opportunities can I explore in Ontario?", a: "RN opportunities span hospitals, long-term care, community health and specialty clinics — from acute and critical care to primary and community-based practice." },
    { q: "Can I indicate more than one area of nursing practice?", a: "Yes — select every area of practice that reflects your experience, from ICU or PACU to palliative or community health." },
    { q: "Can I look for casual, part-time or full-time RN work?", a: "Yes — you can indicate the employment arrangement and availability you are open to." },
    { q: "How will employers find me as an RN?", a: "Employers search confirmed candidate profiles by profession, area of practice and location." },
  ],
  "registered-practical-nurse": [
    { q: "What types of RPN opportunities can I explore in Ontario?", a: "RPN opportunities are common across long-term care, retirement homes, hospitals and community settings." },
    { q: "What settings commonly employ Registered Practical Nurses?", a: "Long-term care and retirement homes are the largest settings, alongside hospital medical-surgical units and community care." },
    { q: "Can I indicate multiple areas of RPN practice?", a: "Yes — select every area that reflects your experience, such as long-term care, medical-surgical or palliative care." },
    { q: "Can I look for casual, part-time or full-time RPN opportunities?", a: "Yes — your availability is part of your profile, so employers see what you're actually looking for." },
  ],
  "personal-support-worker": [
    { q: "What types of PSW opportunities can I explore in Ontario?", a: "PSW roles are common in long-term care, retirement homes, home care and community support." },
    { q: "What settings commonly employ PSWs?", a: "Long-term care and retirement homes are the most common, alongside home care and community support agencies." },
    { q: "Can I indicate areas of PSW experience, like dementia or palliative care?", a: "Yes — select every area that reflects your experience when you join." },
    { q: "Can I look for casual, part-time or full-time PSW work?", a: "Yes — you can indicate the employment arrangement and availability you are open to." },
  ],
  "unregulated-care-provider": [
    { q: "Who is a good fit for the Unregulated Care Provider category?", a: "Internationally-educated nurses awaiting Ontario registration, and nursing or PSW students building Ontario care experience." },
    { q: "What kind of work can I find as a UCP?", a: "Direct care support roles across long-term care, retirement homes and community settings." },
    { q: "Do I need to already be registered to join as a UCP?", a: "No — this category exists specifically for candidates who aren't yet registered or are still completing their program." },
    { q: "What experience should I highlight for UCP opportunities?", a: "Highlight hands-on care experience, clinical placements, nursing education or PSW training, and the care settings and patient populations you have supported." },
  ],
  "developmental-services-worker": [
    { q: "What types of DSW opportunities can I explore in Ontario?", a: "DSW roles support people with intellectual and developmental disabilities across residential, day program and community settings." },
    { q: "Can I indicate my areas of DSW experience?", a: "Yes — select areas such as autism support, dual diagnosis or community living when you join." },
    { q: "What settings commonly employ DSWs?", a: "Residential support programs, day programs and community living agencies." },
    { q: "What experience is useful to highlight for DSW opportunities?", a: "Highlight the populations you have supported, the settings you have worked in, and experience such as behaviour support, personal care, community participation or crisis response where relevant." },
  ],
  "nurse-practitioner": [
    { q: "What types of Nurse Practitioner opportunities can I explore in Ontario?", a: "Nurse Practitioner opportunities can span primary care, family health teams, community health, specialty clinics and other clinical settings depending on your area of practice." },
    { q: "What settings do Nurse Practitioners commonly work in?", a: "Nurse Practitioners may work in primary care clinics, community health centres, family health teams, hospitals and specialty practices." },
    { q: "Can I search for Nurse Practitioner opportunities by area of practice?", a: "Yes. NP opportunities may differ across areas such as primary care, mental health, geriatrics, paediatrics and palliative care." },
    { q: "What should I highlight when exploring Nurse Practitioner opportunities?", a: "Your registration status, area of practice, clinical experience, patient populations and the type of work or setting you are looking for are all useful to have ready." },
  ],
  "physiotherapist": [
    { q: "What types of Physiotherapist opportunities can I explore in Ontario?", a: "Physiotherapist roles can span hospitals, outpatient rehabilitation, private clinics, community care and other rehabilitation settings." },
    { q: "What areas of Physiotherapy experience should I highlight?", a: "Highlight the patient populations and treatment areas you have worked in, such as orthopaedic, neurological, sports, geriatric, paediatric or post-surgical rehabilitation." },
    { q: "Is clinic experience transferable to other Physiotherapy settings?", a: "It can be. Transferability depends on the patient population, treatment experience and requirements of the specific employer." },
    { q: "What should I have ready when exploring Physiotherapist opportunities?", a: "Your registration status, clinical experience, treatment areas, preferred work settings and availability are useful details to have ready." },
  ],
  "occupational-therapist": [
    { q: "What types of Occupational Therapist opportunities can I explore in Ontario?", a: "Occupational Therapist roles can span hospitals, rehabilitation, community care, home health, mental health and paediatric settings." },
    { q: "What areas of Occupational Therapy experience are useful to highlight?", a: "Highlight the populations and practice areas you have worked in, such as physical rehabilitation, neurological rehabilitation, mental health, paediatrics or geriatrics." },
    { q: "Can hospital, community and private-practice OT experience be relevant to different roles?", a: "Yes. Occupational Therapy skills are used across a range of care settings, although each employer may prioritize different populations, assessments or treatment experience." },
    { q: "What should I have ready when exploring Occupational Therapist opportunities?", a: "Your Ontario registration status, clinical experience, practice areas, preferred work settings and availability are useful details to have ready." },
  ],
  "psychologist": [
    { q: "What types of Psychologist opportunities can I explore in Ontario?", a: "Psychologist opportunities can span hospitals, mental health clinics, rehabilitation settings, community programs and private practice." },
    { q: "What areas of psychology experience are useful to highlight?", a: "Highlight your authorized areas of practice, client populations, assessment experience, treatment background and any specialty areas relevant to the type of role you are seeking." },
    { q: "Are assessment and treatment roles always combined?", a: "No. Some positions emphasize assessment, some focus more heavily on treatment, and others combine both depending on the employer and setting." },
    { q: "Can I explore opportunities based on the populations I work with?", a: "Yes. Roles may differ based on whether your experience is with children, adolescents, adults, seniors or specific clinical populations." },
  ],
  "medical-office-assistant": [
    { q: "What types of Medical Office Assistant opportunities can I explore in Ontario?", a: "MOA roles are common in family medicine clinics, specialist offices, walk-in clinics and hospital departments." },
    { q: "What administrative skills are relevant for MOA roles?", a: "Patient registration, scheduling, OHIP billing and medical records experience are all common employer criteria." },
    { q: "Is EMR experience important for MOA roles?", a: "Many employers look for it — note the specific EMR systems you've used and how much hands-on time you have with them." },
    { q: "How is an MOA different from a Unit Clerk or receptionist role?", a: "There's overlap, but MOA roles typically combine administrative and basic clinical-support duties within a clinic setting, rather than one or the other alone." },
  ],
  "medical-administrative-assistant": [
    { q: "What types of Medical Administrative Assistant opportunities can I explore in Ontario?", a: "Medical Administrative Assistant roles can support healthcare offices, clinics and clinical services through scheduling, records, correspondence, referrals and day-to-day administrative coordination." },
    { q: "What is the difference between a Medical Administrative Assistant and a Medical Office Assistant?", a: "Employers may use administrative titles differently, so review the duties in each opportunity carefully. Vetted keeps Medical Administrative Assistant and Medical Office Assistant as separate profession pathways so candidates can use the one that reflects their actual work background." },
    { q: "What experience should I highlight for Medical Administrative Assistant roles?", a: "Highlight healthcare administration experience such as scheduling, patient records, referrals, correspondence, office coordination and the medical systems or software you have used." },
    { q: "Can I join Vetted before a Medical Administrative Assistant job is posted?", a: "Yes. You can join the Registry and indicate your profession and preferred locations so your profile is available when relevant hiring needs arise." },
  ],
  "child-and-youth-care-practitioner": [
    { q: "What titles might I see when looking for Child and Youth Care Practitioner work?", a: "Employers may use Child and Youth Care Practitioner, CYCP, Child and Youth Worker or CYW language. On Vetted these routes lead to one Child and Youth Care Practitioner profession rather than separate candidate pools." },
    { q: "What settings can Child and Youth Care Practitioners work in?", a: "Opportunities may be found in residential programs, schools, community services and mental health settings supporting children, youth and families." },
    { q: "What experience should I highlight for CYCP opportunities?", a: "Highlight the age groups and populations you have supported and relevant experience in areas such as residential care, school-based support, mental health, crisis intervention, behavioural support or community programs." },
    { q: "Can I join the Registry for CYCP opportunities before a job is open?", a: "Yes. Joining before a matching opening is posted allows you to include your Child and Youth Care Practitioner background and the Ontario locations you are interested in." },
  ],
  "dietary-aide": [
    { q: "What types of Dietary Aide opportunities can I explore in Ontario?", a: "Dietary Aide roles are common in long-term care, hospital and retirement home kitchens." },
    { q: "Is a Food Handler Certificate required for Dietary Aide roles?", a: "Many employers look for it, along with Safe Food Handling training." },
    { q: "What does a typical shift involve for a Dietary Aide?", a: "Meal prep support, tray assembly and delivery, and dietary-restriction tracking are common tasks, though this varies by setting." },
    { q: "Is prior food-service experience outside healthcare relevant?", a: "Yes — general food-service or kitchen experience is often transferable, especially alongside a current Food Handler Certificate." },
  ],
  "cook": [
    { q: "What types of Cook opportunities can I explore in Ontario?", a: "Cook roles are common in long-term care, hospital and retirement home food service, including therapeutic and texture-modified diets." },
    { q: "What credentials are relevant for healthcare food service Cook roles?", a: "Food Handler Certification and Red Seal (where held) are common." },
    { q: "What food-service experience is useful for healthcare Cook roles?", a: "Experience in institutional kitchens, high-volume food service, long-term care, retirement or hospital food service can be relevant, especially when combined with experience following dietary requirements." },
    { q: "Is experience with therapeutic or texture-modified diets relevant for healthcare Cook roles?", a: "Yes. Experience preparing meals around dietary restrictions, texture modifications or other care-setting requirements can be useful for healthcare food-service roles." },
  ],
  "registered-social-worker": [
    { q: "What types of Registered Social Worker opportunities can I explore in Ontario?", a: "RSW roles span hospitals, community mental health programs, rehabilitation settings and private practice, working with a range of populations and needs." },
    { q: "What healthcare settings commonly employ Registered Social Workers?", a: "Hospitals, community health centres, mental health agencies and rehabilitation programs are common settings." },
    { q: "Is clinical social work experience required for every RSW role?", a: "It depends on the setting — some roles are clinical/psychotherapy-focused and others are more community or case-management based." },
    { q: "What populations might an RSW work with?", a: "This varies widely by setting — hospital medical social work, mental health, palliative care, and child/family services are all common areas of practice." },
  ],
  "registered-social-service-worker": [
    { q: "How is a Registered Social Service Worker different from a Registered Social Worker?", a: "RSSW and RSW are distinct, separately regulated roles under the OCSWSSW — RSSW roles are typically frontline community and social-service support rather than clinical social work." },
    { q: "What settings commonly employ RSSWs?", a: "Community agencies, healthcare-adjacent programs and social-service organizations are common settings." },
    { q: "What populations do RSSW roles typically support?", a: "This varies by employer — community support, mental health and social-service programs are all common." },
    { q: "What kind of experience is useful to highlight for RSSW roles?", a: "Direct frontline support experience, case coordination, and work with the specific populations a role serves are all worth describing in detail." },
  ],
  "housekeeper": [
    { q: "How is healthcare housekeeping different from general commercial cleaning?", a: "Healthcare housekeeping typically follows infection-prevention and environmental-services protocols specific to resident and patient care areas, alongside standard cleaning duties." },
    { q: "What settings commonly employ healthcare Housekeepers?", a: "Long-term care homes, retirement homes and hospitals are the most common settings." },
    { q: "Is prior healthcare or institutional cleaning experience required?", a: "Requirements vary by employer — general commercial cleaning experience is often transferable, especially with any infection-control training." },
    { q: "What does a typical Housekeeper shift look like in a care setting?", a: "Room and common-area cleaning, laundry support and adherence to infection-control routines are common, though duties vary by employer." },
  ],
  "scheduling-coordinator": [
    { q: "What does a healthcare Scheduling Coordinator typically do?", a: "Manages staffing desks and shift coverage for healthcare employers — filling call-outs, coordinating float staff and keeping schedules covered day to day." },
    { q: "Is experience with scheduling software relevant for these roles?", a: "Many employers look for it — note the specific scheduling or staffing systems you've used." },
    { q: "Do Scheduling Coordinator roles typically involve after-hours or on-call work?", a: "Some do, particularly in 24/7 care settings like long-term care or hospitals — this varies by employer." },
    { q: "Is scheduling experience from outside healthcare relevant?", a: "It can be — high-volume or shift-based scheduling experience is often transferable, particularly from other round-the-clock operations." },
  ],
  "continuing-care-assistant": [
    { q: "What types of Continuing Care Assistant opportunities can I explore in Ontario?", a: "CCA roles support daily living and personal care needs across long-term care, retirement and community settings." },
    { q: "What settings commonly employ Continuing Care Assistants?", a: "Long-term care homes, retirement homes and community/home care agencies are the most common." },
    { q: "Can I indicate areas of CCA experience, like dementia or palliative care?", a: "Yes — select every area that reflects your experience when you join." },
    { q: "Where can I look for Continuing Care Assistant opportunities in Ontario?", a: "Long-term care and retirement homes are common places to search, alongside community and home-care agencies." },
  ],
  "speech-language-pathologist": [
    { q: "What types of Speech-Language Pathology opportunities can I explore in Ontario?", a: "SLP roles span hospitals, schools, rehab clinics and private practice, working with speech, language, voice and swallowing needs." },
    { q: "Can I indicate my areas of SLP practice?", a: "Yes — paediatric, adult rehabilitation, voice and other practice areas can be added when you join." },
    { q: "What areas of SLP practice should I highlight?", a: "Highlight the populations and communication or swallowing needs you have worked with, such as paediatrics, adult rehabilitation, speech and language, voice or dysphagia." },
    { q: "Where can I look for Speech-Language Pathology jobs in Ontario?", a: "Hospitals and school boards are common places to search, alongside rehab clinics and private practice." },
  ],
  "respiratory-therapist": [
    { q: "What types of Respiratory Therapist opportunities can I explore in Ontario?", a: "Respiratory Therapist roles can span intensive care, emergency, inpatient care, respiratory clinics and community respiratory programs." },
    { q: "What Respiratory Therapy experience is useful to highlight?", a: "Highlight your experience with airway management, ventilator support, acute or critical care, pulmonary care and the patient populations you have worked with." },
    { q: "Do Respiratory Therapist roles commonly involve shift work?", a: "Many hospital-based roles include rotating shifts, nights or weekends, although schedules vary by employer and setting." },
    { q: "What should I have ready when exploring Respiratory Therapist opportunities?", a: "Your Ontario registration status, clinical experience, relevant certifications, preferred settings and availability are useful details to have ready." },
  ],
  "registered-dietitian": [
    { q: "What types of Registered Dietitian opportunities can I explore in Ontario?", a: "RD roles span hospitals, long-term care, community health and private practice, covering clinical and population nutrition." },
    { q: "Can I indicate my areas of dietetic practice?", a: "Yes — clinical nutrition, renal, paediatric or other focus areas can be added when you join." },
    { q: "What clinical experience should I highlight for Registered Dietitian opportunities?", a: "Highlight the populations and conditions you have supported, nutrition-assessment and counselling experience, care settings and your Ontario registration status." },
    { q: "Where can I look for Registered Dietitian jobs in Ontario?", a: "Hospitals and community health agencies are common places to search, alongside long-term care and private practice." },
  ],
  "audiologist": [
    { q: "What types of Audiology opportunities can I explore in Ontario?", a: "Audiologist roles span hospitals, clinics and private practice, covering hearing assessment and rehabilitation across age groups." },
    { q: "Can I indicate my areas of audiology practice?", a: "Yes — paediatric, adult or other focus areas can be added when you join." },
    { q: "What settings commonly employ Audiologists?", a: "Hospitals, hearing clinics and private practice are the most common." },
    { q: "What should I highlight when exploring Audiologist opportunities?", a: "Highlight your registration status, client populations, assessment experience, rehabilitation or hearing-device experience, preferred setting and availability." },
  ],
  "midwife": [
    { q: "What types of Midwifery opportunities can I explore in Ontario?", a: "Midwifery roles in Ontario are typically community-based, supporting prenatal, birth and postpartum care." },
    { q: "What settings commonly employ Midwives?", a: "Community midwifery practices and some hospital-affiliated programs are the most common." },
    { q: "Can I indicate my areas of midwifery experience?", a: "Yes — describe your specific practice history and experience when describing your background." },
    { q: "What should I highlight when exploring Midwife opportunities?", a: "Highlight your Ontario registration status, clinical experience, birth-setting experience, populations served and the type of practice arrangement you are seeking." },
  ],
  "recreation-therapist": [
    { q: "Where do Recreation Therapists typically work?", a: "Recreation Therapists may work in long-term care, rehabilitation, mental health, hospitals and community-based care settings." },
    { q: "How is therapeutic recreation different from general recreation programming?", a: "Therapeutic recreation is designed around identified therapeutic or functional goals, while general recreation programming is broader activity and engagement support." },
    { q: "What Recreation Therapy experience should I highlight?", a: "Highlight the populations you have supported, treatment or program goals, assessment experience and areas such as seniors care, mental health, brain injury or rehabilitation." },
    { q: "What should I have ready when exploring Recreation Therapist opportunities?", a: "Your education, relevant professional experience, populations served, preferred settings and availability are useful details to have ready." },
  ],
  "recreation-aide": [
    { q: "What does a Recreation Aide typically do?", a: "Recreation Aides support and help run recreation programs and activities, often alongside a Recreation Therapist, in long-term care and retirement settings." },
    { q: "What settings commonly employ Recreation Aides?", a: "Long-term care homes and retirement homes are the most common." },
    { q: "Where can I look for Recreation Aide opportunities in Ontario?", a: "Long-term care and retirement homes are the most common places to search." },
    { q: "What experience is useful to highlight for Recreation Aide opportunities?", a: "Highlight experience planning or supporting activities, working with older adults or other care populations, and any long-term care, retirement or therapeutic-recreation exposure." },
  ],
  "unit-clerk": [
    { q: "What does a Unit Clerk typically do?", a: "Unit Clerks support hospital or clinic unit administration — coordinating charts, communication and coverage for clinical staff." },
    { q: "What settings commonly employ Unit Clerks?", a: "Hospital units and larger clinics are the most common." },
    { q: "What skills are useful for Unit Clerk opportunities?", a: "Scheduling, order or chart processing, communication with clinical teams, patient-facing administration and experience with hospital systems can be relevant." },
    { q: "Where can I look for Unit Clerk opportunities in Ontario?", a: "Hospital units and larger clinics are the most common places to search." },
  ],
  "patient-registration-clerk": [
    { q: "What does a Patient Registration Clerk typically do?", a: "Patient Registration Clerks manage patient intake, registration and administrative coordination in healthcare settings." },
    { q: "What settings commonly employ Patient Registration Clerks?", a: "Hospitals and larger clinics are the most common." },
    { q: "Is scheduling or reception experience relevant for this role?", a: "Yes — describe your specific administrative and patient-facing experience when describing your background." },
    { q: "What skills are useful for Patient Registration Clerk opportunities?", a: "Patient intake, data entry, scheduling, privacy-sensitive communication and experience with hospital or clinical information systems can all be relevant." },
  ],
  "indigenous-health-worker": [
    { q: "What does an Indigenous Health Worker typically do?", a: "Indigenous Health Workers support culturally-safe care coordination and navigation for Indigenous patients and communities across healthcare settings." },
    { q: "What settings commonly employ Indigenous Health Workers?", a: "Hospitals, community health centres and Indigenous-led health organizations are common settings." },
    { q: "Can I indicate my community/cultural experience and background?", a: "Yes — describe your specific experience and community connections when describing your background." },
    { q: "What should I highlight when exploring Indigenous Health Worker opportunities?", a: "Highlight the communities and populations you have supported, your relevant health or community-service experience, and the type of program or setting in which you hope to work." },
  ],
  "case-manager-care-coordinator": [
    { q: "What does a Case Manager / Care Coordinator typically do?", a: "Case Managers and Care Coordinators plan and coordinate patient care across providers and settings, often for complex or ongoing needs." },
    { q: "What settings commonly employ Case Managers?", a: "Hospitals, community care agencies and home-care organizations are common settings." },
    { q: "What experience is useful for Case Manager or Care Coordinator roles?", a: "Care planning, client assessment, service coordination, documentation and experience working across interdisciplinary or community services can be relevant." },
    { q: "Where can I look for Case Manager or Care Coordinator opportunities in Ontario?", a: "Hospitals, community care agencies and home-care organizations are common places to search." },
  ],
  "medical-laboratory-technologist": [
    { q: "What types of Medical Laboratory Technologist opportunities can I explore in Ontario?", a: "MLT roles span hospital and community laboratories, covering areas such as hematology, microbiology and chemistry." },
    { q: "Can I indicate my areas of lab practice?", a: "Yes — hematology, microbiology, chemistry or other focus areas can be added when you join." },
    { q: "What laboratory experience should I highlight for MLT opportunities?", a: "Highlight the laboratory disciplines, instruments, specimen types and clinical environments in which you have worked, along with your registration status." },
    { q: "Where can I look for Medical Laboratory Technologist jobs in Ontario?", a: "Hospital and community diagnostic labs are the most common places to search." },
  ],
  "phlebotomist": [
    { q: "What does a Phlebotomist typically do?", a: "Phlebotomists collect blood samples for testing, working in hospital, community lab or clinic settings." },
    { q: "What settings commonly employ Phlebotomists?", a: "Community labs, hospital labs and specimen-collection clinics are the most common." },
    { q: "What patient-facing skills matter in phlebotomy work?", a: "Clear communication, accurate identification, comfort supporting anxious patients and careful specimen handling can all be important in blood-collection settings." },
    { q: "What experience is useful to highlight for Phlebotomist opportunities?", a: "Highlight blood-collection experience, the patient populations you have worked with, relevant laboratory or clinic experience, and any applicable training or certifications." },
  ],
  "lab-technician-assistant": [
    { q: "What does a Lab Technician / Assistant typically do?", a: "Lab Technicians and Assistants support specimen processing, testing and lab operations alongside Medical Laboratory Technologists." },
    { q: "What settings commonly employ Lab Technicians / Assistants?", a: "Hospital and community diagnostic labs are the most common." },
    { q: "Is prior lab experience required for these roles?", a: "Requirements vary by employer — describe your specific training and experience when describing your background." },
    { q: "What should I highlight for Laboratory Technician or Assistant opportunities?", a: "Highlight specimen handling, accessioning, laboratory workflow, patient-facing collection experience where applicable, and the laboratory settings in which you have worked." },
  ],
  "medical-radiation-technologist-radiography": [
    { q: "What job titles may be used for MRT Radiography opportunities?", a: "Relevant postings may use Medical Radiation Technologist — Radiography, MRT(R), Radiological Technologist or contextual X-Ray Technologist language." },
    { q: "What experience should I highlight for radiography opportunities?", a: "Highlight the imaging work you have performed, patient populations, clinical settings, equipment or modalities used and any other role-relevant radiography experience." },
    { q: "Do radiography opportunities in Ontario require professional registration?", a: "Radiography is a regulated imaging profession in Ontario. Review the requirements of each opportunity and be prepared for the employer to confirm current professional registration and hiring requirements." },
    { q: "Can I join Vetted for MRT Radiography opportunities before a job is posted?", a: "Yes. You can join the Registry and indicate the locations where you would consider radiography work." },
  ],
  "medical-radiation-technologist-radiation-therapy": [
    { q: "What job titles may be used for Radiation Therapy opportunities?", a: "Relevant postings may use Medical Radiation Technologist — Radiation Therapy, MRT(T) or Radiation Therapist." },
    { q: "What should I highlight when exploring Radiation Therapy roles?", a: "Highlight your radiation-therapy experience, treatment environments, patient populations, equipment experience and other role-relevant clinical responsibilities." },
    { q: "Is Radiation Therapy a separate medical imaging profession on Vetted?", a: "Yes. Radiation Therapy is kept distinct from Radiography, Nuclear Medicine, Magnetic Resonance and Diagnostic Medical Sonography so your profession is represented accurately." },
    { q: "Can I join Vetted before a Radiation Therapy opportunity is posted?", a: "Yes. You can join the Registry and include your Radiation Therapy background so it is available for future relevant hiring needs." },
  ],
  "medical-radiation-technologist-nuclear-medicine": [
    { q: "What job titles may be used for Nuclear Medicine opportunities?", a: "Relevant postings may use Medical Radiation Technologist — Nuclear Medicine, MRT(N) or Nuclear Medicine Technologist." },
    { q: "What experience should I highlight for Nuclear Medicine roles?", a: "Highlight your nuclear-medicine imaging experience, patient populations, clinical settings, equipment or procedures and other role-relevant responsibilities." },
    { q: "Is Nuclear Medicine separate from other medical imaging professions?", a: "Yes. Nuclear Medicine remains its own profession rather than being combined with Radiography, MRI, Radiation Therapy or Sonography." },
    { q: "Can I join Vetted before a Nuclear Medicine opportunity is posted?", a: "Yes. You can join the Registry and include your Nuclear Medicine background for future relevant opportunities." },
  ],
  "medical-radiation-technologist-magnetic-resonance": [
    { q: "What job titles may be used for MRI opportunities?", a: "Relevant postings may use Medical Radiation Technologist — Magnetic Resonance, MRT(MR), MRI Technologist or contextual MRI Tech language." },
    { q: "What experience should I highlight for Magnetic Resonance roles?", a: "Highlight your MRI experience, patient populations, clinical settings, equipment and the types of examinations or workflows you have supported." },
    { q: "Is MRI experience the same as having an MRT Magnetic Resonance profession profile?", a: "No. MRI-related experience can be relevant evidence, but the Medical Radiation Technologist — Magnetic Resonance profession is represented separately and should reflect the candidate's actual professional pathway." },
    { q: "Can I join Vetted for MRI opportunities before a job is posted?", a: "Yes. You can join the Registry and identify the locations where you would consider Magnetic Resonance work." },
  ],
  "diagnostic-medical-sonographer": [
    { q: "What job titles may be used for Diagnostic Medical Sonographer opportunities?", a: "Relevant postings may use Diagnostic Medical Sonographer, DMS, Sonographer, Ultrasound Technologist or contextual Ultrasound Tech language." },
    { q: "Are general, cardiac and vascular sonography separate professions on Vetted?", a: "No. They may describe areas of sonography practice or experience, while Diagnostic Medical Sonographer remains the profession." },
    { q: "What experience should I highlight for sonography opportunities?", a: "Highlight the types of examinations you perform, patient populations, clinical settings, equipment experience and the areas of sonography practice supported by your background." },
    { q: "Can I join Vetted for sonography opportunities before a job is posted?", a: "Yes. You can join the Registry and identify the locations where you would consider Diagnostic Medical Sonographer work." },
  ],
  "pharmacist": [
    { q: "What types of Pharmacist opportunities can I explore in Ontario?", a: "Pharmacist roles span community and hospital pharmacy, covering dispensing, clinical services and patient care." },
    { q: "What settings commonly employ Pharmacists?", a: "Community pharmacies and hospital pharmacy departments are the most common." },
    { q: "What practice experience should I highlight for Pharmacist opportunities?", a: "Highlight your Ontario registration status, practice setting, patient-care responsibilities, medication-management experience and any specialty or leadership background." },
    { q: "Where can I look for Pharmacist jobs in Ontario?", a: "Community and hospital pharmacy are common places to search, alongside clinical pharmacy roles." },
  ],
  "pharmacy-technician": [
    { q: "What types of Pharmacy Technician opportunities can I explore in Ontario?", a: "Pharmacy Technician opportunities can span community pharmacy, hospital pharmacy and other regulated pharmacy environments." },
    { q: "How is a Pharmacy Technician different from a Pharmacy Assistant?", a: "Pharmacy Technician is a regulated profession in Ontario with defined technical responsibilities, while Pharmacy Assistant is an unregulated support role." },
    { q: "What Pharmacy Technician experience should I highlight?", a: "Highlight dispensing, compounding, medication distribution, hospital or community pharmacy experience and the systems or workflows you have worked with." },
    { q: "What should I have ready when exploring Pharmacy Technician opportunities?", a: "Your Ontario registration status, pharmacy experience, relevant technical skills and preferred work setting are useful details to have ready." },
  ],
  "pharmacy-assistant": [
    { q: "What does a Pharmacy Assistant typically do?", a: "Pharmacy Assistants support dispensing and pharmacy operations under the supervision of a pharmacist or pharmacy technician." },
    { q: "What settings commonly employ Pharmacy Assistants?", a: "Community pharmacies and hospital pharmacy departments are the most common." },
    { q: "How is a Pharmacy Assistant role different from a Pharmacy Technician role?", a: "The responsibilities and credential requirements differ. Pharmacy Assistant work is generally support-focused, while Pharmacy Technician roles have a distinct regulated scope in Ontario." },
    { q: "What skills are useful for Pharmacy Assistant opportunities?", a: "Prescription intake support, data entry, inventory, customer service and experience with pharmacy software can be relevant depending on the employer." },
  ],
  "registered-psychotherapist": [
    { q: "What types of Registered Psychotherapist opportunities can I explore in Ontario?", a: "Registered Psychotherapist opportunities may be available in private practice, outpatient clinics, community mental health and other counselling or therapy settings." },
    { q: "What therapy experience should I highlight when looking for RP roles?", a: "Highlight the populations you work with, your therapy modalities, areas of clinical focus and whether your experience is individual, couples, family or group based." },
    { q: "Do Registered Psychotherapist roles focus on particular populations or concerns?", a: "Often. Employers may look for experience with particular populations or areas such as trauma, anxiety, depression, addictions, couples or youth mental health." },
    { q: "What should I have ready when exploring Registered Psychotherapist opportunities?", a: "Your CRPO registration status, clinical background, populations served, modalities used and availability are useful details to have ready." },
  ],
  "mental-health-worker": [
    { q: "What types of Mental Health Worker opportunities can I explore in Ontario?", a: "MHW roles span community mental health programs, hospitals and residential support settings." },
    { q: "What populations do Mental Health Worker roles typically support?", a: "This varies by employer — community, crisis and residential mental health programs are all common." },
    { q: "Can I indicate my areas of mental health experience?", a: "Yes — describe your specific experience and populations served when describing your background." },
    { q: "What experience is useful to highlight for Mental Health Worker opportunities?", a: "Highlight the populations you have supported and relevant experience in crisis support, residential care, community mental health, addictions or other behavioural-health settings." },
  ],
  "behaviour-therapist-aba": [
    { q: "What does a Behaviour Therapist / ABA Therapist typically do?", a: "Behaviour Therapists deliver applied behaviour analysis (ABA) programming, commonly supporting children and adults with autism and developmental disabilities." },
    { q: "What settings commonly employ Behaviour Therapists?", a: "Community agencies, schools and clinical ABA programs are the most common." },
    { q: "Is ABA-specific training relevant for these roles?", a: "Many employers look for it — describe your specific training and certifications when describing your background." },
    { q: "What experience should I highlight for Behaviour Therapist or ABA Therapist opportunities?", a: "Highlight the populations you have supported, ABA programming experience, behaviour-support responsibilities, clinical or community settings and relevant training." },
  ],
  "psychological-associate": [
    { q: "How is a Psychological Associate different from a Psychologist?", a: "Both are regulated under the College of Psychologists of Ontario with overlapping scope — describe your specific registration and area of practice when describing your background." },
    { q: "What settings commonly employ Psychological Associates?", a: "Outpatient clinics, hospitals and private practice are the most common." },
    { q: "Can I indicate my area of psychological practice?", a: "Yes — clinical, assessment or other focus areas can be added when you join." },
    { q: "What should I highlight when exploring Psychological Associate opportunities?", a: "Highlight your Ontario registration status, authorized areas of practice, client populations, assessment or treatment experience and preferred practice setting." },
  ],
  "registered-behaviour-analyst": [
    { q: "What does a Registered Behaviour Analyst typically do?", a: "RBAs design and oversee behaviour-analytic programming, often supervising Behaviour Therapists supporting individuals with autism and developmental disabilities." },
    { q: "What settings commonly employ Registered Behaviour Analysts?", a: "Community agencies and clinical ABA programs are the most common." },
    { q: "Is BCBA or equivalent certification relevant for these roles?", a: "Many employers look for it — describe your specific certification when describing your background." },
    { q: "What experience should I highlight for Registered Behaviour Analyst opportunities?", a: "Highlight your registration or certification status, populations served, assessment and program-design experience, supervision experience and the settings in which you have practised." },
  ],
  "psychiatrist": [
    { q: "What types of Psychiatrist opportunities can I explore in Ontario?", a: "Psychiatrist roles span hospitals, outpatient clinics and community mental health programs, across general and specialty practice." },
    { q: "What settings commonly employ Psychiatrists?", a: "Hospitals and outpatient mental health clinics are the most common." },
    { q: "Can I indicate my area of psychiatric specialty?", a: "Yes — describe your specific specialty and practice focus when describing your background." },
    { q: "What should I highlight when exploring Psychiatrist opportunities?", a: "Highlight your specialty or subspecialty, patient populations, clinical settings, practice interests and the type of role or arrangement you are seeking." },
  ],
  "kinesiologist": [
    { q: "What types of Kinesiologist opportunities can I explore in Ontario?", a: "Kinesiologist roles span rehab clinics, occupational health and private practice, supporting movement, exercise and injury rehabilitation." },
    { q: "What settings commonly employ Kinesiologists?", a: "Rehab clinics, occupational health programs and private practice are the most common." },
    { q: "Can I indicate my areas of kinesiology practice?", a: "Yes — rehabilitation, occupational health or other focus areas can be added when you join." },
    { q: "What experience should I highlight for Kinesiologist opportunities?", a: "Highlight your registration status where applicable, client populations, rehabilitation or exercise-programming experience, and the settings in which you have worked." },
  ],
  "chiropractor": [
    { q: "What types of Chiropractor opportunities can I explore in Ontario?", a: "Chiropractor roles are typically based in private practice and multidisciplinary clinics." },
    { q: "What settings commonly employ Chiropractors?", a: "Private practice and multidisciplinary rehab clinics are the most common." },
    { q: "Can I indicate my treatment focus areas?", a: "Yes — describe your specific practice focus and experience when describing your background." },
    { q: "What should I highlight when exploring Chiropractor opportunities?", a: "Highlight your Ontario registration status, patient populations, treatment focus, multidisciplinary experience and the practice arrangement you are seeking." },
  ],
  "registered-massage-therapist": [
    { q: "What types of Registered Massage Therapist opportunities can I explore in Ontario?", a: "RMT opportunities can span multidisciplinary clinics, private practices, rehabilitation settings and other treatment environments." },
    { q: "What areas of RMT experience should I highlight?", a: "Highlight the patient populations and treatment areas you have worked with, such as orthopaedic, sports, prenatal, deep-tissue or rehabilitative care." },
    { q: "Are RMT opportunities always structured the same way?", a: "No. Some positions are employment-based, while others may use contractor, fee-split or room-rental arrangements depending on the clinic." },
    { q: "What should I have ready when exploring RMT opportunities?", a: "Your CMTO registration status, treatment experience, preferred practice arrangement, availability and location preferences are useful details to have ready." },
  ],
  "occupational-therapist-assistant": [
    { q: "What does an Occupational Therapist Assistant typically do?", a: "OTAs support OT-directed treatment plans across rehab, hospital and community settings." },
    { q: "What settings commonly employ Occupational Therapist Assistants?", a: "Hospitals, rehab clinics and community health agencies are the most common." },
    { q: "How does an OTA work with an Occupational Therapist?", a: "An OTA carries out delegated or OT-directed components of a treatment plan; the exact responsibilities depend on the employer, setting and client population." },
    { q: "What experience is useful to highlight for Occupational Therapist Assistant opportunities?", a: "Highlight the populations and settings you have worked in, experience carrying out OT-directed treatment plans, and any rehabilitation equipment or documentation experience relevant to the role." },
  ],
  "physiotherapy-assistant": [
    { q: "What does a Physiotherapy Assistant typically do?", a: "PTAs support PT-directed treatment plans across rehab clinics, hospitals and long-term care." },
    { q: "What settings commonly employ Physiotherapy Assistants?", a: "Rehab clinics, hospitals and long-term care homes are the most common." },
    { q: "How does a PTA work with a Physiotherapist?", a: "A PTA supports PT-directed treatment and rehabilitation activities; the exact responsibilities depend on the employer, setting and patient population." },
    { q: "What experience is useful to highlight for Physiotherapy Assistant opportunities?", a: "Highlight the populations and settings you have worked in, experience carrying out PT-directed treatment plans, and relevant mobility, exercise or rehabilitation support experience." },
  ],
  "dental-hygienist": [
    { q: "What types of Dental Hygienist opportunities can I explore in Ontario?", a: "Dental Hygienist roles are typically based in private dental practice, with some community and public health settings." },
    { q: "What settings commonly employ Dental Hygienists?", a: "Private dental practices are the most common, alongside some community health programs." },
    { q: "What experience can matter for Dental Hygienist roles?", a: "Clinical hygiene experience, preventive care, patient education and experience working with different patient populations can all be relevant depending on the practice." },
    { q: "What should I highlight when exploring Dental Hygienist opportunities?", a: "Highlight your registration status, clinical experience, patient populations, preventive-care experience, preferred schedule and practice setting." },
  ],
  "dental-assistant": [
    { q: "What does a Dental Assistant typically do?", a: "Dental Assistants support chairside care and administrative coordination in dental practice settings." },
    { q: "What settings commonly employ Dental Assistants?", a: "Private dental practices are the most common." },
    { q: "What should I have ready when exploring Dental Assistant opportunities?", a: "Your training, chairside experience, infection-control experience, dental-office systems exposure, availability and preferred practice setting are useful details to have ready." },
    { q: "What skills are useful for Dental Assistant opportunities?", a: "Chairside assisting, instrument preparation, infection-control procedures, patient support and dental-office workflow experience can all be relevant depending on the role." },
  ],
  "paramedic": [
    { q: "What types of Paramedic opportunities can I explore in Ontario?", a: "Paramedic opportunities can span land ambulance, community paramedicine and other pre-hospital or emergency-care environments." },
    { q: "Should I identify whether I am a PCP, ACP or CCP?", a: "Yes. Your certification level affects scope of practice and is important context when exploring Paramedic opportunities." },
    { q: "Do Paramedic roles usually involve shift work?", a: "Many operational Paramedic roles involve shift schedules, including nights and weekends, although schedules vary by employer." },
    { q: "What should I have ready when exploring Paramedic opportunities?", a: "Your certification level, relevant service experience, clinical background, driver's licence information where relevant and availability are useful details to have ready." },
  ],
  "physician-assistant": [
    { q: "What types of Physician Assistant opportunities can I explore in Ontario?", a: "PA roles span hospitals, emergency departments and specialty clinics, working under physician supervision." },
    { q: "What settings commonly employ Physician Assistants?", a: "Hospitals and specialty clinics are the most common." },
    { q: "Can I indicate my area of PA practice?", a: "Yes — describe your specific specialty and clinical experience when describing your background." },
    { q: "What should I highlight when exploring Physician Assistant opportunities?", a: "Highlight your clinical background, patient populations, specialty experience, hospital or clinic experience and the type of physician-led setting you are seeking." },
  ],
  "medical-esthetician": [
    { q: "What does a Medical Esthetician typically do?", a: "Medical Estheticians provide clinical skin-care treatments such as laser and chemical peel procedures, typically in medical or dermatology-adjacent clinics." },
    { q: "What settings commonly employ Medical Estheticians?", a: "Medical spas and dermatology or cosmetic clinics are the most common." },
    { q: "Can I indicate my treatment specialties?", a: "Yes — laser, skin rejuvenation or other focus areas can be added when you join." },
    { q: "What should I highlight when exploring Medical Esthetician opportunities?", a: "Highlight your treatment training, hands-on experience, technologies or procedures you have worked with, client populations and the type of clinic setting you prefer." },
  ],
  "medical-devices-reprocessing-technician": [
    { q: "What does a Medical Devices Reprocessing Technician typically do?", a: "MDRD Technicians manage sterile processing and instrument reprocessing for surgical and clinical settings." },
    { q: "What settings commonly employ MDRD Technicians?", a: "Hospitals and surgical centres are the most common." },
    { q: "Is sterile processing certification relevant for these roles?", a: "Many employers look for it — describe your specific certification when describing your background." },
    { q: "What experience is useful to highlight for MDRD opportunities?", a: "Highlight sterile-processing training, instrument reprocessing experience, surgical or clinical environments worked in, and any relevant certification." },
  ],
  "nutritionist": [
    { q: "How is a Nutritionist different from a Registered Dietitian?", a: "Nutritionist and Registered Dietitian are distinct roles in Ontario — Nutritionist is not a regulated clinical title. Describe your specific training and scope when describing your background." },
    { q: "What settings commonly employ Nutritionists?", a: "Community health and food-service-adjacent healthcare settings are common." },
    { q: "What kinds of Nutritionist roles may appear in healthcare-adjacent settings?", a: "Roles can vary across community health, wellness, education and food-service-adjacent environments depending on the employer and the candidate's training and scope." },
    { q: "What should I highlight when exploring Nutritionist opportunities?", a: "Highlight your education and training, the populations you have supported, your area of focus and the type of community, wellness or healthcare-adjacent setting you are seeking." },
  ],
};

// ---------- SPECIALTY INTRO + FAQ POOLS ----------
export const SPECIALTY_INTRO: Record<string, string> = {
  "pacu": "PACU (Post-Anesthesia Care Unit) Registered Nurses monitor and stabilize patients immediately after surgery, managing pain, airway and recovery from anesthesia before transfer to a surgical unit or discharge.",
  "icu-and-critical-care": "ICU & Critical Care Registered Nurses manage the most acutely ill patients — continuous monitoring, ventilator and life-support management, and rapid response to changes in condition.",
  "emergency": "Emergency (ER/ED) Registered Nurses triage and treat patients with a wide range of urgent and acute conditions in a fast-paced, unpredictable setting.",
  "nicu": "NICU (Neonatal Intensive Care Unit) Registered Nurses care for premature or critically ill newborns, providing specialized monitoring and support in a highly controlled environment.",
  "perioperative-and-or": "Perioperative / OR Registered Nurses support patients before, during and after surgery — circulating, scrubbing in, or working in a pre/post-operative role.",
  "labour-and-delivery": "Labour & Delivery (Obstetrics) Registered Nurses support patients through labour, birth and the immediate postpartum period, working closely with obstetricians and midwives.",
  "cardiac-care": "Cardiac Care (Cardiovascular) Registered Nurses monitor and support patients with heart conditions, from telemetry and step-down units to cardiac surgery recovery.",
};
export const SPECIALTY_FAQ_POOLS: Record<string, FaqItem[]> = {
  "pacu": [
    { q: "What does a PACU nurse do?", a: "Monitors patients as they wake from anesthesia — airway, vitals, pain and recovery from surgery — until they're stable enough to transfer or discharge." },
    { q: "Is PACU the same as recovery room nursing?", a: "PACU and recovery room nursing commonly refer to post-anesthesia recovery care; employers may use either term in job titles or descriptions." },
    { q: "What experience may be relevant for PACU nursing opportunities?", a: "Acute-care, perioperative or critical-care nursing experience can be relevant depending on the employer and role." },
    { q: "Where do PACU nurses typically work?", a: "Hospitals and surgical/day-procedure centres with a post-anesthesia recovery unit." },
  ],
  "icu-and-critical-care": [
    { q: "What does an ICU or critical care RN do?", a: "Provides continuous, high-acuity monitoring and life-support care for critically ill patients, often one-to-one or one-to-two patient ratios." },
    { q: "Is ICU the same as critical care nursing?", a: "ICU nursing is a form of critical care nursing. Employers may use \"ICU\" or \"critical care\" depending on the unit and role." },
    { q: "What experience may be relevant for ICU or critical-care nursing?", a: "Critical-care, high-acuity or related acute-care nursing experience can be relevant depending on the employer and role." },
    { q: "Where do ICU nurses typically work?", a: "Hospitals with an intensive care or critical care unit." },
  ],
  "emergency": [
    { q: "What does an emergency room nurse do?", a: "Triages incoming patients and provides rapid assessment and treatment across a wide range of urgent conditions." },
    { q: "Is ER the same as ED nursing?", a: "Yes — Emergency Room and Emergency Department are the same area of practice, referred to differently by employer." },
    { q: "What experience may be relevant for emergency nursing?", a: "Emergency-department or other acute-care nursing experience can be relevant depending on the employer and role." },
    { q: "Where do emergency RNs typically work?", a: "Hospitals with an emergency department, and some urgent care centres." },
  ],
  "nicu": [
    { q: "What does a NICU nurse do?", a: "Cares for premature or critically ill newborns, providing specialized monitoring, feeding support and family education in an intensive care setting." },
    { q: "Is NICU the same as neonatal nursing?", a: "NICU refers specifically to neonatal intensive care. \"Neonatal nursing\" can be broader and may include newborn care outside an intensive-care unit." },
    { q: "What experience may be relevant for NICU nursing?", a: "Neonatal, paediatric acute-care or related high-acuity experience can be relevant depending on the employer and role." },
    { q: "Where do NICU nurses typically work?", a: "Hospitals with a neonatal intensive care unit, typically larger or regional hospitals." },
  ],
  "perioperative-and-or": [
    { q: "What does a perioperative or OR nurse do?", a: "Supports surgical patients before, during and after their procedure — as a scrub nurse, circulating nurse, or in pre/post-op care." },
    { q: "Is Perioperative the same as Operating Room nursing?", a: "Operating Room nursing falls within perioperative nursing. Employers may use \"OR,\" \"operating room\" or \"perioperative\" depending on the role." },
    { q: "What experience may be relevant for perioperative or OR nursing?", a: "Surgical, perioperative or other relevant acute-care nursing experience can be useful depending on the employer and role." },
    { q: "Where do perioperative RNs typically work?", a: "Hospitals and surgical/day-procedure centres with an operating room." },
  ],
  "labour-and-delivery": [
    { q: "What does a Labour & Delivery nurse do?", a: "Supports patients through labour and birth — monitoring mother and baby, assisting with delivery, and providing immediate postpartum care." },
    { q: "Is L&D the same as Obstetrics nursing?", a: "Labour & Delivery and Obstetrics are closely related terms, but employers may use them differently depending on whether a role covers labour, birth, postpartum or broader maternal-newborn care." },
    { q: "What experience may be relevant for Labour & Delivery nursing?", a: "Obstetrical, perinatal or maternal-newborn nursing experience can be relevant depending on the employer and role." },
    { q: "Where do L&D nurses typically work?", a: "Hospitals with a labour and delivery or maternity unit." },
  ],
  "cardiac-care": [
    { q: "What does a cardiac care nurse do?", a: "Monitors and cares for patients with heart conditions — from telemetry and step-down units to recovery after cardiac surgery." },
    { q: "Is Cardiac Care the same as Cardiovascular nursing?", a: "Cardiac care and cardiovascular nursing overlap, but job titles can vary by unit, patient population and level of acuity." },
    { q: "What experience may be relevant for cardiac-care nursing?", a: "Cardiac, telemetry, cardiovascular or related critical-care experience can be relevant depending on the employer and role." },
    { q: "Where do cardiac care nurses typically work?", a: "Hospitals with a cardiac, telemetry or cardiac surgery unit." },
  ],
};
export const SPECIALTY_CITY_FAQ_OVERRIDES: Record<string, FaqItem[]> = {
  "registered-nurse|pacu|oakville": [
    { q: "What experience is relevant for PACU nursing roles?", a: "Prior acute-care or perioperative nursing experience can be relevant, depending on the employer and role." },
    { q: "Can OR or critical-care experience be relevant when moving into PACU?", a: "Yes — acute and perioperative experience often transfers well into a PACU role." },
    { q: "What is the difference between PACU and other perioperative nursing roles?", a: "PACU focuses on post-anesthesia recovery, while OR/circulating roles support the procedure itself; PACU specifically focuses on post-anesthesia recovery." },
    { q: "What should I do if there is no current PACU nursing opening in Oakville?", a: "You can still join the Registry and include the relevant nursing experience and Oakville as a preferred location so your background is available for future matching opportunities." },
  ],
  "registered-nurse|icu-and-critical-care|toronto": [
    { q: "What does an ICU or critical care RN do?", a: "Provides continuous, high-acuity monitoring and life-support care for critically ill patients, often one-to-one or one-to-two patient ratios." },
    { q: "Is ICU the same as critical care nursing?", a: "ICU nursing is a form of critical care nursing; employers may use either term depending on the unit and role." },
    { q: "What experience may be relevant for ICU nursing?", a: "Critical-care or high-acuity experience can be relevant, depending on the employer and role." },
    { q: "How can I tell whether an ICU opportunity in Toronto is currently open?", a: "Current openings appear in the opportunity section on the page. If no live ICU role is shown, you can still join the Registry with ICU or critical-care experience and Toronto as a preferred location." },
  ],
  "registered-nurse|icu-and-critical-care|sudbury": [
    { q: "What does an ICU or critical care RN do?", a: "Provides continuous, high-acuity monitoring and life-support care for critically ill patients, often one-to-one or one-to-two patient ratios." },
    { q: "Is ICU the same as critical care nursing?", a: "ICU nursing is a form of critical care nursing; employers may use either term depending on the unit and role." },
    { q: "What experience may be relevant for ICU nursing?", a: "Critical-care or high-acuity experience can be relevant, depending on the employer and role." },
    { q: "What should I do if there is no current ICU or critical care RN opening in Sudbury?", a: "You can still join the Registry and include the relevant nursing experience and Sudbury as a preferred location so your background is available for future matching opportunities." },
  ],
  "registered-nurse|emergency|hamilton": [
    { q: "What does an emergency room nurse do?", a: "Triages incoming patients and provides rapid assessment and treatment across a wide range of urgent conditions." },
    { q: "Is ER the same as ED nursing?", a: "Yes — Emergency Room and Emergency Department are the same area of practice, referred to differently by employer." },
    { q: "What experience may be relevant for emergency nursing?", a: "Acute-care or emergency experience can be relevant, depending on the employer and role." },
    { q: "What should I do if there is no current emergency room nurse opening in Hamilton?", a: "You can still join the Registry and include the relevant nursing experience and Hamilton as a preferred location so your background is available for future matching opportunities." },
  ],
  "registered-nurse|nicu|ottawa": [
    { q: "What does a NICU nurse do?", a: "Cares for premature or critically ill newborns, providing specialized monitoring, feeding support and family education in an intensive care setting." },
    { q: "Is NICU the same as neonatal nursing?", a: "NICU refers specifically to intensive/critical neonatal care. \"Neonatal nursing\" can be broader than NICU-specific intensive care." },
    { q: "What experience may be relevant for NICU nursing?", a: "Neonatal or paediatric acute-care experience can be relevant, depending on the employer and role." },
    { q: "What should I do if there is no current NICU nurse opening in Ottawa?", a: "You can still join the Registry and include the relevant nursing experience and Ottawa as a preferred location so your background is available for future matching opportunities." },
  ],
  "registered-nurse|perioperative-and-or|mississauga": [
    { q: "What does a perioperative or OR nurse do?", a: "Supports surgical patients before, during and after their procedure — as a scrub nurse, circulating nurse, or in pre/post-op care." },
    { q: "Is Perioperative the same as Operating Room nursing?", a: "Operating Room nursing falls within perioperative nursing; employers may use either term depending on the role." },
    { q: "What experience may be relevant for OR nursing?", a: "Perioperative or surgical experience can be relevant, depending on the employer and role." },
    { q: "What should I do if there is no current perioperative or OR nurse opening in Mississauga?", a: "You can still join the Registry and include the relevant nursing experience and Mississauga as a preferred location so your background is available for future matching opportunities." },
  ],
  "registered-nurse|labour-and-delivery|london": [
    { q: "What does a Labour & Delivery nurse do?", a: "Supports patients through labour and birth — monitoring mother and baby, assisting with delivery, and providing immediate postpartum care." },
    { q: "Is L&D the same as Obstetrics nursing?", a: "Labour & Delivery and Obstetrics are closely related, although employers may use the terms differently depending on the unit and scope of the role." },
    { q: "What experience may be relevant for L&D nursing?", a: "Obstetrical or maternal-newborn experience can be relevant, depending on the employer and role." },
    { q: "What should I do if there is no current Labour & Delivery nurse opening in London?", a: "You can still join the Registry and include the relevant nursing experience and London as a preferred location so your background is available for future matching opportunities." },
  ],
  "registered-nurse|cardiac-care|burlington": [
    { q: "What does a cardiac care nurse do?", a: "Monitors and cares for patients with heart conditions — from telemetry and step-down units to recovery after cardiac surgery." },
    { q: "Is Cardiac Care the same as Cardiovascular nursing?", a: "Cardiac care and cardiovascular nursing overlap, although job titles vary by unit and patient population." },
    { q: "What experience may be relevant for cardiac care nursing?", a: "Cardiac, telemetry or critical-care experience can be relevant, depending on the employer and role." },
    { q: "What should I do if there is no current cardiac care nurse opening in Burlington?", a: "You can still join the Registry and include the relevant nursing experience and Burlington as a preferred location so your background is available for future matching opportunities." },
  ],
};

// ---------- LOCATION FAQS ----------
export const LOCATION_FAQS: Record<string, FaqItem[]> = {
  "toronto": [
    { q: "How can I search for healthcare jobs in Toronto by profession?", a: "Start with the profession that matches your background, then use the Toronto location page to explore relevant profession and opportunity pages." },
    { q: "Should I include nearby communities when searching around Toronto?", a: "If you are genuinely open to travelling, including nearby communities can broaden your search without changing Toronto as one of your preferred locations." },
    { q: "How broad should my location search be around Toronto?", a: "Use the locations you would realistically accept. A broader search can be useful if you are open to commuting or relocating, but your preferences should reflect where you would actually work." },
    { q: "Can I join the Registry for future healthcare opportunities in Toronto even if nothing is open today?", a: "Yes. You can join without waiting for a live posting and include Toronto among your preferred locations so your profile is available when a relevant hiring need arises." },
  ],
  "mississauga": [
    { q: "Can I explore healthcare work in Mississauga if I live somewhere else?", a: "Yes. If Mississauga is a place you would consider working, you can include it among your preferred locations regardless of where you currently live." },
    { q: "What should I compare when reviewing healthcare opportunities in Mississauga?", a: "Compare the profession, work setting, schedule, experience requirements, employment arrangement and any role-specific credentials before deciding whether an opportunity fits." },
    { q: "What information should I have ready before applying for healthcare work in Mississauga?", a: "Have your current resume, relevant experience, registration or certifications where applicable, availability and preferred work settings ready." },
    { q: "What can I do if I do not see a suitable healthcare opening in Mississauga today?", a: "Keep exploring other relevant profession or location pages, or join the Registry with Mississauga as a preferred location so you can be considered when a matching need arises." },
  ],
  "brampton": [
    { q: "Can I look for casual, part-time and full-time healthcare work in Brampton?", a: "Yes. Employment type depends on the employer and role, so consider the schedules and arrangements that fit your availability." },
    { q: "Can I search Brampton healthcare opportunities by area of practice?", a: "Where a profession has meaningful specialties or areas of practice, use those pages to narrow your search beyond the broad profession." },
    { q: "Can I explore more than one healthcare profession page for Brampton?", a: "Yes. Browse the profession that best matches each credential or type of work you are qualified to perform rather than relying on a single broad healthcare search." },
    { q: "Do I need to wait for a posted job in Brampton before joining Vetted?", a: "No. The Registry is designed to let healthcare professionals join before a matching posting exists and indicate Brampton as a location they would consider." },
  ],
  "markham": [
    { q: "Should I include nearby communities when searching around Markham?", a: "If you are genuinely open to travelling, including nearby communities can broaden your search without changing Markham as one of your preferred locations." },
    { q: "What healthcare work settings can I consider in Markham?", a: "The relevant settings depend on your profession and may include hospitals, clinics, long-term care, retirement, community, home care or other healthcare environments." },
    { q: "How do I narrow a broad healthcare job search in Markham?", a: "Start with profession, then narrow by area of practice where relevant and review the work setting, schedule and requirements of each opportunity." },
    { q: "Can I join the Registry for future healthcare opportunities in Markham even if nothing is open today?", a: "Yes. You can join without waiting for a live posting and include Markham among your preferred locations so your profile is available when a relevant hiring need arises." },
  ],
  "vaughan": [
    { q: "What should I compare when reviewing healthcare opportunities in Vaughan?", a: "Compare the profession, work setting, schedule, experience requirements, employment arrangement and any role-specific credentials before deciding whether an opportunity fits." },
    { q: "How broad should my location search be around Vaughan?", a: "Use the locations you would realistically accept. A broader search can be useful if you are open to commuting or relocating, but your preferences should reflect where you would actually work." },
    { q: "What if I am open to both Vaughan and other Ontario locations?", a: "You can explore more than one location and keep your search aligned with the places where you would realistically accept work." },
    { q: "What can I do if I do not see a suitable healthcare opening in Vaughan today?", a: "Keep exploring other relevant profession or location pages, or join the Registry with Vaughan as a preferred location so you can be considered when a matching need arises." },
  ],
  "richmond-hill": [
    { q: "Can I search Richmond Hill healthcare opportunities by area of practice?", a: "Where a profession has meaningful specialties or areas of practice, use those pages to narrow your search beyond the broad profession." },
    { q: "What information should I have ready before applying for healthcare work in Richmond Hill?", a: "Have your current resume, relevant experience, registration or certifications where applicable, availability and preferred work settings ready." },
    { q: "How can I search for healthcare jobs in Richmond Hill by profession?", a: "Start with the profession that matches your background, then use the Richmond Hill location page to explore relevant profession and opportunity pages." },
    { q: "Do I need to wait for a posted job in Richmond Hill before joining Vetted?", a: "No. The Registry is designed to let healthcare professionals join before a matching posting exists and indicate Richmond Hill as a location they would consider." },
  ],
  "newmarket": [
    { q: "What healthcare work settings can I consider in Newmarket?", a: "The relevant settings depend on your profession and may include hospitals, clinics, long-term care, retirement, community, home care or other healthcare environments." },
    { q: "Can I explore more than one healthcare profession page for Newmarket?", a: "Yes. Browse the profession that best matches each credential or type of work you are qualified to perform rather than relying on a single broad healthcare search." },
    { q: "Can I explore healthcare work in Newmarket if I live somewhere else?", a: "Yes. If Newmarket is a place you would consider working, you can include it among your preferred locations regardless of where you currently live." },
    { q: "Can I join the Registry for future healthcare opportunities in Newmarket even if nothing is open today?", a: "Yes. You can join without waiting for a live posting and include Newmarket among your preferred locations so your profile is available when a relevant hiring need arises." },
  ],
  "pickering": [
    { q: "How broad should my location search be around Pickering?", a: "Use the locations you would realistically accept. A broader search can be useful if you are open to commuting or relocating, but your preferences should reflect where you would actually work." },
    { q: "How do I narrow a broad healthcare job search in Pickering?", a: "Start with profession, then narrow by area of practice where relevant and review the work setting, schedule and requirements of each opportunity." },
    { q: "Can I look for casual, part-time and full-time healthcare work in Pickering?", a: "Yes. Employment type depends on the employer and role, so consider the schedules and arrangements that fit your availability." },
    { q: "What can I do if I do not see a suitable healthcare opening in Pickering today?", a: "Keep exploring other relevant profession or location pages, or join the Registry with Pickering as a preferred location so you can be considered when a matching need arises." },
  ],
  "ajax": [
    { q: "What information should I have ready before applying for healthcare work in Ajax?", a: "Have your current resume, relevant experience, registration or certifications where applicable, availability and preferred work settings ready." },
    { q: "What if I am open to both Ajax and other Ontario locations?", a: "You can explore more than one location and keep your search aligned with the places where you would realistically accept work." },
    { q: "Should I include nearby communities when searching around Ajax?", a: "If you are genuinely open to travelling, including nearby communities can broaden your search without changing Ajax as one of your preferred locations." },
    { q: "Do I need to wait for a posted job in Ajax before joining Vetted?", a: "No. The Registry is designed to let healthcare professionals join before a matching posting exists and indicate Ajax as a location they would consider." },
  ],
  "whitby": [
    { q: "Can I explore more than one healthcare profession page for Whitby?", a: "Yes. Browse the profession that best matches each credential or type of work you are qualified to perform rather than relying on a single broad healthcare search." },
    { q: "How can I search for healthcare jobs in Whitby by profession?", a: "Start with the profession that matches your background, then use the Whitby location page to explore relevant profession and opportunity pages." },
    { q: "What should I compare when reviewing healthcare opportunities in Whitby?", a: "Compare the profession, work setting, schedule, experience requirements, employment arrangement and any role-specific credentials before deciding whether an opportunity fits." },
    { q: "Can I join the Registry for future healthcare opportunities in Whitby even if nothing is open today?", a: "Yes. You can join without waiting for a live posting and include Whitby among your preferred locations so your profile is available when a relevant hiring need arises." },
  ],
  "oshawa": [
    { q: "How do I narrow a broad healthcare job search in Oshawa?", a: "Start with profession, then narrow by area of practice where relevant and review the work setting, schedule and requirements of each opportunity." },
    { q: "Can I explore healthcare work in Oshawa if I live somewhere else?", a: "Yes. If Oshawa is a place you would consider working, you can include it among your preferred locations regardless of where you currently live." },
    { q: "Can I search Oshawa healthcare opportunities by area of practice?", a: "Where a profession has meaningful specialties or areas of practice, use those pages to narrow your search beyond the broad profession." },
    { q: "What can I do if I do not see a suitable healthcare opening in Oshawa today?", a: "Keep exploring other relevant profession or location pages, or join the Registry with Oshawa as a preferred location so you can be considered when a matching need arises." },
  ],
  "hamilton": [
    { q: "What if I am open to both Hamilton and other Ontario locations?", a: "You can explore more than one location and keep your search aligned with the places where you would realistically accept work." },
    { q: "Can I look for casual, part-time and full-time healthcare work in Hamilton?", a: "Yes. Employment type depends on the employer and role, so consider the schedules and arrangements that fit your availability." },
    { q: "What healthcare work settings can I consider in Hamilton?", a: "The relevant settings depend on your profession and may include hospitals, clinics, long-term care, retirement, community, home care or other healthcare environments." },
    { q: "Do I need to wait for a posted job in Hamilton before joining Vetted?", a: "No. The Registry is designed to let healthcare professionals join before a matching posting exists and indicate Hamilton as a location they would consider." },
  ],
  "burlington": [
    { q: "How can I search for healthcare jobs in Burlington by profession?", a: "Start with the profession that matches your background, then use the Burlington location page to explore relevant profession and opportunity pages." },
    { q: "Should I include nearby communities when searching around Burlington?", a: "If you are genuinely open to travelling, including nearby communities can broaden your search without changing Burlington as one of your preferred locations." },
    { q: "How broad should my location search be around Burlington?", a: "Use the locations you would realistically accept. A broader search can be useful if you are open to commuting or relocating, but your preferences should reflect where you would actually work." },
    { q: "Can I join the Registry for future healthcare opportunities in Burlington even if nothing is open today?", a: "Yes. You can join without waiting for a live posting and include Burlington among your preferred locations so your profile is available when a relevant hiring need arises." },
  ],
  "oakville": [
    { q: "Can I explore healthcare work in Oakville if I live somewhere else?", a: "Yes. If Oakville is a place you would consider working, you can include it among your preferred locations regardless of where you currently live." },
    { q: "What should I compare when reviewing healthcare opportunities in Oakville?", a: "Compare the profession, work setting, schedule, experience requirements, employment arrangement and any role-specific credentials before deciding whether an opportunity fits." },
    { q: "What information should I have ready before applying for healthcare work in Oakville?", a: "Have your current resume, relevant experience, registration or certifications where applicable, availability and preferred work settings ready." },
    { q: "What can I do if I do not see a suitable healthcare opening in Oakville today?", a: "Keep exploring other relevant profession or location pages, or join the Registry with Oakville as a preferred location so you can be considered when a matching need arises." },
  ],
  "milton": [
    { q: "Can I look for casual, part-time and full-time healthcare work in Milton?", a: "Yes. Employment type depends on the employer and role, so consider the schedules and arrangements that fit your availability." },
    { q: "Can I search Milton healthcare opportunities by area of practice?", a: "Where a profession has meaningful specialties or areas of practice, use those pages to narrow your search beyond the broad profession." },
    { q: "Can I explore more than one healthcare profession page for Milton?", a: "Yes. Browse the profession that best matches each credential or type of work you are qualified to perform rather than relying on a single broad healthcare search." },
    { q: "Do I need to wait for a posted job in Milton before joining Vetted?", a: "No. The Registry is designed to let healthcare professionals join before a matching posting exists and indicate Milton as a location they would consider." },
  ],
  "halton-hills": [
    { q: "Should I include nearby communities when searching around Halton Hills?", a: "If you are genuinely open to travelling, including nearby communities can broaden your search without changing Halton Hills as one of your preferred locations." },
    { q: "What healthcare work settings can I consider in Halton Hills?", a: "The relevant settings depend on your profession and may include hospitals, clinics, long-term care, retirement, community, home care or other healthcare environments." },
    { q: "How do I narrow a broad healthcare job search in Halton Hills?", a: "Start with profession, then narrow by area of practice where relevant and review the work setting, schedule and requirements of each opportunity." },
    { q: "Can I join the Registry for future healthcare opportunities in Halton Hills even if nothing is open today?", a: "Yes. You can join without waiting for a live posting and include Halton Hills among your preferred locations so your profile is available when a relevant hiring need arises." },
  ],
  "st-catharines": [
    { q: "What should I compare when reviewing healthcare opportunities in St. Catharines?", a: "Compare the profession, work setting, schedule, experience requirements, employment arrangement and any role-specific credentials before deciding whether an opportunity fits." },
    { q: "How broad should my location search be around St. Catharines?", a: "Use the locations you would realistically accept. A broader search can be useful if you are open to commuting or relocating, but your preferences should reflect where you would actually work." },
    { q: "What if I am open to both St. Catharines and other Ontario locations?", a: "You can explore more than one location and keep your search aligned with the places where you would realistically accept work." },
    { q: "What can I do if I do not see a suitable healthcare opening in St. Catharines today?", a: "Keep exploring other relevant profession or location pages, or join the Registry with St. Catharines as a preferred location so you can be considered when a matching need arises." },
  ],
  "niagara-falls": [
    { q: "Can I search Niagara Falls healthcare opportunities by area of practice?", a: "Where a profession has meaningful specialties or areas of practice, use those pages to narrow your search beyond the broad profession." },
    { q: "What information should I have ready before applying for healthcare work in Niagara Falls?", a: "Have your current resume, relevant experience, registration or certifications where applicable, availability and preferred work settings ready." },
    { q: "How can I search for healthcare jobs in Niagara Falls by profession?", a: "Start with the profession that matches your background, then use the Niagara Falls location page to explore relevant profession and opportunity pages." },
    { q: "Do I need to wait for a posted job in Niagara Falls before joining Vetted?", a: "No. The Registry is designed to let healthcare professionals join before a matching posting exists and indicate Niagara Falls as a location they would consider." },
  ],
  "welland": [
    { q: "What healthcare work settings can I consider in Welland?", a: "The relevant settings depend on your profession and may include hospitals, clinics, long-term care, retirement, community, home care or other healthcare environments." },
    { q: "Can I explore more than one healthcare profession page for Welland?", a: "Yes. Browse the profession that best matches each credential or type of work you are qualified to perform rather than relying on a single broad healthcare search." },
    { q: "Can I explore healthcare work in Welland if I live somewhere else?", a: "Yes. If Welland is a place you would consider working, you can include it among your preferred locations regardless of where you currently live." },
    { q: "Can I join the Registry for future healthcare opportunities in Welland even if nothing is open today?", a: "Yes. You can join without waiting for a live posting and include Welland among your preferred locations so your profile is available when a relevant hiring need arises." },
  ],
  "niagara-on-the-lake": [
    { q: "How broad should my location search be around Niagara-on-the-Lake?", a: "Use the locations you would realistically accept. A broader search can be useful if you are open to commuting or relocating, but your preferences should reflect where you would actually work." },
    { q: "How do I narrow a broad healthcare job search in Niagara-on-the-Lake?", a: "Start with profession, then narrow by area of practice where relevant and review the work setting, schedule and requirements of each opportunity." },
    { q: "Can I look for casual, part-time and full-time healthcare work in Niagara-on-the-Lake?", a: "Yes. Employment type depends on the employer and role, so consider the schedules and arrangements that fit your availability." },
    { q: "What can I do if I do not see a suitable healthcare opening in Niagara-on-the-Lake today?", a: "Keep exploring other relevant profession or location pages, or join the Registry with Niagara-on-the-Lake as a preferred location so you can be considered when a matching need arises." },
  ],
  "fort-erie": [
    { q: "What information should I have ready before applying for healthcare work in Fort Erie?", a: "Have your current resume, relevant experience, registration or certifications where applicable, availability and preferred work settings ready." },
    { q: "What if I am open to both Fort Erie and other Ontario locations?", a: "You can explore more than one location and keep your search aligned with the places where you would realistically accept work." },
    { q: "Should I include nearby communities when searching around Fort Erie?", a: "If you are genuinely open to travelling, including nearby communities can broaden your search without changing Fort Erie as one of your preferred locations." },
    { q: "Do I need to wait for a posted job in Fort Erie before joining Vetted?", a: "No. The Registry is designed to let healthcare professionals join before a matching posting exists and indicate Fort Erie as a location they would consider." },
  ],
  "grimsby": [
    { q: "Can I explore more than one healthcare profession page for Grimsby?", a: "Yes. Browse the profession that best matches each credential or type of work you are qualified to perform rather than relying on a single broad healthcare search." },
    { q: "How can I search for healthcare jobs in Grimsby by profession?", a: "Start with the profession that matches your background, then use the Grimsby location page to explore relevant profession and opportunity pages." },
    { q: "What should I compare when reviewing healthcare opportunities in Grimsby?", a: "Compare the profession, work setting, schedule, experience requirements, employment arrangement and any role-specific credentials before deciding whether an opportunity fits." },
    { q: "Can I join the Registry for future healthcare opportunities in Grimsby even if nothing is open today?", a: "Yes. You can join without waiting for a live posting and include Grimsby among your preferred locations so your profile is available when a relevant hiring need arises." },
  ],
  "kitchener": [
    { q: "How do I narrow a broad healthcare job search in Kitchener?", a: "Start with profession, then narrow by area of practice where relevant and review the work setting, schedule and requirements of each opportunity." },
    { q: "Can I explore healthcare work in Kitchener if I live somewhere else?", a: "Yes. If Kitchener is a place you would consider working, you can include it among your preferred locations regardless of where you currently live." },
    { q: "Can I search Kitchener healthcare opportunities by area of practice?", a: "Where a profession has meaningful specialties or areas of practice, use those pages to narrow your search beyond the broad profession." },
    { q: "What can I do if I do not see a suitable healthcare opening in Kitchener today?", a: "Keep exploring other relevant profession or location pages, or join the Registry with Kitchener as a preferred location so you can be considered when a matching need arises." },
  ],
  "waterloo": [
    { q: "What if I am open to both Waterloo and other Ontario locations?", a: "You can explore more than one location and keep your search aligned with the places where you would realistically accept work." },
    { q: "Can I look for casual, part-time and full-time healthcare work in Waterloo?", a: "Yes. Employment type depends on the employer and role, so consider the schedules and arrangements that fit your availability." },
    { q: "What healthcare work settings can I consider in Waterloo?", a: "The relevant settings depend on your profession and may include hospitals, clinics, long-term care, retirement, community, home care or other healthcare environments." },
    { q: "Do I need to wait for a posted job in Waterloo before joining Vetted?", a: "No. The Registry is designed to let healthcare professionals join before a matching posting exists and indicate Waterloo as a location they would consider." },
  ],
  "cambridge": [
    { q: "How can I search for healthcare jobs in Cambridge by profession?", a: "Start with the profession that matches your background, then use the Cambridge location page to explore relevant profession and opportunity pages." },
    { q: "Should I include nearby communities when searching around Cambridge?", a: "If you are genuinely open to travelling, including nearby communities can broaden your search without changing Cambridge as one of your preferred locations." },
    { q: "How broad should my location search be around Cambridge?", a: "Use the locations you would realistically accept. A broader search can be useful if you are open to commuting or relocating, but your preferences should reflect where you would actually work." },
    { q: "Can I join the Registry for future healthcare opportunities in Cambridge even if nothing is open today?", a: "Yes. You can join without waiting for a live posting and include Cambridge among your preferred locations so your profile is available when a relevant hiring need arises." },
  ],
  "guelph": [
    { q: "Can I explore healthcare work in Guelph if I live somewhere else?", a: "Yes. If Guelph is a place you would consider working, you can include it among your preferred locations regardless of where you currently live." },
    { q: "What should I compare when reviewing healthcare opportunities in Guelph?", a: "Compare the profession, work setting, schedule, experience requirements, employment arrangement and any role-specific credentials before deciding whether an opportunity fits." },
    { q: "What information should I have ready before applying for healthcare work in Guelph?", a: "Have your current resume, relevant experience, registration or certifications where applicable, availability and preferred work settings ready." },
    { q: "What can I do if I do not see a suitable healthcare opening in Guelph today?", a: "Keep exploring other relevant profession or location pages, or join the Registry with Guelph as a preferred location so you can be considered when a matching need arises." },
  ],
  "barrie": [
    { q: "Can I look for casual, part-time and full-time healthcare work in Barrie?", a: "Yes. Employment type depends on the employer and role, so consider the schedules and arrangements that fit your availability." },
    { q: "Can I search Barrie healthcare opportunities by area of practice?", a: "Where a profession has meaningful specialties or areas of practice, use those pages to narrow your search beyond the broad profession." },
    { q: "Can I explore more than one healthcare profession page for Barrie?", a: "Yes. Browse the profession that best matches each credential or type of work you are qualified to perform rather than relying on a single broad healthcare search." },
    { q: "Do I need to wait for a posted job in Barrie before joining Vetted?", a: "No. The Registry is designed to let healthcare professionals join before a matching posting exists and indicate Barrie as a location they would consider." },
  ],
  "orillia": [
    { q: "Should I include nearby communities when searching around Orillia?", a: "If you are genuinely open to travelling, including nearby communities can broaden your search without changing Orillia as one of your preferred locations." },
    { q: "What healthcare work settings can I consider in Orillia?", a: "The relevant settings depend on your profession and may include hospitals, clinics, long-term care, retirement, community, home care or other healthcare environments." },
    { q: "How do I narrow a broad healthcare job search in Orillia?", a: "Start with profession, then narrow by area of practice where relevant and review the work setting, schedule and requirements of each opportunity." },
    { q: "Can I join the Registry for future healthcare opportunities in Orillia even if nothing is open today?", a: "Yes. You can join without waiting for a live posting and include Orillia among your preferred locations so your profile is available when a relevant hiring need arises." },
  ],
  "collingwood": [
    { q: "What should I compare when reviewing healthcare opportunities in Collingwood?", a: "Compare the profession, work setting, schedule, experience requirements, employment arrangement and any role-specific credentials before deciding whether an opportunity fits." },
    { q: "How broad should my location search be around Collingwood?", a: "Use the locations you would realistically accept. A broader search can be useful if you are open to commuting or relocating, but your preferences should reflect where you would actually work." },
    { q: "What if I am open to both Collingwood and other Ontario locations?", a: "You can explore more than one location and keep your search aligned with the places where you would realistically accept work." },
    { q: "What can I do if I do not see a suitable healthcare opening in Collingwood today?", a: "Keep exploring other relevant profession or location pages, or join the Registry with Collingwood as a preferred location so you can be considered when a matching need arises." },
  ],
  "ottawa": [
    { q: "Can I search Ottawa healthcare opportunities by area of practice?", a: "Where a profession has meaningful specialties or areas of practice, use those pages to narrow your search beyond the broad profession." },
    { q: "What information should I have ready before applying for healthcare work in Ottawa?", a: "Have your current resume, relevant experience, registration or certifications where applicable, availability and preferred work settings ready." },
    { q: "How can I search for healthcare jobs in Ottawa by profession?", a: "Start with the profession that matches your background, then use the Ottawa location page to explore relevant profession and opportunity pages." },
    { q: "Do I need to wait for a posted job in Ottawa before joining Vetted?", a: "No. The Registry is designed to let healthcare professionals join before a matching posting exists and indicate Ottawa as a location they would consider." },
  ],
  "kingston": [
    { q: "What healthcare work settings can I consider in Kingston?", a: "The relevant settings depend on your profession and may include hospitals, clinics, long-term care, retirement, community, home care or other healthcare environments." },
    { q: "Can I explore more than one healthcare profession page for Kingston?", a: "Yes. Browse the profession that best matches each credential or type of work you are qualified to perform rather than relying on a single broad healthcare search." },
    { q: "Can I explore healthcare work in Kingston if I live somewhere else?", a: "Yes. If Kingston is a place you would consider working, you can include it among your preferred locations regardless of where you currently live." },
    { q: "Can I join the Registry for future healthcare opportunities in Kingston even if nothing is open today?", a: "Yes. You can join without waiting for a live posting and include Kingston among your preferred locations so your profile is available when a relevant hiring need arises." },
  ],
  "belleville": [
    { q: "How broad should my location search be around Belleville?", a: "Use the locations you would realistically accept. A broader search can be useful if you are open to commuting or relocating, but your preferences should reflect where you would actually work." },
    { q: "How do I narrow a broad healthcare job search in Belleville?", a: "Start with profession, then narrow by area of practice where relevant and review the work setting, schedule and requirements of each opportunity." },
    { q: "Can I look for casual, part-time and full-time healthcare work in Belleville?", a: "Yes. Employment type depends on the employer and role, so consider the schedules and arrangements that fit your availability." },
    { q: "What can I do if I do not see a suitable healthcare opening in Belleville today?", a: "Keep exploring other relevant profession or location pages, or join the Registry with Belleville as a preferred location so you can be considered when a matching need arises." },
  ],
  "peterborough": [
    { q: "What information should I have ready before applying for healthcare work in Peterborough?", a: "Have your current resume, relevant experience, registration or certifications where applicable, availability and preferred work settings ready." },
    { q: "What if I am open to both Peterborough and other Ontario locations?", a: "You can explore more than one location and keep your search aligned with the places where you would realistically accept work." },
    { q: "Should I include nearby communities when searching around Peterborough?", a: "If you are genuinely open to travelling, including nearby communities can broaden your search without changing Peterborough as one of your preferred locations." },
    { q: "Do I need to wait for a posted job in Peterborough before joining Vetted?", a: "No. The Registry is designed to let healthcare professionals join before a matching posting exists and indicate Peterborough as a location they would consider." },
  ],
  "cornwall": [
    { q: "Can I explore more than one healthcare profession page for Cornwall?", a: "Yes. Browse the profession that best matches each credential or type of work you are qualified to perform rather than relying on a single broad healthcare search." },
    { q: "How can I search for healthcare jobs in Cornwall by profession?", a: "Start with the profession that matches your background, then use the Cornwall location page to explore relevant profession and opportunity pages." },
    { q: "What should I compare when reviewing healthcare opportunities in Cornwall?", a: "Compare the profession, work setting, schedule, experience requirements, employment arrangement and any role-specific credentials before deciding whether an opportunity fits." },
    { q: "Can I join the Registry for future healthcare opportunities in Cornwall even if nothing is open today?", a: "Yes. You can join without waiting for a live posting and include Cornwall among your preferred locations so your profile is available when a relevant hiring need arises." },
  ],
  "brockville": [
    { q: "How do I narrow a broad healthcare job search in Brockville?", a: "Start with profession, then narrow by area of practice where relevant and review the work setting, schedule and requirements of each opportunity." },
    { q: "Can I explore healthcare work in Brockville if I live somewhere else?", a: "Yes. If Brockville is a place you would consider working, you can include it among your preferred locations regardless of where you currently live." },
    { q: "Can I search Brockville healthcare opportunities by area of practice?", a: "Where a profession has meaningful specialties or areas of practice, use those pages to narrow your search beyond the broad profession." },
    { q: "What can I do if I do not see a suitable healthcare opening in Brockville today?", a: "Keep exploring other relevant profession or location pages, or join the Registry with Brockville as a preferred location so you can be considered when a matching need arises." },
  ],
  "london": [
    { q: "What if I am open to both London and other Ontario locations?", a: "You can explore more than one location and keep your search aligned with the places where you would realistically accept work." },
    { q: "Can I look for casual, part-time and full-time healthcare work in London?", a: "Yes. Employment type depends on the employer and role, so consider the schedules and arrangements that fit your availability." },
    { q: "What healthcare work settings can I consider in London?", a: "The relevant settings depend on your profession and may include hospitals, clinics, long-term care, retirement, community, home care or other healthcare environments." },
    { q: "Do I need to wait for a posted job in London before joining Vetted?", a: "No. The Registry is designed to let healthcare professionals join before a matching posting exists and indicate London as a location they would consider." },
  ],
  "windsor": [
    { q: "How can I search for healthcare jobs in Windsor by profession?", a: "Start with the profession that matches your background, then use the Windsor location page to explore relevant profession and opportunity pages." },
    { q: "Should I include nearby communities when searching around Windsor?", a: "If you are genuinely open to travelling, including nearby communities can broaden your search without changing Windsor as one of your preferred locations." },
    { q: "How broad should my location search be around Windsor?", a: "Use the locations you would realistically accept. A broader search can be useful if you are open to commuting or relocating, but your preferences should reflect where you would actually work." },
    { q: "Can I join the Registry for future healthcare opportunities in Windsor even if nothing is open today?", a: "Yes. You can join without waiting for a live posting and include Windsor among your preferred locations so your profile is available when a relevant hiring need arises." },
  ],
  "sarnia": [
    { q: "Can I explore healthcare work in Sarnia if I live somewhere else?", a: "Yes. If Sarnia is a place you would consider working, you can include it among your preferred locations regardless of where you currently live." },
    { q: "What should I compare when reviewing healthcare opportunities in Sarnia?", a: "Compare the profession, work setting, schedule, experience requirements, employment arrangement and any role-specific credentials before deciding whether an opportunity fits." },
    { q: "What information should I have ready before applying for healthcare work in Sarnia?", a: "Have your current resume, relevant experience, registration or certifications where applicable, availability and preferred work settings ready." },
    { q: "What can I do if I do not see a suitable healthcare opening in Sarnia today?", a: "Keep exploring other relevant profession or location pages, or join the Registry with Sarnia as a preferred location so you can be considered when a matching need arises." },
  ],
  "woodstock": [
    { q: "Can I look for casual, part-time and full-time healthcare work in Woodstock?", a: "Yes. Employment type depends on the employer and role, so consider the schedules and arrangements that fit your availability." },
    { q: "Can I search Woodstock healthcare opportunities by area of practice?", a: "Where a profession has meaningful specialties or areas of practice, use those pages to narrow your search beyond the broad profession." },
    { q: "Can I explore more than one healthcare profession page for Woodstock?", a: "Yes. Browse the profession that best matches each credential or type of work you are qualified to perform rather than relying on a single broad healthcare search." },
    { q: "Do I need to wait for a posted job in Woodstock before joining Vetted?", a: "No. The Registry is designed to let healthcare professionals join before a matching posting exists and indicate Woodstock as a location they would consider." },
  ],
  "st-thomas": [
    { q: "Should I include nearby communities when searching around St. Thomas?", a: "If you are genuinely open to travelling, including nearby communities can broaden your search without changing St. Thomas as one of your preferred locations." },
    { q: "What healthcare work settings can I consider in St. Thomas?", a: "The relevant settings depend on your profession and may include hospitals, clinics, long-term care, retirement, community, home care or other healthcare environments." },
    { q: "How do I narrow a broad healthcare job search in St. Thomas?", a: "Start with profession, then narrow by area of practice where relevant and review the work setting, schedule and requirements of each opportunity." },
    { q: "Can I join the Registry for future healthcare opportunities in St. Thomas even if nothing is open today?", a: "Yes. You can join without waiting for a live posting and include St. Thomas among your preferred locations so your profile is available when a relevant hiring need arises." },
  ],
  "sudbury": [
    { q: "What should I compare when reviewing healthcare opportunities in Sudbury?", a: "Compare the profession, work setting, schedule, experience requirements, employment arrangement and any role-specific credentials before deciding whether an opportunity fits." },
    { q: "How broad should my location search be around Sudbury?", a: "Use the locations you would realistically accept. A broader search can be useful if you are open to commuting or relocating, but your preferences should reflect where you would actually work." },
    { q: "What if I am open to both Sudbury and other Ontario locations?", a: "You can explore more than one location and keep your search aligned with the places where you would realistically accept work." },
    { q: "What can I do if I do not see a suitable healthcare opening in Sudbury today?", a: "Keep exploring other relevant profession or location pages, or join the Registry with Sudbury as a preferred location so you can be considered when a matching need arises." },
  ],
  "thunder-bay": [
    { q: "Can I search Thunder Bay healthcare opportunities by area of practice?", a: "Where a profession has meaningful specialties or areas of practice, use those pages to narrow your search beyond the broad profession." },
    { q: "What information should I have ready before applying for healthcare work in Thunder Bay?", a: "Have your current resume, relevant experience, registration or certifications where applicable, availability and preferred work settings ready." },
    { q: "How can I search for healthcare jobs in Thunder Bay by profession?", a: "Start with the profession that matches your background, then use the Thunder Bay location page to explore relevant profession and opportunity pages." },
    { q: "Do I need to wait for a posted job in Thunder Bay before joining Vetted?", a: "No. The Registry is designed to let healthcare professionals join before a matching posting exists and indicate Thunder Bay as a location they would consider." },
  ],
  "north-bay": [
    { q: "What healthcare work settings can I consider in North Bay?", a: "The relevant settings depend on your profession and may include hospitals, clinics, long-term care, retirement, community, home care or other healthcare environments." },
    { q: "Can I explore more than one healthcare profession page for North Bay?", a: "Yes. Browse the profession that best matches each credential or type of work you are qualified to perform rather than relying on a single broad healthcare search." },
    { q: "Can I explore healthcare work in North Bay if I live somewhere else?", a: "Yes. If North Bay is a place you would consider working, you can include it among your preferred locations regardless of where you currently live." },
    { q: "Can I join the Registry for future healthcare opportunities in North Bay even if nothing is open today?", a: "Yes. You can join without waiting for a live posting and include North Bay among your preferred locations so your profile is available when a relevant hiring need arises." },
  ],
  "sault-ste-marie": [
    { q: "How broad should my location search be around Sault Ste. Marie?", a: "Use the locations you would realistically accept. A broader search can be useful if you are open to commuting or relocating, but your preferences should reflect where you would actually work." },
    { q: "How do I narrow a broad healthcare job search in Sault Ste. Marie?", a: "Start with profession, then narrow by area of practice where relevant and review the work setting, schedule and requirements of each opportunity." },
    { q: "Can I look for casual, part-time and full-time healthcare work in Sault Ste. Marie?", a: "Yes. Employment type depends on the employer and role, so consider the schedules and arrangements that fit your availability." },
    { q: "What can I do if I do not see a suitable healthcare opening in Sault Ste. Marie today?", a: "Keep exploring other relevant profession or location pages, or join the Registry with Sault Ste. Marie as a preferred location so you can be considered when a matching need arises." },
  ],
  "timmins": [
    { q: "What information should I have ready before applying for healthcare work in Timmins?", a: "Have your current resume, relevant experience, registration or certifications where applicable, availability and preferred work settings ready." },
    { q: "What if I am open to both Timmins and other Ontario locations?", a: "You can explore more than one location and keep your search aligned with the places where you would realistically accept work." },
    { q: "Should I include nearby communities when searching around Timmins?", a: "If you are genuinely open to travelling, including nearby communities can broaden your search without changing Timmins as one of your preferred locations." },
    { q: "Do I need to wait for a posted job in Timmins before joining Vetted?", a: "No. The Registry is designed to let healthcare professionals join before a matching posting exists and indicate Timmins as a location they would consider." },
  ],
};

// ---------- PROFESSION + CITY FAQS ----------
export const PROFESSION_CITY_FAQS: Record<string, FaqItem[]> = {
  "registered-nurse|toronto": [
    { q: "What types of Registered Nurse opportunities can I explore in Toronto?", a: "RN opportunities can span hospitals, long-term care, community health and specialty clinics. Review the current page for Toronto and use areas of practice to narrow the search where relevant." },
    { q: "Can I indicate more than one area of nursing practice?", a: "Yes — select every area of practice that reflects your experience, from ICU or PACU to palliative or community health." },
    { q: "What should I compare when reviewing Registered Nurse opportunities in Toronto?", a: "Compare the work setting, schedule, experience requirements, employment arrangement and any role-specific credentials to decide whether the opportunity fits your background." },
    { q: "Can I join the Registry for Registered Nurse opportunities in Toronto if nothing is open today?", a: "Yes. You can join without waiting for a live posting and include Toronto as a preferred location so your Registered Nurse background is available when a relevant hiring need arises." },
  ],
  "registered-nurse|oakville": [
    { q: "What types of Registered Nurse opportunities can I explore in Oakville?", a: "RN opportunities can span hospitals, long-term care, community health and specialty clinics. Review the current page for Oakville and use areas of practice to narrow the search where relevant." },
    { q: "Can I indicate more than one area of nursing practice?", a: "Yes — select every area of practice that reflects your experience, from ICU or PACU to palliative or community health." },
    { q: "What should I compare when reviewing Registered Nurse opportunities in Oakville?", a: "Compare the work setting, schedule, experience requirements, employment arrangement and any role-specific credentials to decide whether the opportunity fits your background." },
    { q: "What can I do if I do not see a current Registered Nurse opening in Oakville?", a: "You can still join the Registry, include your relevant Registered Nurse experience and add Oakville as a preferred location for future matching opportunities." },
  ],
  "registered-nurse|mississauga": [
    { q: "What types of Registered Nurse opportunities can I explore in Mississauga?", a: "RN opportunities can span hospitals, long-term care, community health and specialty clinics. Review the current page for Mississauga and use areas of practice to narrow the search where relevant." },
    { q: "Can I indicate more than one area of nursing practice?", a: "Yes — select every area of practice that reflects your experience, from ICU or PACU to palliative or community health." },
    { q: "What should I compare when reviewing Registered Nurse opportunities in Mississauga?", a: "Compare the work setting, schedule, experience requirements, employment arrangement and any role-specific credentials to decide whether the opportunity fits your background." },
    { q: "Do I need to wait for a posted Registered Nurse job in Mississauga before joining Vetted?", a: "No. You can join before a matching job is posted and indicate Mississauga among the locations where you would consider Registered Nurse work." },
  ],
  "registered-nurse|hamilton": [
    { q: "What types of Registered Nurse opportunities can I explore in Hamilton?", a: "RN opportunities can span hospitals, long-term care, community health and specialty clinics. Review the current page for Hamilton and use areas of practice to narrow the search where relevant." },
    { q: "Can I indicate more than one area of nursing practice?", a: "Yes — select every area of practice that reflects your experience, from ICU or PACU to palliative or community health." },
    { q: "What should I compare when reviewing Registered Nurse opportunities in Hamilton?", a: "Compare the work setting, schedule, experience requirements, employment arrangement and any role-specific credentials to decide whether the opportunity fits your background." },
    { q: "Can I join the Registry for Registered Nurse opportunities in Hamilton if nothing is open today?", a: "Yes. You can join without waiting for a live posting and include Hamilton as a preferred location so your Registered Nurse background is available when a relevant hiring need arises." },
  ],
  "registered-nurse|ottawa": [
    { q: "What types of Registered Nurse opportunities can I explore in Ottawa?", a: "RN opportunities can span hospitals, long-term care, community health and specialty clinics. Review the current page for Ottawa and use areas of practice to narrow the search where relevant." },
    { q: "Can I indicate more than one area of nursing practice?", a: "Yes — select every area of practice that reflects your experience, from ICU or PACU to palliative or community health." },
    { q: "What should I compare when reviewing Registered Nurse opportunities in Ottawa?", a: "Compare the work setting, schedule, experience requirements, employment arrangement and any role-specific credentials to decide whether the opportunity fits your background." },
    { q: "What can I do if I do not see a current Registered Nurse opening in Ottawa?", a: "You can still join the Registry, include your relevant Registered Nurse experience and add Ottawa as a preferred location for future matching opportunities." },
  ],
  "registered-nurse|london": [
    { q: "What types of Registered Nurse opportunities can I explore in London?", a: "RN opportunities can span hospitals, long-term care, community health and specialty clinics. Review the current page for London and use areas of practice to narrow the search where relevant." },
    { q: "Can I indicate more than one area of nursing practice?", a: "Yes — select every area of practice that reflects your experience, from ICU or PACU to palliative or community health." },
    { q: "What should I compare when reviewing Registered Nurse opportunities in London?", a: "Compare the work setting, schedule, experience requirements, employment arrangement and any role-specific credentials to decide whether the opportunity fits your background." },
    { q: "Do I need to wait for a posted Registered Nurse job in London before joining Vetted?", a: "No. You can join before a matching job is posted and indicate London among the locations where you would consider Registered Nurse work." },
  ],
  "registered-nurse|burlington": [
    { q: "What types of Registered Nurse opportunities can I explore in Burlington?", a: "RN opportunities can span hospitals, long-term care, community health and specialty clinics. Review the current page for Burlington and use areas of practice to narrow the search where relevant." },
    { q: "Can I indicate more than one area of nursing practice?", a: "Yes — select every area of practice that reflects your experience, from ICU or PACU to palliative or community health." },
    { q: "What should I compare when reviewing Registered Nurse opportunities in Burlington?", a: "Compare the work setting, schedule, experience requirements, employment arrangement and any role-specific credentials to decide whether the opportunity fits your background." },
    { q: "Can I join the Registry for Registered Nurse opportunities in Burlington if nothing is open today?", a: "Yes. You can join without waiting for a live posting and include Burlington as a preferred location so your Registered Nurse background is available when a relevant hiring need arises." },
  ],
  "registered-nurse|sudbury": [
    { q: "What types of Registered Nurse opportunities can I explore in Sudbury?", a: "RN opportunities can span hospitals, long-term care, community health and specialty clinics. Review the current page for Sudbury and use areas of practice to narrow the search where relevant." },
    { q: "Can I indicate more than one area of nursing practice?", a: "Yes — select every area of practice that reflects your experience, from ICU or PACU to palliative or community health." },
    { q: "What should I compare when reviewing Registered Nurse opportunities in Sudbury?", a: "Compare the work setting, schedule, experience requirements, employment arrangement and any role-specific credentials to decide whether the opportunity fits your background." },
    { q: "What can I do if I do not see a current Registered Nurse opening in Sudbury?", a: "You can still join the Registry, include your relevant Registered Nurse experience and add Sudbury as a preferred location for future matching opportunities." },
  ],
  "registered-nurse|brampton": [
    { q: "What types of Registered Nurse opportunities can I explore in Brampton?", a: "RN opportunities can span hospitals, long-term care, community health and specialty clinics. Review the current page for Brampton and use areas of practice to narrow the search where relevant." },
    { q: "Can I indicate more than one area of nursing practice?", a: "Yes — select every area of practice that reflects your experience, from ICU or PACU to palliative or community health." },
    { q: "What should I compare when reviewing Registered Nurse opportunities in Brampton?", a: "Compare the work setting, schedule, experience requirements, employment arrangement and any role-specific credentials to decide whether the opportunity fits your background." },
    { q: "Do I need to wait for a posted Registered Nurse job in Brampton before joining Vetted?", a: "No. You can join before a matching job is posted and indicate Brampton among the locations where you would consider Registered Nurse work." },
  ],
  "registered-nurse|kingston": [
    { q: "What types of Registered Nurse opportunities can I explore in Kingston?", a: "RN opportunities can span hospitals, long-term care, community health and specialty clinics. Review the current page for Kingston and use areas of practice to narrow the search where relevant." },
    { q: "Can I indicate more than one area of nursing practice?", a: "Yes — select every area of practice that reflects your experience, from ICU or PACU to palliative or community health." },
    { q: "What should I compare when reviewing Registered Nurse opportunities in Kingston?", a: "Compare the work setting, schedule, experience requirements, employment arrangement and any role-specific credentials to decide whether the opportunity fits your background." },
    { q: "Can I join the Registry for Registered Nurse opportunities in Kingston if nothing is open today?", a: "Yes. You can join without waiting for a live posting and include Kingston as a preferred location so your Registered Nurse background is available when a relevant hiring need arises." },
  ],
  "registered-nurse|sarnia": [
    { q: "What types of Registered Nurse opportunities can I explore in Sarnia?", a: "RN opportunities can span hospitals, long-term care, community health and specialty clinics. Review the current page for Sarnia and use areas of practice to narrow the search where relevant." },
    { q: "Can I indicate more than one area of nursing practice?", a: "Yes — select every area of practice that reflects your experience, from ICU or PACU to palliative or community health." },
    { q: "What should I compare when reviewing Registered Nurse opportunities in Sarnia?", a: "Compare the work setting, schedule, experience requirements, employment arrangement and any role-specific credentials to decide whether the opportunity fits your background." },
    { q: "What can I do if I do not see a current Registered Nurse opening in Sarnia?", a: "You can still join the Registry, include your relevant Registered Nurse experience and add Sarnia as a preferred location for future matching opportunities." },
  ],
  "registered-nurse|guelph": [
    { q: "What types of Registered Nurse opportunities can I explore in Guelph?", a: "RN opportunities can span hospitals, long-term care, community health and specialty clinics. Review the current page for Guelph and use areas of practice to narrow the search where relevant." },
    { q: "Can I indicate more than one area of nursing practice?", a: "Yes — select every area of practice that reflects your experience, from ICU or PACU to palliative or community health." },
    { q: "What should I compare when reviewing Registered Nurse opportunities in Guelph?", a: "Compare the work setting, schedule, experience requirements, employment arrangement and any role-specific credentials to decide whether the opportunity fits your background." },
    { q: "Do I need to wait for a posted Registered Nurse job in Guelph before joining Vetted?", a: "No. You can join before a matching job is posted and indicate Guelph among the locations where you would consider Registered Nurse work." },
  ],
  "registered-nurse|waterloo": [
    { q: "What types of Registered Nurse opportunities can I explore in Waterloo?", a: "RN opportunities can span hospitals, long-term care, community health and specialty clinics. Review the current page for Waterloo and use areas of practice to narrow the search where relevant." },
    { q: "Can I indicate more than one area of nursing practice?", a: "Yes — select every area of practice that reflects your experience, from ICU or PACU to palliative or community health." },
    { q: "What should I compare when reviewing Registered Nurse opportunities in Waterloo?", a: "Compare the work setting, schedule, experience requirements, employment arrangement and any role-specific credentials to decide whether the opportunity fits your background." },
    { q: "Can I join the Registry for Registered Nurse opportunities in Waterloo if nothing is open today?", a: "Yes. You can join without waiting for a live posting and include Waterloo as a preferred location so your Registered Nurse background is available when a relevant hiring need arises." },
  ],
  "registered-nurse|woodstock": [
    { q: "What types of Registered Nurse opportunities can I explore in Woodstock?", a: "RN opportunities can span hospitals, long-term care, community health and specialty clinics. Review the current page for Woodstock and use areas of practice to narrow the search where relevant." },
    { q: "Can I indicate more than one area of nursing practice?", a: "Yes — select every area of practice that reflects your experience, from ICU or PACU to palliative or community health." },
    { q: "What should I compare when reviewing Registered Nurse opportunities in Woodstock?", a: "Compare the work setting, schedule, experience requirements, employment arrangement and any role-specific credentials to decide whether the opportunity fits your background." },
    { q: "What can I do if I do not see a current Registered Nurse opening in Woodstock?", a: "You can still join the Registry, include your relevant Registered Nurse experience and add Woodstock as a preferred location for future matching opportunities." },
  ],
  "registered-nurse|markham": [
    { q: "What types of Registered Nurse opportunities can I explore in Markham?", a: "RN opportunities can span hospitals, long-term care, community health and specialty clinics. Review the current page for Markham and use areas of practice to narrow the search where relevant." },
    { q: "Can I indicate more than one area of nursing practice?", a: "Yes — select every area of practice that reflects your experience, from ICU or PACU to palliative or community health." },
    { q: "What should I compare when reviewing Registered Nurse opportunities in Markham?", a: "Compare the work setting, schedule, experience requirements, employment arrangement and any role-specific credentials to decide whether the opportunity fits your background." },
    { q: "Do I need to wait for a posted Registered Nurse job in Markham before joining Vetted?", a: "No. You can join before a matching job is posted and indicate Markham among the locations where you would consider Registered Nurse work." },
  ],
  "registered-practical-nurse|st-catharines": [
    { q: "What types of RPN opportunities can I explore in St. Catharines?", a: "RPN opportunities are common across long-term care, retirement homes, hospitals and community settings." },
    { q: "What settings commonly employ Registered Practical Nurses?", a: "Long-term care and retirement homes are the largest settings, alongside hospital medical-surgical units and community care." },
    { q: "What should I compare when reviewing Registered Practical Nurse opportunities in St. Catharines?", a: "Compare the work setting, schedule, experience requirements, employment arrangement and any role-specific credentials to decide whether the opportunity fits your background." },
    { q: "Can I join the Registry for Registered Practical Nurse opportunities in St. Catharines if nothing is open today?", a: "Yes. You can join without waiting for a live posting and include St. Catharines as a preferred location so your Registered Practical Nurse background is available when a relevant hiring need arises." },
  ],
  "registered-practical-nurse|kitchener": [
    { q: "What types of RPN opportunities can I explore in Kitchener?", a: "RPN opportunities are common across long-term care, retirement homes, hospitals and community settings." },
    { q: "What settings commonly employ Registered Practical Nurses?", a: "Long-term care and retirement homes are the largest settings, alongside hospital medical-surgical units and community care." },
    { q: "What should I compare when reviewing Registered Practical Nurse opportunities in Kitchener?", a: "Compare the work setting, schedule, experience requirements, employment arrangement and any role-specific credentials to decide whether the opportunity fits your background." },
    { q: "What can I do if I do not see a current Registered Practical Nurse opening in Kitchener?", a: "You can still join the Registry, include your relevant Registered Practical Nurse experience and add Kitchener as a preferred location for future matching opportunities." },
  ],
  "registered-practical-nurse|oshawa": [
    { q: "What types of RPN opportunities can I explore in Oshawa?", a: "RPN opportunities are common across long-term care, retirement homes, hospitals and community settings." },
    { q: "What settings commonly employ Registered Practical Nurses?", a: "Long-term care and retirement homes are the largest settings, alongside hospital medical-surgical units and community care." },
    { q: "What should I compare when reviewing Registered Practical Nurse opportunities in Oshawa?", a: "Compare the work setting, schedule, experience requirements, employment arrangement and any role-specific credentials to decide whether the opportunity fits your background." },
    { q: "Do I need to wait for a posted Registered Practical Nurse job in Oshawa before joining Vetted?", a: "No. You can join before a matching job is posted and indicate Oshawa among the locations where you would consider Registered Practical Nurse work." },
  ],
  "personal-support-worker|vaughan": [
    { q: "What types of PSW opportunities can I explore in Vaughan?", a: "PSW roles are common in long-term care, retirement homes, home care and community support." },
    { q: "What settings commonly employ PSWs?", a: "Long-term care and retirement homes are the most common, alongside home care and community support agencies." },
    { q: "What should I compare when reviewing Personal Support Worker opportunities in Vaughan?", a: "Compare the work setting, schedule, experience requirements, employment arrangement and any role-specific credentials to decide whether the opportunity fits your background." },
    { q: "Can I join the Registry for Personal Support Worker opportunities in Vaughan if nothing is open today?", a: "Yes. You can join without waiting for a live posting and include Vaughan as a preferred location so your Personal Support Worker background is available when a relevant hiring need arises." },
  ],
  "personal-support-worker|whitby": [
    { q: "What types of PSW opportunities can I explore in Whitby?", a: "PSW roles are common in long-term care, retirement homes, home care and community support." },
    { q: "What settings commonly employ PSWs?", a: "Long-term care and retirement homes are the most common, alongside home care and community support agencies." },
    { q: "What should I compare when reviewing Personal Support Worker opportunities in Whitby?", a: "Compare the work setting, schedule, experience requirements, employment arrangement and any role-specific credentials to decide whether the opportunity fits your background." },
    { q: "What can I do if I do not see a current Personal Support Worker opening in Whitby?", a: "You can still join the Registry, include your relevant Personal Support Worker experience and add Whitby as a preferred location for future matching opportunities." },
  ],
  "personal-support-worker|niagara-falls": [
    { q: "What types of PSW opportunities can I explore in Niagara Falls?", a: "PSW roles are common in long-term care, retirement homes, home care and community support." },
    { q: "What settings commonly employ PSWs?", a: "Long-term care and retirement homes are the most common, alongside home care and community support agencies." },
    { q: "What should I compare when reviewing Personal Support Worker opportunities in Niagara Falls?", a: "Compare the work setting, schedule, experience requirements, employment arrangement and any role-specific credentials to decide whether the opportunity fits your background." },
    { q: "Do I need to wait for a posted Personal Support Worker job in Niagara Falls before joining Vetted?", a: "No. You can join before a matching job is posted and indicate Niagara Falls among the locations where you would consider Personal Support Worker work." },
  ],
  "nurse-practitioner|mississauga": [
    { q: "What types of Nurse Practitioner opportunities can I explore in Mississauga?", a: "Nurse Practitioner opportunities can span primary care, family health teams, community health, specialty clinics and other clinical settings depending on your area of practice." },
    { q: "What settings do Nurse Practitioners commonly work in?", a: "Nurse Practitioners may work in primary care clinics, community health centres, family health teams, hospitals and specialty practices." },
    { q: "What should I compare when reviewing Nurse Practitioner opportunities in Mississauga?", a: "Compare the work setting, schedule, experience requirements, employment arrangement and any role-specific credentials to decide whether the opportunity fits your background." },
    { q: "Can I join the Registry for Nurse Practitioner opportunities in Mississauga if nothing is open today?", a: "Yes. You can join without waiting for a live posting and include Mississauga as a preferred location so your Nurse Practitioner background is available when a relevant hiring need arises." },
  ],
  "nurse-practitioner|oshawa": [
    { q: "What types of Nurse Practitioner opportunities can I explore in Oshawa?", a: "Nurse Practitioner opportunities can span primary care, family health teams, community health, specialty clinics and other clinical settings depending on your area of practice." },
    { q: "What settings do Nurse Practitioners commonly work in?", a: "Nurse Practitioners may work in primary care clinics, community health centres, family health teams, hospitals and specialty practices." },
    { q: "What should I compare when reviewing Nurse Practitioner opportunities in Oshawa?", a: "Compare the work setting, schedule, experience requirements, employment arrangement and any role-specific credentials to decide whether the opportunity fits your background." },
    { q: "What can I do if I do not see a current Nurse Practitioner opening in Oshawa?", a: "You can still join the Registry, include your relevant Nurse Practitioner experience and add Oshawa as a preferred location for future matching opportunities." },
  ],
  "nurse-practitioner|toronto": [
    { q: "What types of Nurse Practitioner opportunities can I explore in Toronto?", a: "Nurse Practitioner opportunities can span primary care, family health teams, community health, specialty clinics and other clinical settings depending on your area of practice." },
    { q: "What settings do Nurse Practitioners commonly work in?", a: "Nurse Practitioners may work in primary care clinics, community health centres, family health teams, hospitals and specialty practices." },
    { q: "What should I compare when reviewing Nurse Practitioner opportunities in Toronto?", a: "Compare the work setting, schedule, experience requirements, employment arrangement and any role-specific credentials to decide whether the opportunity fits your background." },
    { q: "Do I need to wait for a posted Nurse Practitioner job in Toronto before joining Vetted?", a: "No. You can join before a matching job is posted and indicate Toronto among the locations where you would consider Nurse Practitioner work." },
  ],
  "physiotherapist|cambridge": [
    { q: "What types of Physiotherapist opportunities can I explore in Cambridge?", a: "Physiotherapist roles can span hospitals, outpatient rehabilitation, private clinics, community care and other rehabilitation settings." },
    { q: "What areas of Physiotherapy experience should I highlight?", a: "Highlight the patient populations and treatment areas you have worked in, such as orthopaedic, neurological, sports, geriatric, paediatric or post-surgical rehabilitation." },
    { q: "What should I compare when reviewing Physiotherapist opportunities in Cambridge?", a: "Compare the work setting, schedule, experience requirements, employment arrangement and any role-specific credentials to decide whether the opportunity fits your background." },
    { q: "Can I join the Registry for Physiotherapist opportunities in Cambridge if nothing is open today?", a: "Yes. You can join without waiting for a live posting and include Cambridge as a preferred location so your Physiotherapist background is available when a relevant hiring need arises." },
  ],
  "occupational-therapist|milton": [
    { q: "What types of Occupational Therapist opportunities can I explore in Milton?", a: "Occupational Therapist roles can span hospitals, rehabilitation, community care, home health, mental health and paediatric settings." },
    { q: "What areas of Occupational Therapy experience are useful to highlight?", a: "Highlight the populations and practice areas you have worked in, such as physical rehabilitation, neurological rehabilitation, mental health, paediatrics or geriatrics." },
    { q: "What should I compare when reviewing Occupational Therapist opportunities in Milton?", a: "Compare the work setting, schedule, experience requirements, employment arrangement and any role-specific credentials to decide whether the opportunity fits your background." },
    { q: "What can I do if I do not see a current Occupational Therapist opening in Milton?", a: "You can still join the Registry, include your relevant Occupational Therapist experience and add Milton as a preferred location for future matching opportunities." },
  ],
  "psychologist|richmond-hill": [
    { q: "What types of Psychologist opportunities can I explore in Richmond Hill?", a: "Psychologist opportunities can span hospitals, mental health clinics, rehabilitation settings, community programs and private practice." },
    { q: "What areas of psychology experience are useful to highlight?", a: "Highlight your authorized areas of practice, client populations, assessment experience, treatment background and any specialty areas relevant to the type of role you are seeking." },
    { q: "What should I compare when reviewing Psychologist opportunities in Richmond Hill?", a: "Compare the work setting, schedule, experience requirements, employment arrangement and any role-specific credentials to decide whether the opportunity fits your background." },
    { q: "Do I need to wait for a posted Psychologist job in Richmond Hill before joining Vetted?", a: "No. You can join before a matching job is posted and indicate Richmond Hill among the locations where you would consider Psychologist work." },
  ],
  "psychologist|brockville": [
    { q: "What types of Psychologist opportunities can I explore in Brockville?", a: "Psychologist opportunities can span hospitals, mental health clinics, rehabilitation settings, community programs and private practice." },
    { q: "What areas of psychology experience are useful to highlight?", a: "Highlight your authorized areas of practice, client populations, assessment experience, treatment background and any specialty areas relevant to the type of role you are seeking." },
    { q: "What should I compare when reviewing Psychologist opportunities in Brockville?", a: "Compare the work setting, schedule, experience requirements, employment arrangement and any role-specific credentials to decide whether the opportunity fits your background." },
    { q: "Can I join the Registry for Psychologist opportunities in Brockville if nothing is open today?", a: "Yes. You can join without waiting for a live posting and include Brockville as a preferred location so your Psychologist background is available when a relevant hiring need arises." },
  ],
  "medical-office-assistant|barrie": [
    { q: "What types of Medical Office Assistant opportunities can I explore in Barrie?", a: "MOA roles are common in family medicine clinics, specialist offices, walk-in clinics and hospital departments." },
    { q: "What administrative skills are relevant for MOA roles?", a: "Patient registration, scheduling, OHIP billing and medical records experience are all common employer criteria." },
    { q: "What should I compare when reviewing Medical Office Assistant opportunities in Barrie?", a: "Compare the work setting, schedule, experience requirements, employment arrangement and any role-specific credentials to decide whether the opportunity fits your background." },
    { q: "What can I do if I do not see a current Medical Office Assistant opening in Barrie?", a: "You can still join the Registry, include your relevant Medical Office Assistant experience and add Barrie as a preferred location for future matching opportunities." },
  ],
  "medical-office-assistant|st-catharines": [
    { q: "What types of Medical Office Assistant opportunities can I explore in St. Catharines?", a: "MOA roles are common in family medicine clinics, specialist offices, walk-in clinics and hospital departments." },
    { q: "What administrative skills are relevant for MOA roles?", a: "Patient registration, scheduling, OHIP billing and medical records experience are all common employer criteria." },
    { q: "What should I compare when reviewing Medical Office Assistant opportunities in St. Catharines?", a: "Compare the work setting, schedule, experience requirements, employment arrangement and any role-specific credentials to decide whether the opportunity fits your background." },
    { q: "Do I need to wait for a posted Medical Office Assistant job in St. Catharines before joining Vetted?", a: "No. You can join before a matching job is posted and indicate St. Catharines among the locations where you would consider Medical Office Assistant work." },
  ],
  "medical-office-assistant|waterloo": [
    { q: "What types of Medical Office Assistant opportunities can I explore in Waterloo?", a: "MOA roles are common in family medicine clinics, specialist offices, walk-in clinics and hospital departments." },
    { q: "What administrative skills are relevant for MOA roles?", a: "Patient registration, scheduling, OHIP billing and medical records experience are all common employer criteria." },
    { q: "What should I compare when reviewing Medical Office Assistant opportunities in Waterloo?", a: "Compare the work setting, schedule, experience requirements, employment arrangement and any role-specific credentials to decide whether the opportunity fits your background." },
    { q: "Can I join the Registry for Medical Office Assistant opportunities in Waterloo if nothing is open today?", a: "Yes. You can join without waiting for a live posting and include Waterloo as a preferred location so your Medical Office Assistant background is available when a relevant hiring need arises." },
  ],
  "medical-office-assistant|london": [
    { q: "What types of Medical Office Assistant opportunities can I explore in London?", a: "MOA roles are common in family medicine clinics, specialist offices, walk-in clinics and hospital departments." },
    { q: "What administrative skills are relevant for MOA roles?", a: "Patient registration, scheduling, OHIP billing and medical records experience are all common employer criteria." },
    { q: "What should I compare when reviewing Medical Office Assistant opportunities in London?", a: "Compare the work setting, schedule, experience requirements, employment arrangement and any role-specific credentials to decide whether the opportunity fits your background." },
    { q: "What can I do if I do not see a current Medical Office Assistant opening in London?", a: "You can still join the Registry, include your relevant Medical Office Assistant experience and add London as a preferred location for future matching opportunities." },
  ],
  "child-and-youth-care-practitioner|belleville": [
    { q: "What types of CYCP opportunities can I explore in Belleville?", a: "Child and Youth Care Practitioner work may be found in residential, school, community and mental health settings supporting children, youth and families." },
    { q: "Will Child and Youth Worker or CYW job titles still be relevant to my search?", a: "Yes. Employers may continue to use Child and Youth Worker or CYW language, while Vetted routes that profession intent to Child and Youth Care Practitioner." },
    { q: "What experience should I highlight for CYCP roles in Belleville?", a: "Highlight the populations and age groups you have supported and experience in residential care, schools, community programs, mental health, crisis or behavioural support." },
    { q: "Can I join for Belleville CYCP opportunities if nothing is open today?", a: "Yes. Add your Child and Youth Care Practitioner background and Belleville as a preferred location so you can be discoverable for future hiring needs." },
  ],
  "dietary-aide|collingwood": [
    { q: "What types of Dietary Aide opportunities can I explore in Collingwood?", a: "Dietary Aide roles are common in long-term care, hospital and retirement home kitchens." },
    { q: "Is a Food Handler Certificate required for Dietary Aide roles?", a: "Many employers look for it, along with Safe Food Handling training." },
    { q: "What should I compare when reviewing Dietary Aide opportunities in Collingwood?", a: "Compare the work setting, schedule, experience requirements, employment arrangement and any role-specific credentials to decide whether the opportunity fits your background." },
    { q: "Can I join the Registry for Dietary Aide opportunities in Collingwood if nothing is open today?", a: "Yes. You can join without waiting for a live posting and include Collingwood as a preferred location so your Dietary Aide background is available when a relevant hiring need arises." },
  ],
  "dietary-aide|toronto": [
    { q: "What types of Dietary Aide opportunities can I explore in Toronto?", a: "Dietary Aide roles are common in long-term care, hospital and retirement home kitchens." },
    { q: "Is a Food Handler Certificate required for Dietary Aide roles?", a: "Many employers look for it, along with Safe Food Handling training." },
    { q: "What should I compare when reviewing Dietary Aide opportunities in Toronto?", a: "Compare the work setting, schedule, experience requirements, employment arrangement and any role-specific credentials to decide whether the opportunity fits your background." },
    { q: "What can I do if I do not see a current Dietary Aide opening in Toronto?", a: "You can still join the Registry, include your relevant Dietary Aide experience and add Toronto as a preferred location for future matching opportunities." },
  ],
  "dietary-aide|mississauga": [
    { q: "What types of Dietary Aide opportunities can I explore in Mississauga?", a: "Dietary Aide roles are common in long-term care, hospital and retirement home kitchens." },
    { q: "Is a Food Handler Certificate required for Dietary Aide roles?", a: "Many employers look for it, along with Safe Food Handling training." },
    { q: "What should I compare when reviewing Dietary Aide opportunities in Mississauga?", a: "Compare the work setting, schedule, experience requirements, employment arrangement and any role-specific credentials to decide whether the opportunity fits your background." },
    { q: "Do I need to wait for a posted Dietary Aide job in Mississauga before joining Vetted?", a: "No. You can join before a matching job is posted and indicate Mississauga among the locations where you would consider Dietary Aide work." },
  ],
  "dietary-aide|waterloo": [
    { q: "What types of Dietary Aide opportunities can I explore in Waterloo?", a: "Dietary Aide roles are common in long-term care, hospital and retirement home kitchens." },
    { q: "Is a Food Handler Certificate required for Dietary Aide roles?", a: "Many employers look for it, along with Safe Food Handling training." },
    { q: "What should I compare when reviewing Dietary Aide opportunities in Waterloo?", a: "Compare the work setting, schedule, experience requirements, employment arrangement and any role-specific credentials to decide whether the opportunity fits your background." },
    { q: "Can I join the Registry for Dietary Aide opportunities in Waterloo if nothing is open today?", a: "Yes. You can join without waiting for a live posting and include Waterloo as a preferred location so your Dietary Aide background is available when a relevant hiring need arises." },
  ],
  "cook|milton": [
    { q: "What types of Cook opportunities can I explore in Milton?", a: "Cook roles are common in long-term care, hospital and retirement home food service, including therapeutic and texture-modified diets." },
    { q: "What credentials are relevant for healthcare food service Cook roles?", a: "Food Handler Certification and Red Seal (where held) are common." },
    { q: "What should I compare when reviewing Cook opportunities in Milton?", a: "Compare the work setting, schedule, experience requirements, employment arrangement and any role-specific credentials to decide whether the opportunity fits your background." },
    { q: "What can I do if I do not see a current Cook opening in Milton?", a: "You can still join the Registry, include your relevant Cook experience and add Milton as a preferred location for future matching opportunities." },
  ],
  "cook|vaughan": [
    { q: "What types of Cook opportunities can I explore in Vaughan?", a: "Cook roles are common in long-term care, hospital and retirement home food service, including therapeutic and texture-modified diets." },
    { q: "What credentials are relevant for healthcare food service Cook roles?", a: "Food Handler Certification and Red Seal (where held) are common." },
    { q: "What should I compare when reviewing Cook opportunities in Vaughan?", a: "Compare the work setting, schedule, experience requirements, employment arrangement and any role-specific credentials to decide whether the opportunity fits your background." },
    { q: "Do I need to wait for a posted Cook job in Vaughan before joining Vetted?", a: "No. You can join before a matching job is posted and indicate Vaughan among the locations where you would consider Cook work." },
  ],
  "cook|mississauga": [
    { q: "What types of Cook opportunities can I explore in Mississauga?", a: "Cook roles are common in long-term care, hospital and retirement home food service, including therapeutic and texture-modified diets." },
    { q: "What credentials are relevant for healthcare food service Cook roles?", a: "Food Handler Certification and Red Seal (where held) are common." },
    { q: "What should I compare when reviewing Cook opportunities in Mississauga?", a: "Compare the work setting, schedule, experience requirements, employment arrangement and any role-specific credentials to decide whether the opportunity fits your background." },
    { q: "Can I join the Registry for Cook opportunities in Mississauga if nothing is open today?", a: "Yes. You can join without waiting for a live posting and include Mississauga as a preferred location so your Cook background is available when a relevant hiring need arises." },
  ],
  "registered-social-service-worker|toronto": [
    { q: "How is a Registered Social Service Worker different from a Registered Social Worker?", a: "RSSW and RSW are distinct, separately regulated roles under the OCSWSSW — RSSW roles are typically frontline community and social-service support rather than clinical social work." },
    { q: "What settings commonly employ RSSWs?", a: "Community agencies, healthcare-adjacent programs and social-service organizations are common settings." },
    { q: "What should I compare when reviewing Registered Social Service Worker opportunities in Toronto?", a: "Compare the work setting, schedule, experience requirements, employment arrangement and any role-specific credentials to decide whether the opportunity fits your background." },
    { q: "What can I do if I do not see a current Registered Social Service Worker opening in Toronto?", a: "You can still join the Registry, include your relevant Registered Social Service Worker experience and add Toronto as a preferred location for future matching opportunities." },
  ],
  "registered-social-service-worker|mississauga": [
    { q: "How is a Registered Social Service Worker different from a Registered Social Worker?", a: "RSSW and RSW are distinct, separately regulated roles under the OCSWSSW — RSSW roles are typically frontline community and social-service support rather than clinical social work." },
    { q: "What settings commonly employ RSSWs?", a: "Community agencies, healthcare-adjacent programs and social-service organizations are common settings." },
    { q: "What should I compare when reviewing Registered Social Service Worker opportunities in Mississauga?", a: "Compare the work setting, schedule, experience requirements, employment arrangement and any role-specific credentials to decide whether the opportunity fits your background." },
    { q: "Do I need to wait for a posted Registered Social Service Worker job in Mississauga before joining Vetted?", a: "No. You can join before a matching job is posted and indicate Mississauga among the locations where you would consider Registered Social Service Worker work." },
  ],
  "registered-social-worker|hamilton": [
    { q: "What types of Registered Social Worker opportunities can I explore in Hamilton?", a: "RSW roles span hospitals, community mental health programs, rehabilitation settings and private practice, working with a range of populations and needs." },
    { q: "What healthcare settings commonly employ Registered Social Workers?", a: "Hospitals, community health centres, mental health agencies and rehabilitation programs are common settings." },
    { q: "What should I compare when reviewing Registered Social Worker opportunities in Hamilton?", a: "Compare the work setting, schedule, experience requirements, employment arrangement and any role-specific credentials to decide whether the opportunity fits your background." },
    { q: "Can I join the Registry for Registered Social Worker opportunities in Hamilton if nothing is open today?", a: "Yes. You can join without waiting for a live posting and include Hamilton as a preferred location so your Registered Social Worker background is available when a relevant hiring need arises." },
  ],
  "registered-social-worker|oshawa": [
    { q: "What types of Registered Social Worker opportunities can I explore in Oshawa?", a: "RSW roles span hospitals, community mental health programs, rehabilitation settings and private practice, working with a range of populations and needs." },
    { q: "What healthcare settings commonly employ Registered Social Workers?", a: "Hospitals, community health centres, mental health agencies and rehabilitation programs are common settings." },
    { q: "What should I compare when reviewing Registered Social Worker opportunities in Oshawa?", a: "Compare the work setting, schedule, experience requirements, employment arrangement and any role-specific credentials to decide whether the opportunity fits your background." },
    { q: "What can I do if I do not see a current Registered Social Worker opening in Oshawa?", a: "You can still join the Registry, include your relevant Registered Social Worker experience and add Oshawa as a preferred location for future matching opportunities." },
  ],
  "registered-social-worker|waterloo": [
    { q: "What types of Registered Social Worker opportunities can I explore in Waterloo?", a: "RSW roles span hospitals, community mental health programs, rehabilitation settings and private practice, working with a range of populations and needs." },
    { q: "What healthcare settings commonly employ Registered Social Workers?", a: "Hospitals, community health centres, mental health agencies and rehabilitation programs are common settings." },
    { q: "What should I compare when reviewing Registered Social Worker opportunities in Waterloo?", a: "Compare the work setting, schedule, experience requirements, employment arrangement and any role-specific credentials to decide whether the opportunity fits your background." },
    { q: "Do I need to wait for a posted Registered Social Worker job in Waterloo before joining Vetted?", a: "No. You can join before a matching job is posted and indicate Waterloo among the locations where you would consider Registered Social Worker work." },
  ],
  "unregulated-care-provider|toronto": [
    { q: "Who is a good fit for the Unregulated Care Provider category?", a: "Internationally-educated nurses awaiting Ontario registration, and nursing or PSW students building Ontario care experience." },
    { q: "What kind of work can I find as a UCP?", a: "Direct care support roles across long-term care, retirement homes and community settings." },
    { q: "What should I compare when reviewing Unregulated Care Provider opportunities in Toronto?", a: "Compare the work setting, schedule, experience requirements, employment arrangement and any role-specific credentials to decide whether the opportunity fits your background." },
    { q: "Can I join the Registry for Unregulated Care Provider opportunities in Toronto if nothing is open today?", a: "Yes. You can join without waiting for a live posting and include Toronto as a preferred location so your Unregulated Care Provider background is available when a relevant hiring need arises." },
  ],
  "unregulated-care-provider|mississauga": [
    { q: "Who is a good fit for the Unregulated Care Provider category?", a: "Internationally-educated nurses awaiting Ontario registration, and nursing or PSW students building Ontario care experience." },
    { q: "What kind of work can I find as a UCP?", a: "Direct care support roles across long-term care, retirement homes and community settings." },
    { q: "What should I compare when reviewing Unregulated Care Provider opportunities in Mississauga?", a: "Compare the work setting, schedule, experience requirements, employment arrangement and any role-specific credentials to decide whether the opportunity fits your background." },
    { q: "What can I do if I do not see a current Unregulated Care Provider opening in Mississauga?", a: "You can still join the Registry, include your relevant Unregulated Care Provider experience and add Mississauga as a preferred location for future matching opportunities." },
  ],
  "housekeeper|mississauga": [
    { q: "How is healthcare housekeeping different from general commercial cleaning?", a: "Healthcare housekeeping typically follows infection-prevention and environmental-services protocols specific to resident and patient care areas, alongside standard cleaning duties." },
    { q: "What settings commonly employ healthcare Housekeepers?", a: "Long-term care homes, retirement homes and hospitals are the most common settings." },
    { q: "What should I compare when reviewing Housekeeper opportunities in Mississauga?", a: "Compare the work setting, schedule, experience requirements, employment arrangement and any role-specific credentials to decide whether the opportunity fits your background." },
    { q: "Do I need to wait for a posted Housekeeper job in Mississauga before joining Vetted?", a: "No. You can join before a matching job is posted and indicate Mississauga among the locations where you would consider Housekeeper work." },
  ],
  "housekeeper|toronto": [
    { q: "How is healthcare housekeeping different from general commercial cleaning?", a: "Healthcare housekeeping typically follows infection-prevention and environmental-services protocols specific to resident and patient care areas, alongside standard cleaning duties." },
    { q: "What settings commonly employ healthcare Housekeepers?", a: "Long-term care homes, retirement homes and hospitals are the most common settings." },
    { q: "What should I compare when reviewing Housekeeper opportunities in Toronto?", a: "Compare the work setting, schedule, experience requirements, employment arrangement and any role-specific credentials to decide whether the opportunity fits your background." },
    { q: "Can I join the Registry for Housekeeper opportunities in Toronto if nothing is open today?", a: "Yes. You can join without waiting for a live posting and include Toronto as a preferred location so your Housekeeper background is available when a relevant hiring need arises." },
  ],
  "housekeeper|brampton": [
    { q: "How is healthcare housekeeping different from general commercial cleaning?", a: "Healthcare housekeeping typically follows infection-prevention and environmental-services protocols specific to resident and patient care areas, alongside standard cleaning duties." },
    { q: "What settings commonly employ healthcare Housekeepers?", a: "Long-term care homes, retirement homes and hospitals are the most common settings." },
    { q: "What should I compare when reviewing Housekeeper opportunities in Brampton?", a: "Compare the work setting, schedule, experience requirements, employment arrangement and any role-specific credentials to decide whether the opportunity fits your background." },
    { q: "What can I do if I do not see a current Housekeeper opening in Brampton?", a: "You can still join the Registry, include your relevant Housekeeper experience and add Brampton as a preferred location for future matching opportunities." },
  ],
  "scheduling-coordinator|mississauga": [
    { q: "What does a healthcare Scheduling Coordinator typically do?", a: "Manages staffing desks and shift coverage for healthcare employers — filling call-outs, coordinating float staff and keeping schedules covered day to day." },
    { q: "Is experience with scheduling software relevant for these roles?", a: "Many employers look for it — note the specific scheduling or staffing systems you've used." },
    { q: "What should I compare when reviewing Scheduling Coordinator opportunities in Mississauga?", a: "Compare the work setting, schedule, experience requirements, employment arrangement and any role-specific credentials to decide whether the opportunity fits your background." },
    { q: "Do I need to wait for a posted Scheduling Coordinator job in Mississauga before joining Vetted?", a: "No. You can join before a matching job is posted and indicate Mississauga among the locations where you would consider Scheduling Coordinator work." },
  ],
  "scheduling-coordinator|hamilton": [
    { q: "What does a healthcare Scheduling Coordinator typically do?", a: "Manages staffing desks and shift coverage for healthcare employers — filling call-outs, coordinating float staff and keeping schedules covered day to day." },
    { q: "Is experience with scheduling software relevant for these roles?", a: "Many employers look for it — note the specific scheduling or staffing systems you've used." },
    { q: "What should I compare when reviewing Scheduling Coordinator opportunities in Hamilton?", a: "Compare the work setting, schedule, experience requirements, employment arrangement and any role-specific credentials to decide whether the opportunity fits your background." },
    { q: "Can I join the Registry for Scheduling Coordinator opportunities in Hamilton if nothing is open today?", a: "Yes. You can join without waiting for a live posting and include Hamilton as a preferred location so your Scheduling Coordinator background is available when a relevant hiring need arises." },
  ],
  "scheduling-coordinator|st-catharines": [
    { q: "What does a healthcare Scheduling Coordinator typically do?", a: "Manages staffing desks and shift coverage for healthcare employers — filling call-outs, coordinating float staff and keeping schedules covered day to day." },
    { q: "Is experience with scheduling software relevant for these roles?", a: "Many employers look for it — note the specific scheduling or staffing systems you've used." },
    { q: "What should I compare when reviewing Scheduling Coordinator opportunities in St. Catharines?", a: "Compare the work setting, schedule, experience requirements, employment arrangement and any role-specific credentials to decide whether the opportunity fits your background." },
    { q: "What can I do if I do not see a current Scheduling Coordinator opening in St. Catharines?", a: "You can still join the Registry, include your relevant Scheduling Coordinator experience and add St. Catharines as a preferred location for future matching opportunities." },
  ],
  "scheduling-coordinator|waterloo": [
    { q: "What does a healthcare Scheduling Coordinator typically do?", a: "Manages staffing desks and shift coverage for healthcare employers — filling call-outs, coordinating float staff and keeping schedules covered day to day." },
    { q: "Is experience with scheduling software relevant for these roles?", a: "Many employers look for it — note the specific scheduling or staffing systems you've used." },
    { q: "What should I compare when reviewing Scheduling Coordinator opportunities in Waterloo?", a: "Compare the work setting, schedule, experience requirements, employment arrangement and any role-specific credentials to decide whether the opportunity fits your background." },
    { q: "Do I need to wait for a posted Scheduling Coordinator job in Waterloo before joining Vetted?", a: "No. You can join before a matching job is posted and indicate Waterloo among the locations where you would consider Scheduling Coordinator work." },
  ],
  "developmental-services-worker|oshawa": [
    { q: "What types of DSW opportunities can I explore in Oshawa?", a: "DSW roles support people with intellectual and developmental disabilities across residential, day program and community settings." },
    { q: "Can I indicate my areas of DSW experience?", a: "Yes — select areas such as autism support, dual diagnosis or community living when you join." },
    { q: "What should I compare when reviewing Developmental Services Worker opportunities in Oshawa?", a: "Compare the work setting, schedule, experience requirements, employment arrangement and any role-specific credentials to decide whether the opportunity fits your background." },
    { q: "Can I join the Registry for Developmental Services Worker opportunities in Oshawa if nothing is open today?", a: "Yes. You can join without waiting for a live posting and include Oshawa as a preferred location so your Developmental Services Worker background is available when a relevant hiring need arises." },
  ],
  "developmental-services-worker|st-catharines": [
    { q: "What types of DSW opportunities can I explore in St. Catharines?", a: "DSW roles support people with intellectual and developmental disabilities across residential, day program and community settings." },
    { q: "Can I indicate my areas of DSW experience?", a: "Yes — select areas such as autism support, dual diagnosis or community living when you join." },
    { q: "What should I compare when reviewing Developmental Services Worker opportunities in St. Catharines?", a: "Compare the work setting, schedule, experience requirements, employment arrangement and any role-specific credentials to decide whether the opportunity fits your background." },
    { q: "What can I do if I do not see a current Developmental Services Worker opening in St. Catharines?", a: "You can still join the Registry, include your relevant Developmental Services Worker experience and add St. Catharines as a preferred location for future matching opportunities." },
  ],

  // ---- v19 reconciliation: 11 new-market literal FAQ sets ----
  "medical-administrative-assistant|london": [
    { q: "What types of Medical Administrative Assistant work can I explore in London?", a: "Medical Administrative Assistant opportunities may involve scheduling, records, correspondence, referrals and administrative coordination within healthcare services." },
    { q: "What experience should I highlight for MAA opportunities in London?", a: "Highlight healthcare administration experience, the medical systems or software you have used and responsibilities such as scheduling, records, referrals or office coordination." },
    { q: "What should I compare when reviewing Medical Administrative Assistant opportunities in London?", a: "Compare the work setting, schedule, responsibilities, experience requirements and employment arrangement to determine whether the role matches your background." },
    { q: "What can I do if there is no current MAA opening in London?", a: "You can still join the Registry and include London as a preferred location so your Medical Administrative Assistant background is available for future hiring needs." },
  ],
  "medical-administrative-assistant|waterloo": [
    { q: "What skills are useful for Medical Administrative Assistant opportunities in Waterloo?", a: "Healthcare scheduling, records, referrals, correspondence, office coordination and experience with medical systems or software can all be relevant depending on the role." },
    { q: "Should I search both MAA and Medical Administrative Assistant job titles?", a: "Yes. Employers may use the full title or MAA abbreviation, and some postings may use related medical-administration wording." },
    { q: "What should I review before responding to an MAA opportunity in Waterloo?", a: "Review the duties, work setting, required experience, schedule and employment arrangement rather than relying on the job title alone." },
    { q: "Can I join Vetted for Waterloo MAA opportunities before one is posted?", a: "Yes. You can join the Registry and indicate Waterloo among the locations where you would consider Medical Administrative Assistant work." },
  ],
  "medical-administrative-assistant|st-catharines": [
    { q: "What types of responsibilities can appear in Medical Administrative Assistant roles in St. Catharines?", a: "Responsibilities may include scheduling, records, referrals, correspondence and administrative coordination, depending on the healthcare employer." },
    { q: "What background should I highlight for MAA opportunities?", a: "Highlight healthcare administration experience and the systems, workflows and administrative responsibilities you have handled in previous roles." },
    { q: "How should I evaluate an MAA opportunity in St. Catharines?", a: "Look at the actual duties, work setting, hours, employment arrangement and required experience because administrative titles can vary between employers." },
    { q: "Do I need to wait for a posted MAA job in St. Catharines before joining?", a: "No. You can join the Registry now and identify St. Catharines as a preferred location for future Medical Administrative Assistant opportunities." },
  ],
  "child-and-youth-care-practitioner|toronto": [
    { q: "What settings can employ Child and Youth Care Practitioners in Toronto?", a: "CYCP opportunities may exist across residential programs, schools, community services and mental health settings." },
    { q: "Should I include Child and Youth Worker experience on my CYCP profile?", a: "Yes. If that work reflects your actual child and youth care background, include the role and the populations, settings and responsibilities you supported." },
    { q: "What should I compare when reviewing CYCP opportunities in Toronto?", a: "Compare the population served, setting, schedule, responsibilities, experience requirements and employment arrangement." },
    { q: "Can I join Vetted before a Toronto CYCP role is posted?", a: "Yes. You can join the Registry now and indicate Toronto as a preferred location for Child and Youth Care Practitioner opportunities." },
  ],
  "child-and-youth-care-practitioner|mississauga": [
    { q: "What experience is useful for CYCP opportunities in Mississauga?", a: "Relevant experience may include supporting children or youth in residential care, schools, community programs, mental health, crisis intervention or behavioural-support settings." },
    { q: "Do CYW and CYCP searches lead to different profession pools?", a: "No. Child and Youth Worker and CYW are recognized candidate-facing terms for the one Child and Youth Care Practitioner profession." },
    { q: "What should I look for in a Mississauga child and youth care opportunity?", a: "Review the age group or population served, work setting, duties, schedule and experience requirements to see whether the role matches your background." },
    { q: "What if I do not see a current CYCP opening in Mississauga?", a: "You can still join the Registry and include Mississauga as a preferred location for future Child and Youth Care Practitioner hiring needs." },
  ],
  "registered-social-worker|london": [
    { q: "What types of Registered Social Worker opportunities can I explore in London?", a: "RSW opportunities can span healthcare, mental health, community services and other social-work settings, with responsibilities varying by employer and population." },
    { q: "What social-work experience should I highlight for London opportunities?", a: "Highlight the populations, settings and areas of practice supported by your actual work history, along with relevant clinical, community or healthcare experience." },
    { q: "What should I compare when reviewing RSW opportunities in London?", a: "Compare the setting, population served, role responsibilities, schedule, employment arrangement and experience requirements." },
    { q: "Can I join the Registry for London RSW opportunities before a job is open?", a: "Yes. You can join now and include London as a preferred location so your Registered Social Worker profile can be available for future hiring needs." },
  ],
  "registered-social-worker|st-catharines": [
    { q: "What settings may hire Registered Social Workers in St. Catharines?", a: "Opportunities can span healthcare, mental health, community and social-service settings depending on employer needs." },
    { q: "What should I include when describing my RSW background?", a: "Include the populations, settings and areas of social-work practice you have actually supported, along with relevant clinical or community responsibilities." },
    { q: "How should I evaluate an RSW opportunity in St. Catharines?", a: "Review the setting, population, responsibilities, work arrangement and experience requirements rather than relying on title alone." },
    { q: "What can I do if there is no current RSW opening in St. Catharines?", a: "Join the Registry and add St. Catharines as a preferred location so your Registered Social Worker background is available when a relevant need arises." },
  ],
  "scheduling-coordinator|oshawa": [
    { q: "What does a healthcare Scheduling Coordinator typically do?", a: "Scheduling Coordinators may manage staffing desks, shift coverage, call-outs and day-to-day schedule changes for healthcare services." },
    { q: "What experience should I highlight for Scheduling Coordinator opportunities in Oshawa?", a: "Highlight healthcare scheduling or staffing experience, high-volume coordination, call-out coverage and the scheduling systems or software you have used." },
    { q: "What should I compare when reviewing Scheduling Coordinator roles in Oshawa?", a: "Compare the schedule, work setting, staffing responsibilities, software expectations and employment arrangement." },
    { q: "Can I join Vetted before an Oshawa Scheduling Coordinator role is posted?", a: "Yes. Add your Scheduling Coordinator background and Oshawa as a preferred location so your profile is available for future hiring needs." },
  ],
  "housekeeper|london": [
    { q: "How is healthcare housekeeping different from general commercial cleaning?", a: "Healthcare housekeeping can involve environmental-services and infection-prevention expectations specific to resident and patient care settings in addition to routine cleaning duties." },
    { q: "What healthcare settings may employ Housekeepers in London?", a: "Housekeeping opportunities may occur in healthcare settings such as long-term care, retirement and hospital environments depending on employer needs." },
    { q: "What experience should I highlight for healthcare Housekeeper opportunities?", a: "Highlight healthcare or institutional cleaning experience, environmental-services responsibilities and the types of resident or patient-care settings in which you have worked." },
    { q: "Can I join for London Housekeeper opportunities if nothing is open today?", a: "Yes. You can join the Registry and include London as a preferred location so your Housekeeper background is available for future hiring needs." },
  ],
  "nurse-practitioner|oakville": [
    { q: "What types of Nurse Practitioner opportunities can I explore in Oakville?", a: "NP opportunities can vary across primary care, specialty, community and other healthcare services depending on the employer's clinical needs." },
    { q: "What NP experience should I highlight?", a: "Highlight the clinical domains, patient populations and healthcare settings supported by your actual Nurse Practitioner work and education." },
    { q: "What should I compare when reviewing NP opportunities in Oakville?", a: "Compare the clinical responsibilities, patient population, setting, schedule, employment arrangement and employer requirements." },
    { q: "Can I join Vetted for Oakville NP opportunities before one is posted?", a: "Yes. You can join the Registry and add Oakville as a preferred location for future Nurse Practitioner hiring needs." },
  ],
  "nurse-practitioner|richmond-hill": [
    { q: "What should I look for in a Nurse Practitioner opportunity in Richmond Hill?", a: "Review the clinical domain, patient population, practice setting, responsibilities, schedule and employment arrangement." },
    { q: "Can I include different areas of NP experience on my profile?", a: "Yes. Include the clinical domains and populations supported by your actual Nurse Practitioner background without treating them as separate Ontario NP registration categories." },
    { q: "What experience should I highlight for NP opportunities?", a: "Highlight relevant Nurse Practitioner practice, patient populations, clinical settings and the responsibilities you have performed." },
    { q: "What if there is no current NP opening in Richmond Hill?", a: "You can still join the Registry and include Richmond Hill as a preferred location for future Nurse Practitioner opportunities." },
  ],

  // ---- v19 reconciliation: 7 imaging/lab market literal FAQ sets ----
  "medical-radiation-technologist-radiography|toronto": [
    { q: "What radiography job titles might I see in Toronto?", a: "Relevant postings may use Medical Radiation Technologist — Radiography, MRT(R), Radiological Technologist or contextual X-Ray Technologist wording." },
    { q: "What should I highlight for Toronto radiography opportunities?", a: "Highlight your radiography experience, patient populations, clinical settings, equipment or modalities and other role-relevant imaging responsibilities." },
    { q: "What should I review before responding to an MRT Radiography opportunity in Toronto?", a: "Review the imaging responsibilities, work setting, schedule, employer registration requirements and the experience expected for the role." },
    { q: "Can I join Vetted if there is no current Toronto radiography opening?", a: "Yes. You can join the Registry and identify Toronto as a preferred location for future MRT Radiography opportunities." },
  ],
  "medical-radiation-technologist-radiography|london": [
    { q: "What titles should I search for when looking for radiography work in London?", a: "Medical Radiation Technologist — Radiography, MRT(R), Radiological Technologist and contextual X-Ray Technologist wording may all be relevant." },
    { q: "What radiography experience should I include?", a: "Include the imaging work you have performed, patient populations, settings, equipment or modalities and other supported radiography responsibilities." },
    { q: "How should I evaluate an MRT Radiography opportunity in London?", a: "Review the setting, imaging responsibilities, schedule, experience requirements and any professional-registration requirements identified by the employer." },
    { q: "Can I join before a London MRT Radiography role is posted?", a: "Yes. Add your radiography background and London as a preferred location so your profile can be available for future hiring needs." },
  ],
  "medical-radiation-technologist-magnetic-resonance|toronto": [
    { q: "What MRI job titles might I see in Toronto?", a: "Relevant postings may use Medical Radiation Technologist — Magnetic Resonance, MRT(MR), MRI Technologist or contextual MRI Tech wording." },
    { q: "What should I highlight for Magnetic Resonance opportunities?", a: "Highlight your MRI experience, patient populations, clinical settings, equipment and the types of examinations or workflows supported by your background." },
    { q: "What should I compare when reviewing an MRI opportunity in Toronto?", a: "Compare the setting, imaging responsibilities, schedule, experience requirements and employer registration requirements." },
    { q: "Can I join Vetted before a Toronto MRI opportunity is live?", a: "Yes. You can join the Registry and identify Toronto as a preferred location for future Magnetic Resonance opportunities." },
  ],
  "diagnostic-medical-sonographer|toronto": [
    { q: "What job titles may be used for sonography opportunities in Toronto?", a: "Relevant postings may use Diagnostic Medical Sonographer, DMS, Sonographer, Ultrasound Technologist or contextual Ultrasound Tech wording." },
    { q: "What sonography experience should I highlight?", a: "Highlight the types of examinations you perform, areas of sonography practice, patient populations, clinical settings and equipment supported by your experience." },
    { q: "What should I compare when reviewing a Toronto sonography opportunity?", a: "Compare the examination scope, setting, patient population, schedule, experience requirements and employer registration requirements." },
    { q: "Can I join Vetted if there is no current Toronto sonography role?", a: "Yes. You can join the Registry and identify Toronto as a preferred location for future Diagnostic Medical Sonographer opportunities." },
  ],
  "diagnostic-medical-sonographer|mississauga": [
    { q: "Should I search both Sonographer and Ultrasound Technologist in Mississauga?", a: "Yes. Employers may use either wording, while Vetted routes those profession terms to Diagnostic Medical Sonographer." },
    { q: "What should I include when describing my sonography background?", a: "Include the types of examinations, patient populations, clinical settings, equipment and areas of sonography practice supported by your actual experience." },
    { q: "How should I assess a Diagnostic Medical Sonographer opportunity in Mississauga?", a: "Review the examination scope, setting, schedule, patient population, required experience and employer registration requirements." },
    { q: "Can I join before a Mississauga sonography opportunity is posted?", a: "Yes. Add your Diagnostic Medical Sonographer background and Mississauga as a preferred location for future hiring needs." },
  ],
  "medical-laboratory-technologist|toronto": [
    { q: "What types of Medical Laboratory Technologist opportunities can I explore in Toronto?", a: "MLT opportunities may involve diagnostic laboratory work across different testing disciplines and healthcare laboratory settings depending on the employer." },
    { q: "What laboratory experience should I highlight?", a: "Highlight the laboratory disciplines, testing workflows, equipment, systems and healthcare laboratory settings supported by your actual MLT experience." },
    { q: "What should I compare when reviewing an MLT opportunity in Toronto?", a: "Compare the laboratory setting, testing responsibilities, schedule, experience requirements and employer registration requirements." },
    { q: "Can I join Vetted before a Toronto MLT job is open?", a: "Yes. You can join the Registry and identify Toronto as a preferred location for future Medical Laboratory Technologist opportunities." },
  ],
  "medical-laboratory-technologist|hamilton": [
    { q: "What should I highlight for Medical Laboratory Technologist opportunities in Hamilton?", a: "Highlight your laboratory disciplines, diagnostic testing experience, equipment, systems and the healthcare laboratory settings in which you have worked." },
    { q: "Is Medical Laboratory Technologist part of Medical Imaging?", a: "No. Medical Laboratory Technologist is a laboratory profession and remains separate from Vetted's Medical Imaging browse group." },
    { q: "How should I evaluate an MLT opportunity in Hamilton?", a: "Review the laboratory setting, testing responsibilities, schedule, experience requirements and employer registration requirements." },
    { q: "What if there is no current MLT opening in Hamilton?", a: "You can still join the Registry and add Hamilton as a preferred location so your Medical Laboratory Technologist background is available for future hiring needs." },
  ],
};

// ============================================================
// LOOKUPS
// ============================================================
export function faqsForProfession(profession: Profession): FaqItem[] | null {
  const set = PROFESSION_FAQ_POOLS[profession.slug];
  if (!set) {
    console.error(`[FAQ] Missing authored FAQ set for profession "${profession.slug}"`);
    return null;
  }
  return set;
}

export function faqsForSpecialty(profession: Profession, specialty: Specialty, city: City | null): FaqItem[] | null {
  if (city) {
    const key = `${profession.slug}|${specialty.slug}|${city.slug}`;
    const set = SPECIALTY_CITY_FAQ_OVERRIDES[key];
    if (!set) {
      console.error(`[FAQ] Missing authored specialty-city FAQ set for "${key}"`);
      return null;
    }
    return set;
  }
  const set = SPECIALTY_FAQ_POOLS[specialty.slug];
  if (!set) {
    console.error(`[FAQ] Missing authored specialty FAQ set for "${specialty.slug}"`);
    return null;
  }
  return set;
}

export function faqsForLocation(city: City): FaqItem[] | null {
  return LOCATION_FAQS[city.slug] || null;
}

export function faqsForProfessionCity(profession: Profession, city: City): FaqItem[] | null {
  return PROFESSION_CITY_FAQS[`${profession.slug}|${city.slug}`] || null;
}

/** One entry point for the role route: picks the right FAQ set for the page kind. */
export function faqsForRoute(
  kind: RouteKind,
  profession: Profession,
  specialty: Specialty | null,
  city: City | null
): FaqItem[] | null {
  if ((kind === "specialty" || kind === "specialty-city") && specialty) {
    return faqsForSpecialty(profession, specialty, kind === "specialty-city" ? city : null);
  }
  if (kind === "profession-city" && city) return faqsForProfessionCity(profession, city);
  return faqsForProfession(profession);
}
