import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import useScrollLock from "@/app/hooks/useScrollLock";
import { FD_REVEAL_ALLOWANCE, PROFESSIONS } from "@/app/data/professions";
import ProfessionGate from "./ProfessionGate";
import TopBar from "./TopBar";
import NavRail from "./NavRail";
import QueryBar from "./QueryBar";
import Registry from "./Registry";

type ProfessionCode = (typeof PROFESSIONS)[number][0];

type RegistryModalProps = {
  open: boolean;
  onClose: () => void;
};

type ActiveView = "registry" | "directory" | "saved" | "searches" | "recent";

export default function RegistryModal({ open, onClose }: RegistryModalProps) {
  const [professions, setProfessions] = useState<Set<ProfessionCode>>(
    () => new Set(),
  );
  const [gateDone, setGateDone] = useState(false);
  const [showGateNote, setShowGateNote] = useState(false);
  const [activeView, setActiveView] = useState<ActiveView>("registry");

  const closeRef = useRef<HTMLButtonElement | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  useScrollLock(open);

  // Remember what opened the modal and return focus to it on close.
  useEffect(() => {
    if (!open) return;

    const activeElement = document.activeElement;

    if (activeElement instanceof HTMLElement) {
      triggerRef.current = activeElement;
    }

    return () => {
      triggerRef.current?.focus();
      triggerRef.current = null;
    };
  }, [open]);

  // Once the profession gate is complete, move focus to Close.
  useEffect(() => {
    if (!open || !gateDone) return;

    const timeoutId = window.setTimeout(() => {
      closeRef.current?.focus();
    }, 30);

    return () => window.clearTimeout(timeoutId);
  }, [open, gateDone]);

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
    onClose();

    window.setTimeout(() => {
      document.getElementById("urgent")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 120);
  }, [onClose]);

  const handleRailSelect = useCallback(
    (id: string) => {
      if (id === "urgent") {
        goToUrgentHiring();
        return;
      }

      if (
        id === "registry" ||
        id === "directory" ||
        id === "saved" ||
        id === "searches" ||
        id === "recent"
      ) {
        setActiveView(id);
        return;
      }

      // TODO:
      // directory / saved / searches / recent / revealed /
      // introductions / compare / hidden destinations.
    },
    [goToUrgentHiring],
  );

  const selectedNames = useMemo(
    () =>
      PROFESSIONS.filter(([code]) => professions.has(code)).map(
        ([, name]) => name,
      ),
    [professions],
  );

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>
        {open && (
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
                  revealsRemaining={FD_REVEAL_ALLOWANCE}
                  onUrgentHire={goToUrgentHiring}
                  onClose={onClose}
                />
                <div className="w-full bg-ash h-px" />

                <QueryBar />

                <div className="flex min-h-0 flex-1 items-stretch gap-4.5">
                  <NavRail active={activeView} onSelect={handleRailSelect} />
                  <Registry />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}
