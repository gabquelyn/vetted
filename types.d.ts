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
      role: string,
      ic: boolean,
      available: boolean,
      vehicle: boolean,
      days: boolean,
      evenings: boolean,
      nights: boolean,
      minExp: number,
      insured: boolean,
      activeNow: boolean,
      city: string,
      radius: string,
    },
    sortBy: string,
    unlocked: Record<string, string>,
    compare: string[],
    compareOpen: boolean,
    cityInput: string,
}


interface Article {
  tag: string
  tagClass: string
  title: string
  sub: string
  date: string
  read: string
}