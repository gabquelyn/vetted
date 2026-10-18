"use client";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

export const VETTED_HEAD_META = {
  title: "Vetted | Ontario Healthcare Talent Registry",
  description:
    "Explore Vetted, an Ontario healthcare talent Registry where employers can search structured profiles, compare what matters and contact professionals directly.",
  // PLACEHOLDER DOMAIN — no real production URL exists anywhere in this project's source; replace before deploying.
  canonical: "https://www.joinvetted.ca/",
  ogType: "website",
  ogTitle: "Vetted | Ontario Healthcare Talent Registry",
  ogDescription:
    "Explore Vetted, an Ontario healthcare talent Registry where employers can search structured profiles, compare what matters and contact professionals directly.",
  ogUrl: "https://www.joinvetted.ca/",
  // No og:image included: no actual share-image asset exists in the supplied project.
  twitterCard: "summary",
  twitterTitle: "Vetted | Ontario Healthcare Talent Registry",
  twitterDescription:
    "Explore Vetted, an Ontario healthcare talent Registry where employers can search structured profiles, compare what matters and contact professionals directly.",
  jsonLd: [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Vetted",
      url: "https://www.joinvetted.ca/",
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Vetted",
      url: "https://www.joinvetted.ca/",
    },
  ],
} as const;

function PinIcon({ size = 12, opacity }: { size?: number; opacity?: number }) {
  return (
    <svg
      className="pin"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      style={opacity !== undefined ? { opacity } : undefined}
    >
      <path d="M12 22s8-7.5 8-13a8 8 0 1 0-16 0c0 5.5 8 13 8 13Z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  );
}

function CarIcon({ size = 17 }: { size?: number }) {
  return (
    <svg
      className="car"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="#1a1a18"
    >
      <path d="M4 16v-3.2c0-.5.15-.9.5-1.3l1.8-4.2c.3-.7 1-1.2 1.8-1.2h7.8c.8 0 1.5.5 1.8 1.2l1.8 4.2c.35.4.5.8.5 1.3V16a1 1 0 0 1-1 1h-.5a1 1 0 0 1-1-1v-.5H6.5V16a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Zm2.6-4.5h10.8l-1.3-3.1a.6.6 0 0 0-.55-.4H8.45a.6.6 0 0 0-.55.4Z M7 13.2a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4Zm10 0a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4Z" />
    </svg>
  );
}

function FilterChip({ label }: { label: string }) {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const raf1 = requestAnimationFrame(() => {
      const raf2 = requestAnimationFrame(() => setEntered(true));
      return () => cancelAnimationFrame(raf2);
    });
    return () => cancelAnimationFrame(raf1);
  }, []);

  return (
    <div
      className="fchip"
      style={{
        opacity: entered ? 1 : 0,
        transform: entered ? "translateY(0)" : "translateY(4px)",
        transition: "opacity .7s ease, transform .7s ease",
      }}
    >
      {label}
    </div>
  );
}

interface HeroCardData {
  id: number;
  domId: string;
  confirmed: string;
  rid: string;
  rt: string;
  location: string;
  hasVehicle: boolean;
  tags: string[];
}

const HERO_CARDS: HeroCardData[] = [
  {
    id: 1,
    domId: "card1",
    confirmed: "✓ Confirmed · 2d",
    rid: "RPN-014",
    rt: "Registered Practical Nurse",
    location: "Toronto, ON",
    hasVehicle: true,
    tags: ["Wound Care", "Nights"],
  },
  {
    id: 2,
    domId: "card2",
    confirmed: "✓ Confirmed · 5d",
    rid: "NP-008",
    rt: "Nurse Practitioner",
    location: "Brampton, ON",
    hasVehicle: false,
    tags: ["Primary Care"],
  },
  {
    id: 3,
    domId: "card3",
    confirmed: "✓ Confirmed · 3d",
    rid: "MOA-045",
    rt: "Medical Office Assistant",
    location: "Ottawa, ON",
    hasVehicle: false,
    tags: ["Days"],
  },
  {
    id: 4,
    domId: "card4",
    confirmed: "✓ Confirmed · 6d",
    rid: "RSW-021",
    rt: "Registered Social Worker",
    location: "Oshawa, ON",
    hasVehicle: true,
    tags: ["Mental Health"],
  },
  {
    id: 5,
    domId: "card5",
    confirmed: "✓ Confirmed · 2d",
    rid: "RN-063",
    rt: "Registered Nurse",
    location: "Niagara, ON",
    hasVehicle: true,
    tags: ["Stroke / Neuro"],
  },
  {
    id: 6,
    domId: "card6",
    confirmed: "✓ Confirmed · 1d",
    rid: "RPN-027",
    rt: "Registered Practical Nurse",
    location: "Mississauga, ON",
    hasVehicle: false,
    tags: ["Palliative Care"],
  },
];

const MATCH_IDS = [1, 6]; // matchCards in the original (card1, card6)
export default function HeroSection() {
  const [typedText, setTypedText] = useState("");
  const [chips, setChips] = useState<{ chipId: number; label: string }[]>([]);
  const [highlightActive, setHighlightActive] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  const timersRef = useRef<number[]>([]);
  const typingIntervalRef = useRef<number | null>(null);
  const chipIdCounter = useRef(0);

  const cycleRef = useRef<() => void>(() => {});

  const clearAllTimers = useCallback(() => {
    timersRef.current.forEach((t) => clearTimeout(t));
    timersRef.current = [];
    if (typingIntervalRef.current !== null) {
      clearInterval(typingIntervalRef.current);
      typingIntervalRef.current = null;
    }
  }, []);

  const typeString = useCallback((str: string) => {
    let i = 0;
    setTypedText("");
    typingIntervalRef.current = window.setInterval(() => {
      i++;
      setTypedText(str.slice(0, i));
      if (i >= str.length && typingIntervalRef.current !== null) {
        clearInterval(typingIntervalRef.current);
        typingIntervalRef.current = null;
      }
    }, 140);
  }, []);

  const resetCycle = useCallback(() => {
    setTypedText("");
    setChips([]);
    setHighlightActive(false);
  }, []);

  useEffect(() => {
    cycleRef.current = () => {
      resetCycle();
      timersRef.current.push(window.setTimeout(() => typeString("RPN"), 600));
      timersRef.current.push(
        window.setTimeout(
          () =>
            setChips((c) => [
              ...c,
              { chipId: chipIdCounter.current++, label: "Nights" },
            ]),
          1900,
        ),
      );
      timersRef.current.push(
        window.setTimeout(
          () =>
            setChips((c) => [
              ...c,
              { chipId: chipIdCounter.current++, label: "Toronto · 25km" },
            ]),
          2700,
        ),
      );
      timersRef.current.push(
        window.setTimeout(() => setHighlightActive(true), 3900),
      );
      timersRef.current.push(
        window.setTimeout(() => {
          setTypedText("");
          setChips([]);
        }, 9500),
      );
      timersRef.current.push(
        window.setTimeout(() => setHighlightActive(false), 10400),
      );
      timersRef.current.push(
        window.setTimeout(() => cycleRef.current(), 11200),
      );
    };
  }, [resetCycle, typeString]);

  // Mount: start the cycle once, mirroring the original IIFE's `cycle();` at the end.
  useEffect(() => {
    cycleRef.current();
    return () => clearAllTimers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const togglePlay = useCallback(() => {
    setIsPlaying((prevPlaying) => {
      const next = !prevPlaying;
      if (!next) {
        clearAllTimers();
      } else {
        cycleRef.current();
      }
      return next;
    });
  }, [clearAllTimers]);

  const handlePlayBtnKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        togglePlay();
      }
    },
    [togglePlay],
  );

  const cardClassName = (id: number) => {
    if (!highlightActive) return "card";
    return MATCH_IDS.includes(id) ? "card hi" : "card dim";
  };

  return (
    <section className="h-screen min-h-[92vh] flex flex-col justify-center px-12 pt-10 md;pt-5 pb-0;">
      <div className="text-center pb-12">
        <div className="text-[11.5px] font-medium tracking-[0.08em] uppercase text-forest mb-4">
          For Ontario healthcare employers
        </div>
        <h1 className="font-serif font-semibold text-[52px] leading-[1.08] mb-3.5">
          The Resume Pile Ends with Us
        </h1>
        <p className="text-[17px] font-light text-ink-soft max-w-129 mx-auto mb-5.5 leading-normal">
          Current Ontario healthcare profiles, reviewed by each professional
          every 30 days. Find candidates worth reviewing{" "}
          <span className="text-forest font-medium">in minutes.</span>
        </p>
        <div className="flex items-center justify-center gap-2.5">
          <div
            className="w-8 h-8 rounded-full border border-ash flex items-center justify-center text-ink text-xs cursor-pointer transition-[background,border-color] duration-150 select-none hover:bg-forest-light hover:border-forest"
            id="playBtn"
            role="button"
            tabIndex={0}
            aria-label={isPlaying ? "Pause animation" : "Play animation"}
            onClick={togglePlay}
            onKeyDown={handlePlayBtnKeyDown}
          >
            {isPlaying ? "❚❚" : "▶"}
          </div>
          <span className="w-px h-4 bg-ash mx-0.5"></span>
          <Link
            href="/employer"
            className="border-b border-transparent text-[12.5px] font-semibold text-forest no-underline transition-[border-color] duration-150 hover:border-b-forest"
          >
            Explore the interactive Registry demo →
          </Link>
        </div>
      </div>

      <div className="max-w-160 mx-auto flex items-center gap-3.5 border-b-2 border-ink pb-4.5 mb-9 text-[22px] text-ink-mid">
        Search:{" "}
        <b id="typeText" className="text-ink font-semibold">
          {typedText}
        </b>
        <span className="inline-block w-0.5 h-6 bg-forest animate-[blink_1s_steps(1)_infinite]"></span>
      </div>
      <div className="flex justify-center gap-3 mb-10" id="chipRow">
        {chips.map((c) => (
          <FilterChip key={c.chipId} label={c.label} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-6 max-w-350 mx-auto w-full">
        {HERO_CARDS.map((card, index) => (
          <div
            className={`${cardClassName(card.id)} ${
              index >= 1 ? "hidden sm:block" : ""
            }`}
            id={card.domId}
            key={card.domId}
          >
            <div className="flex justify-between items-center text-[12.5px] mb-3.25">
              {card.confirmed}
              <span className="w-1.75 h-1.75 rounded-full bg-primary-mid" />
            </div>

            <div className="font-['IBM_Plex_Mono',monospace] font-bold text-[19px] mb-0.75">
              {card.rid}
            </div>

            <div className="text-[13px] text-ink-soft mb-3">{card.rt}</div>

            <div className="text-[9.5px] font-semibold tracking-[0.06em] uppercase text-ink-mid mb-1.5 pt-2.5 border-t border-ash">
              Location
            </div>

            <div className="flex items-center gap-1.5 text-[12.5px] text-ink mb-3">
              <PinIcon size={12} />
              {card.location}
              {card.hasVehicle && (
                <>
                  <span className="dot2">·</span>
                  <CarIcon size={17} />
                </>
              )}
            </div>

            <div className="flex gap-1.5 flex-wrap">
              {card.tags.map((tag) => (
                <span
                  className="text-[11px] font-semibold bg-forest-light text-forest px-2.5 py-1 rounded-full"
                  key={tag}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="hero-text-spacer" style={{ height: 12 }}></div>
    </section>
  );
}
