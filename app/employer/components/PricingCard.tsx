import { motion } from "motion/react";
import { GiCheckMark } from "react-icons/gi";

const PriceCheck = ({ enterprise = false }: { enterprise?: boolean }) => (
  <span
    className={`mt-0.5 text-sm ${enterprise ? "text-forest-mid" : "text-forest"}`}
  >
   <GiCheckMark />
  </span>
);

export default function PricingCard({
  title,
  price,
  note,
  subnote,
  features,
  featured,
}: {
  title: string;
  price: string;
  note: string;
  subnote?: string;
  features: string[];
  featured?: boolean
}) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className={`relative rounded-2xl border p-6 transition ${
        featured
          ? "bg-ink text-white border-ink shadow-2xl scale-[1.03]"
          : "bg-white border-ash"
      }`}
    >
      {featured && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-forest px-4 py-1 text-[10px] uppercase tracking-widest text-white">
          Best value
        </div>
      )}

      <p
        className={`text-xs uppercase tracking-widest mb-4 ${
          featured ? "text-white/50" : "text-ink-soft"
        }`}
      >
        {title}
      </p>

      <div className="mb-2 flex items-end gap-1">
        <span
          className={`text-4xl font-serif ${
            featured ? "text-white" : "text-ink"
          }`}
        >
          {price}
        </span>
        <span className="text-sm text-ink-soft">/mo</span>
      </div>

      {subnote && <p className="text-xs text-white/50 mb-1">{subnote}</p>}

      <p
        className={`text-xs mb-5 ${
          featured ? "text-white/50" : "text-ink-soft"
        }`}
      >
        {note}
      </p>

      <div className="border-t border-ash mb-4" />

      <div className="space-y-2 mb-6">
        {features.map((f: string) => (
          <div key={f} className="flex gap-2 text-sm">
            <PriceCheck enterprise={featured} />
            <span>{f}</span>
          </div>
        ))}
      </div>

      <button
        className={`w-full rounded-lg py-3 text-sm font-medium transition ${
          featured
            ? "bg-forest text-white hover:bg-forest/90"
            : "border border-ash hover:border-ink"
        }`}
      >
        Get Early Access
      </button>
    </motion.div>
  );
}
