interface CandidateCardProps {
  c: Candidate & { _cluster: number | null };
  unlocked: UnlockType | undefined;
  onUnlock: (id: string, type: UnlockType) => void;
  inCompare: boolean;
  onToggleCompare: (id: string, checked: boolean) => void;
}

type InputFn = (e: React.ChangeEvent<HTMLInputElement>) => void;

interface Candidate {
  id: string;
  role: string;
  label: string;
  code: string;
  loc: string;
  exp: number;
  ic: boolean;
  available: coolean;
  vehicle: boolean;
  shifts: string[];
  env: string;
  skills: string;
  verified: number;
  active: number;
  specialist: boolean;
  doc: boolean;
  notice: string | null;
  shiftType: string | null;
  insured: boolean;
  activeNow: boolean;
  summary: string;
  certs: string;
  travel: string;
  edu: string;
}

interface UICompare {
  filters: {
    role: string;
    ic: boolean;
    available: boolean;
    vehicle: boolean;
    days: boolean;
    evenings: boolean;
    nights: boolean;
    minExp: number;
    insured: boolean;
    activeNow: boolean;
    city: string;
    radius: string;
  };
  sortBy: string;
  unlocked: Record<string, string>;
  compare: string[];
  compareOpen: boolean;
  cityInput: string;
}

interface Article {
  tag: string;
  tagClass: string;
  title: string;
  sub: string;
  date: string;
  read: string;
}

type ResolvedLocation = {
  city: string;
  province: string;
  country: string;
  lat: number | string;
  lng: number | string;
  formatted: string;
} | null;

type Place = {
  city: string;
  province: string;
  country: string;
  lat: number;
  lng: number;
};

type inputEvent = React.ChangeEvent<HTMLInputElement>;

type ActiveView =
  | "registry"
  | "directory"
  | "saved"
  | "searches"
  | "recent"
  | "compare"
  | "reveals"
  | "requests"
  | "urgent"
  | "hidden";

type ProfessionCode =
  | "COOK"
  | "DSW"
  | "MOA"
  | "NP"
  | "OT"
  | "PSW"
  | "PHL"
  | "PT"
  | "RMT"
  | "RN"
  | "RPN"
  | "RP"
  | "RSW"
  | "SCHED"
  | "UCP";

interface Filters {
  profession: ProfessionCode[];
  environment: string[];
  shift: string[];
  employment: string[];
  mobility: string[];
  profile: string[];
  availability: string[];
  openTo: string[];
  confirmed: string[];
  [index: string]: string[];
}

interface Search {
  timestamp: string;
  id: string;
  filters: Filters;
  terms: string[];
  location: string;
  radius: number;
}
