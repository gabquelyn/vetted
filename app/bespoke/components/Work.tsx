"use client";
import { motion } from "motion/react";
import {
  HiOutlineWrenchScrewdriver,
  HiOutlineChartBar,
  HiOutlineClipboardDocumentList,
} from "react-icons/hi2";
import { FiSearch } from "react-icons/fi";
import { LuWorkflow } from "react-icons/lu";
import { MdOutlineHub } from "react-icons/md";

const services = [
  {
    icon: LuWorkflow,
    title: "Hiring workflow design",
    desc: "Define your end-to-end recruiting process, stage by stage, with clear ownership at each step.",
  },
  {
    icon: MdOutlineHub,
    title: "Candidate pipeline design",
    desc: "Structure how candidates are sourced, screened, and evaluated so nothing falls through the gaps.",
  },
  {
    icon: FiSearch,
    title: "Sourcing strategy",
    desc: "Build inbound and outbound sourcing channels tailored to your roles and market.",
  },
  {
    icon: HiOutlineClipboardDocumentList,
    title: "Screening frameworks",
    desc: "Establish consistent, role-specific evaluation criteria that remove guesswork from decisions.",
  },
  {
    icon: HiOutlineWrenchScrewdriver,
    title: "ATS and tooling design",
    desc: "Select and configure the right tools, workflows, and automations for your team's size and pace.",
  },
  {
    icon: HiOutlineChartBar,
    title: "Reporting and tracking",
    desc: "Create the metrics and dashboards that tell you where hiring is working and where it's breaking.",
  },
];

export default function Work() {
  return (
    <section className="border-b border-ash bg-cream px-6 md:px-12 py-22">
      <div className="mx-auto max-w-245">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="section-label mb-5 text-center uppercase text-xs text-forest"
        >
          What I do
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-center font-serif text-[clamp(28px,3.2vw,42px)] font-light leading-[1.1] text-ink mb-4"
        >
          I don&apos;t recruit for you. <br />I build the{" "}
          <em className="text-forest not-italic relative">
            system behind your hiring.
            <span className="absolute left-0 bottom-0 w-full h-1.5 bg-forest/10 rounded-full -z-10" />
          </em>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mb-12 max-w-140 text-center text-base font-light leading-[1.75] text-ink-soft"
        >
          Six years placing PSWs, RNs, MOAs, and clinic staff across Ontario
          gave me a clear picture of where healthcare hiring breaks down. I
          build the systems that fix it.
        </motion.p>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {services.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="group relative rounded-2xl border border-ash bg-white p-6 transition-all duration-300 hover:shadow-xl"
            >
              {/* subtle hover glow */}
              <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 bg-linear-to-br from-forest/5 via-transparent to-transparent rounded-2xl" />

              {/* Icon */}
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-forest/10 text-forest group-hover:scale-110 transition-transform">
                <Icon size={20} />
              </div>

              {/* Title */}
              <div className="mb-2 text-sm font-semibold text-ink">{title}</div>

              {/* Desc */}
              <p className="text-[13px] font-light leading-[1.65] text-ink-soft">
                {desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
