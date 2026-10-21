"use client";

import React, { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Modal from "./Modal";
import RequestIntroduction from "./RequestIntroduction";
import IntroductionRequestForm, {
  type IntroductionRequestValues,
} from "./IntroductionRequestForm";
import { IoIosStarOutline } from "react-icons/io";

type Step = "info" | "form";

interface IntroductionFlowProps {
  open: boolean;
  onClose: () => void;
  /** e.g. "Occupational Therapist" */
  role: string;
  /** e.g. "Hamilton, ON" */
  location: string;
  /** Engagement fee amount without the "$", e.g. "250" */
  fee?: string;
  /** Called with the completed form when the user continues to payment */
  onSubmit: (values: IntroductionRequestValues) => void;
  /** True while payment is being initiated */
  submitting?: boolean;
  environments?: string[];
}

export default function IntroductionFlow({
  open,
  onClose,
  role,
  location,
  fee,
  onSubmit,
  submitting,
  environments,
}: IntroductionFlowProps) {
  const [proceed, setProceed] = useState(false);
  const [draft, setDraft] = useState<Partial<IntroductionRequestValues>>()
  return (
    <Modal
      open={open}
      onClose={onClose}
      banner="bg-highlight-dark"
      title={
        <div className=" p-3">
          <p className="text-[#f0dcb8] w-fit text-xs bg-white/14 rounded-md p-1 px-3 flex items-center gap-1">
            <IoIosStarOutline size={10} />
            Sepcialist profile
          </p>
          <p className="text-white font-serif text-3xl">
            {proceed ? "Tell us about the role" : "Request an introduction?"}
          </p>
          <p className="text-[#f0dcb8] text-xs">
            {role} · {location}
          </p>
        </div>
      }
    >
      {proceed ? (
        <IntroductionRequestForm
          initialValues={draft}
          environments={environments}
          submitting={submitting}
          submitLabel="Continue to payment →"
          onBack={(values) => {
            setDraft(values);
            setProceed(false);
          }}
          onSubmit={onSubmit}
        />
      ) : (
        <div className="p-6  text-xs">
          <ol className="list-disc list-inside space-y-5 marker-highlight-dark text-ink-mid">
            <li>
              This is a recruiter-assisted introduction, not a self-serve
              Reveal. A $[—] <strong>non-refundable engagement fee</strong> is
              required upfront for Vetted to begin the request.
            </li>
            <li>
              <strong>What happens next</strong>: Vetted will contact the
              Specialist about your opportunity. If they are interested, we will
              let you know before any introduction is made.
            </li>

            <li>
              If you want to move forward, you can then approve the
              introduction. The success fee is only charged when you choose to
              proceed with the introduction.
            </li>
          </ol>

          <div className="flex items-center justify-between mt-5">
            <button
              className="border-ash border rounded-xl p-2 w-[40%] text-ink-soft font-semibold"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="bg-highlight rounded-xl p-2 w-[40%] text-white font-semibold"
              onClick={() => setProceed(true)}
            >
              Continue to payment
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}

function FlowBody({
  role,
  location,
  fee,
  onCancel,
  onSubmit,
  submitting,
  environments,
}: Omit<IntroductionFlowProps, "open" | "onClose"> & { onCancel: () => void }) {
  const reduce = useReducedMotion();
  const [step, setStep] = useState<Step>("info");
  const [draft, setDraft] = useState<Partial<IntroductionRequestValues>>();

  const slide = {
    initial: (s: Step) =>
      reduce ? { opacity: 0 } : { opacity: 0, x: s === "form" ? 24 : -24 },
    animate: { opacity: 1, x: 0 },
    exit: (s: Step) =>
      reduce ? { opacity: 0 } : { opacity: 0, x: s === "form" ? -24 : 24 },
  };

  return (
    <div>
      <AnimatePresence mode="wait" initial={false} custom={step}>
        <motion.div
          key={step}
          custom={step}
          variants={slide}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          {step === "info" ? (
            <RequestIntroduction
              role={role}
              location={location}
              fee={fee}
              onCancel={onCancel}
              onContinue={() => setStep("form")}
              continueLabel="Continue →"
            />
          ) : (
            <IntroductionRequestForm
              initialValues={draft}
              environments={environments}
              submitting={submitting}
              submitLabel="Continue to payment →"
              onBack={(values) => {
                setDraft(values);
                setStep("info");
              }}
              onSubmit={onSubmit}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
