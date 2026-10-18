'use client'

import React, { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import Modal from './Modal'
import RequestIntroduction from './RequestIntroduction'
import IntroductionRequestForm, { type IntroductionRequestValues } from './IntroductionRequestForm'

type Step = 'info' | 'form'

interface IntroductionFlowProps {
  open: boolean
  onClose: () => void
  /** e.g. "Occupational Therapist" */
  role: string
  /** e.g. "Hamilton, ON" */
  location: string
  /** Engagement fee amount without the "$", e.g. "250" */
  fee?: string
  /** Called with the completed form when the user continues to payment */
  onSubmit: (values: IntroductionRequestValues) => void
  /** True while payment is being initiated */
  submitting?: boolean
  environments?: string[]
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
  return (
    <Modal open={open} onClose={onClose} className="max-w-xl">
      {/* State lives in the body, so it resets each time the modal is reopened */}
      <FlowBody
        role={role}
        location={location}
        fee={fee}
        onCancel={onClose}
        onSubmit={onSubmit}
        submitting={submitting}
        environments={environments}
      />
    </Modal>
  )
}

function FlowBody({
  role,
  location,
  fee,
  onCancel,
  onSubmit,
  submitting,
  environments,
}: Omit<IntroductionFlowProps, 'open' | 'onClose'> & { onCancel: () => void }) {
  const reduce = useReducedMotion()
  const [step, setStep] = useState<Step>('info')
  const [draft, setDraft] = useState<Partial<IntroductionRequestValues>>()

  const slide = {
    initial: (s: Step) => (reduce ? { opacity: 0 } : { opacity: 0, x: s === 'form' ? 24 : -24 }),
    animate: { opacity: 1, x: 0 },
    exit: (s: Step) => (reduce ? { opacity: 0 } : { opacity: 0, x: s === 'form' ? -24 : 24 }),
  }

  return (
    <div>
      {/* step indicator */}
      <div className="mb-4 flex items-center gap-2">
        {(['info', 'form'] as Step[]).map((s, i) => (
          <span
            key={s}
            className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
              step === s || (s === 'info' && step === 'form') ? 'bg-highlight' : 'bg-ash'
            }`}
            aria-hidden
          />
        ))}
        <span className="ml-1 text-xs tabular-nums text-ink-soft">
          Step {step === 'info' ? 1 : 2} of 2
        </span>
      </div>

      <AnimatePresence mode="wait" initial={false} custom={step}>
        <motion.div
          key={step}
          custom={step}
          variants={slide}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          {step === 'info' ? (
            <RequestIntroduction
              role={role}
              location={location}
              fee={fee}
              onCancel={onCancel}
              onContinue={() => setStep('form')}
              continueLabel="Continue →"
            />
          ) : (
            <IntroductionRequestForm
              initialValues={draft}
              environments={environments}
              submitting={submitting}
              submitLabel="Continue to payment →"
              onBack={(values) => {
                setDraft(values)
                setStep('info')
              }}
              onSubmit={onSubmit}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}