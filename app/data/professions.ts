export const PROFESSIONS: [ProfessionCode, string][] = [
  ["COOK", "Cook"],
  ["DSW", "Developmental Services Worker"],
  ["MOA", "Medical Office Assistant"],
  ["NP", "Nurse Practitioner"],
  ["OT", "Occupational Therapist"],
  ["PSW", "Personal Support Worker"],
  ["PHL", "Phlebotomist"],
  ["PT", "Physiotherapist"],
  ["RMT", "Registered Massage Therapist"],
  ["RN", "Registered Nurse"],
  ["RPN", "Registered Practical Nurse"],
  ["RP", "Registered Psychotherapist"],
  ["RSW", "Registered Social Worker"],
  ["SCHED", "Scheduling Coordinator"],
  ["UCP", "Unregulated Care Provider"],
];

export const PROFESSIONALENV = {
  COOK: ["Long-Term Care (LTC)"],
  DSW: ["Home Care", "Residential / Supported Living"],
  MOA: ["Clinic"],
  NP: ["Clinic", "Community Health Centre", "Long-Term Care (LTC)"],
  OT: ["Community Based Service", "Home Care"],
  PSW: ["Home Care", "Hospital", "Long-Term Care (LTC)", "Retirement Home"],
  PHL: ["Community Health Centre", "Hospital", "Home Care", "Laboratory"],
  PT: ["Clinic", "Hospital", "Private Practice"],
  RMT: ["Clinic", "Private Practice"],
  RN: [
    "Clinic",
    "Community Health Centre",
    "Community Based Service",
    "Hospital",
    "Long-Term Care (LTC)",
    "Residential Hospice",
  ],
  RPN: ["Clinic", "Hospital", "Long-Term Care (LTC)"],
  RP: ["Clinic", "Community Based Service", "Private Practice"],
  RSW: ["Community Based Service", "Hospital", "Private Practice"],
  SCHED: ["Home Care", "Long-Term Care (LTC)", "Retirement Home"],
  UCP: ["Long-Term Care (LTC)"],
};

export const ENVIRONMENT = [
  "Clinic",
  "Community Health Centre",
  "Community Based Service",
  "Home Care",
  "Laboratory",
  "Hospital",
  "Long-Term Care (LTC)",
  "Private Practice",
  "Retirement Home",
  "Residential Hospice",
  "Residential / Supported Living",
];

export const SHIFTS = ["Days", "Evenings", "Nights", "Weekends"];

export const EMPLOYMENT = ["Casual", "Part-Time", "Full-Time"];
export const MOBILITY = [
  ["vehicle", "Vehicle"],
  ["licence", "Driver Licence"],
  ["rural", "Open to rural"],
  ["travel", "Open to travel / fly-in roles"],
  ["relocation", "Open to relocation"],
];
export const PROFILE = [
  ["ic", "Independent contractor"],
  ["float", "Float / Resource pool experience"],
  ["specialist", "Specialist profiles"],
];
export const DATE = [7, 14];
export const FD_REVEAL_ALLOWANCE = 15;
