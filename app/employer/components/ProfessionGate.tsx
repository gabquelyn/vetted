import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { PROFESSIONS } from "@/app/data/professions";

type ProfessionCode = (typeof PROFESSIONS)[number][0];

type ProfessionGateProps = {
  selected: Set<ProfessionCode>;
  onToggle: (code: ProfessionCode) => void;
  showNote: boolean;
  onContinue: () => void;
  onClose: () => void;
};

const pillBase =
  "cursor-pointer text-xs md:tex-sm flex px-2 md:px-4 items-center gap-[7px] rounded-full border py-[5px] md:py-[9px] font-semibold transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest";

export default function ProfessionGate({
  selected,
  onToggle,
  showNote,
  onContinue,
  onClose,
}: ProfessionGateProps) {
  const boxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      boxRef.current?.focus();
    }, 30);

    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-610 flex items-center justify-center bg-cream p-6"
    >
      <motion.div
        ref={boxRef}
        tabIndex={-1}
        initial={{ opacity: 0, y: 12, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.35,
          ease: [0.2, 0.7, 0.3, 1],
        }}
        className="relative w-full max-w-140 rounded-[20px] border border-ash bg-white px-9 pt-10 pb-8 text-center shadow-[0_30px_70px_rgba(28,52,16,.14)] outline-none max-sm:px-5"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute border border-ash top-4.5 right-5 cursor-pointer rounded-full px-2.5 py-1.5 text-[11.5px] font-semibold text-ink-faint transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
        >
           ✕
        </button>

        <h3 className="mb-2 font-serif text-[24px] font-semibold text-ink">
          Which professionals are you looking for?
        </h3>

        <p className="mx-auto mb-6 max-w-105 text-[12.5px] leading-[1.6] text-ink-faint">
          Select one or more to get started. You can change this anytime from
          Filters inside the Registry.
        </p>

        <div
          className="mb-2.5 flex flex-wrap justify-center gap-2"
          role="group"
          aria-label="Professions"
        >
          {PROFESSIONS.map(([code, label], index) => {
            const isSelected = selected.has(code);

            return (
              <motion.button
                key={code}
                type="button"
                role="checkbox"
                aria-checked={isSelected}
                onClick={() => onToggle(code)}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: 0.1 + index * 0.025,
                  ease: "easeOut",
                }}
                whileTap={{ scale: 0.97 }}
                className={`${pillBase} ${
                  isSelected
                    ? "border-forest bg-forest-light text-forest-deep"
                    : "border-ash bg-white text-ink-soft hover:border-forest"
                }`}
              >
 
                {label}
              </motion.button>
            );
          })}
        </div>

        <div
          role="status"
          aria-live="polite"
          className={`text-[11.5px] font-semibold text-amber transition-opacity duration-150 ${
            showNote
              ? "my-1.5 h-auto opacity-100"
              : "h-0 overflow-hidden opacity-0"
          }`}
        >
          Select at least one profession to continue.
        </div>

        <button
          type="button"
          onClick={onContinue}
          className="mt-4.5 cursor-pointer rounded-full bg-forest px-7.5 py-3 text-[13px] font-bold text-white transition-colors hover:bg-[#3d6b1f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest-deep"
        >
          View professionals →
        </button>
      </motion.div>
    </motion.div>
  );
}