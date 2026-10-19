import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { FD_REVEAL_ALLOWANCE, PROFESSIONS } from "@/app/data/professions";
import ProfessionGate from "./ProfessionGate";
import TopBar from "./TopBar";
import Registry from "./Registry";
import { useRouter } from "next/navigation";

type ProfessionCode = (typeof PROFESSIONS)[number][0];

export default function RegistryModal() {
  const router = useRouter();
  const onClose = () => {
    router.back();
  };
  const [professions, setProfessions] = useState<Set<ProfessionCode>>(
    () => new Set(),
  );
  const [gateDone, setGateDone] = useState(false);
  const [showGateNote, setShowGateNote] = useState(false);

  const closeRef = useRef<HTMLButtonElement | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  // Remember what opened the modal and return focus to it on close.
  useEffect(() => {
    const activeElement = document.activeElement;

    if (activeElement instanceof HTMLElement) {
      triggerRef.current = activeElement;
    }

    return () => {
      triggerRef.current?.focus();
      triggerRef.current = null;
    };
  }, []);

  // Once the profession gate is complete, move focus to Close.
  useEffect(() => {
    if (!gateDone) return;

    const timeoutId = window.setTimeout(() => {
      closeRef.current?.focus();
    }, 30);

    return () => window.clearTimeout(timeoutId);
  }, [gateDone]);

  const toggleProfession = useCallback((code: ProfessionCode) => {
    setProfessions((previous) => {
      const next = new Set(previous);

      if (next.has(code)) {
        next.delete(code);
      } else {
        next.add(code);
      }

      return next;
    });

    setShowGateNote(false);
  }, []);

  const continueFromGate = useCallback(() => {
    if (professions.size === 0) {
      setShowGateNote(true);
      return;
    }

    setGateDone(true);

    // TODO:
    // Run the initial filterFullDemo() equivalent + first-entry tour.
  }, [professions.size]);

  const goToUrgentHiring = useCallback(() => {
    window.setTimeout(() => {
      document.getElementById("urgent")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 120);
  }, []);

  const [avail, setAvail] = useState(FD_REVEAL_ALLOWANCE);
  const useReveal = () => {
    if (avail >= 1) setAvail((prev) => prev - 1);
  };
  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>
        <motion.div
          key="registry-modal"
          role="dialog"
          aria-modal="true"
          aria-label="Try the Registry"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-600 flex flex-col overflow-hidden bg-cream"
        >
          <div className="flex min-h-0 w-full flex-1 flex-col">
            <AnimatePresence>
              {!gateDone && (
                <ProfessionGate
                  key="gate"
                  selected={professions}
                  onToggle={toggleProfession}
                  showNote={showGateNote}
                  onContinue={continueFromGate}
                  onClose={onClose}
                />
              )}
            </AnimatePresence>

            <div className="mx-auto flex min-h-0 w-full max-w-420 flex-1 flex-col px-5 pb-10 min-[900px]:px-7 min-[900px]:pb-0">
              <TopBar
                closeRef={closeRef}
                revealsRemaining={avail}
                onUrgentHire={goToUrgentHiring}
                onClose={onClose}
              />
              <div className="w-full bg-ash h-px" />

              <Registry revealsRemaining={avail} useReveal = {useReveal}/>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </MotionConfig>
  );
}
