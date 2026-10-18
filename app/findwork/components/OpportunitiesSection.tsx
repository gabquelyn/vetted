import { Fragment } from "react";
import Link from "next/link";
import {
  getProfession,
  getCity,
  findSpecialty,
  buildJoinDestination,
  buildDestination,
  consolidatedMarketGroups,
  alphabetizedMarketGroups,
  groupDisplayLabel,
  type Opportunity,
  type MarketGroup,
} from "@/app/data/findwork";


const headClass =
  "mb-1.5 font-['Cormorant_Garamond',serif] text-[clamp(24px,3vw,30px)] font-semibold leading-[1.2] text-ink";
const subClass = "mb-[18px] text-[13.5px] text-ink-soft";
const btnPrimary =
  "inline-block rounded-[10px] bg-forest px-[26px] py-3.5 text-sm font-semibold text-white transition-colors hover:bg-forest-mid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest";

function OpportunityCard({ o }: { o: Opportunity }) {
  const profession = getProfession(o.profession);
  const city = getCity(o.city);
  if (!profession || !city) return null;
  const joinHref = buildJoinDestination({ profession, specialties: o.specialty ? [findSpecialty(profession, o.specialty)] : [], city });
  return (
    <div
      className="block rounded-[14px] border border-forest/[0.28] bg-white p-5 transition-[border-color,box-shadow] duration-150 hover:border-forest hover:shadow-[0_8px_24px_rgba(45,80,22,0.08)]"
      data-specialty={o.specialty || ""}
      data-status="live"
    >
      <div className="mb-2 text-[15px] font-semibold text-ink">{o.title}</div>
      <div className="mb-0.5 text-[12.5px] text-ink-mid">{city.name}, ON</div>
      <div className="mb-0.5 text-[12.5px] text-ink-mid">{o.employmentType} · {o.shift}</div>
      <div className="mb-0.5 text-[12.5px] text-ink-soft">Start date: {o.startDate}</div>
      <Link href={joinHref} className="mt-2.5 inline-block text-[12.5px] font-semibold text-forest">Join to respond →</Link>
    </div>
  );
}

function MarketRow({ group }: { group: MarketGroup }) {
  const label = groupDisplayLabel(group);
  return (
    <div className="border-b border-forest/[0.14] px-0.5 py-3.5">
      <span className="mb-2 block text-sm font-semibold text-ink">{label}</span>
      <div className="flex flex-wrap gap-x-2 gap-y-[7px]">
        {group.cities.map((c) => (
          <Link
            className="rounded-full border border-forest/[0.22] bg-white px-[13px] py-[5px] text-[12.5px] font-semibold text-forest transition-colors duration-150 hover:border-forest hover:bg-forest hover:text-white"
            href={buildDestination({ profession: group.profession, specialties: group.specialty ? [group.specialty] : [], city: c })}
            key={c.slug}
          >
            {c.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

function MarketArrowRow({ group }: { group: MarketGroup }) {
  const label = groupDisplayLabel(group);
  const cities = group.cities;
  return (
    <div className="border-b border-forest/[0.14] px-0.5 py-[13px]">
      <div className="flex items-baseline justify-between gap-4">
        <span className="text-sm font-semibold text-[#382B26]">{label}</span>
        <span className="shrink-0 font-semibold text-forest">→</span>
      </div>
      <div className="mt-1 block text-[12.5px] text-ink-mid">
        {cities.map((c, i) => (
          <Fragment key={c.slug}>
            {i > 0 && " "}
            {i > 0 && <span className="opacity-65">·</span>}
            {i > 0 && " "}
            <Link
              className="font-medium text-inherit hover:text-forest hover:underline"
              href={buildDestination({ profession: group.profession, specialties: group.specialty ? [group.specialty] : [], city: c })}
            >
              {c.name}
            </Link>
          </Fragment>
        ))}
      </div>
    </div>
  );
}

interface OpportunitiesSectionProps {
  opps: Opportunity[];
  emptyCtx?: { headline?: string; body?: string; joinHref?: string; joinLabel?: string; onward?: { href: string; label: string } | null };
  joinCtx?: Parameters<typeof buildJoinDestination>[0];
  treatment?: "homepage" | "full" | "market";
  alphabetical?: boolean;
  /** Homepage's #currentOppsSection zeroed the section's top margin; pass true there. */
  flushTop?: boolean;
}

export default function OpportunitiesSection({ opps, emptyCtx, joinCtx, treatment, alphabetical, flushTop = false }: OpportunitiesSectionProps) {
  const t = treatment || "market";
  const live = opps.filter((o) => o.status === "live");
  const building = opps.filter((o) => o.status !== "live");
  const topMargin = flushTop ? "mt-0" : "mt-12";

  if (!live.length && !building.length) {
    const ctx = emptyCtx || {};
    return (
      <section
        className={`${topMargin} rounded-[14px] border border-dashed border-[#e5e2da] bg-[#faf9f6] p-8 max-[860px]:px-5 max-[860px]:py-6`}
        id="oppSection"
      >
        <p className="mb-2 font-['Cormorant_Garamond',serif] text-xl font-semibold text-ink">
          {ctx.headline || "No current openings — join and you'll be here when there are."}
        </p>
        <p className="mb-[18px] max-w-[480px] text-sm leading-[1.55] text-ink-mid">
          {ctx.body || "Add your profile to the Registry so employers can find you when a relevant opportunity comes up."}
        </p>
        <Link
          href={ctx.joinHref || buildJoinDestination({})}
          className={`${btnPrimary} mr-[18px] max-[460px]:mb-3 max-[460px]:mr-0 max-[460px]:block max-[460px]:text-center`}
        >
          {ctx.joinLabel || "Join the Registry →"}
        </Link>
        {ctx.onward && (
          <Link
            href={ctx.onward.href}
            className="mt-3.5 inline-block text-[13px] font-semibold text-forest hover:underline max-[460px]:block"
          >
            {ctx.onward.label} →
          </Link>
        )}
      </section>
    );
  }

  const buildingGroupsSource = t === "full" && alphabetical ? alphabetizedMarketGroups(building) : consolidatedMarketGroups(building);

  return (
    <section className={topMargin} id="oppSection">
      {live.length > 0 && (
        <>
          <h2 className={headClass}>Current opportunities</h2>
          <div
            className={`grid grid-cols-1 gap-4 min-[861px]:grid-cols-2 ${building.length ? "mb-7" : ""}`}
            id="oppGrid"
          >
            {live.map((o) => <OpportunityCard o={o} key={o.id} />)}
          </div>
        </>
      )}
      {building.length > 0 && t === "homepage" && (
        <div className="mt-6 rounded-[14px] bg-forest-pale px-5.5 pb-2 pt-5">
          <h2 className={headClass}>Opportunities we are building for</h2>
          <p className={subClass}>Join the Registry to be discoverable here as employer hiring needs come up.</p>
          <div className="mt-2 border-t border-forest/[0.14]">
            {alphabetizedMarketGroups(building).map((g) => <MarketArrowRow group={g} key={g.profession.slug + "|" + (g.specialty ? g.specialty.slug : "")} />)}
          </div>
        </div>
      )}
      {building.length > 0 && t === "full" && (
        <div className="mt-1 rounded-2xl bg-forest-pale px-7 pb-6 pt-7">
          <h2 className={headClass}>Opportunities we are building for</h2>
          <p className={subClass}>Join the Registry to be discoverable here as employer hiring needs come up.</p>
          <div className="mt-1 border-t border-forest/[0.14]">
            {buildingGroupsSource.map((g) => <MarketRow group={g} key={g.profession.slug + "|" + (g.specialty ? g.specialty.slug : "")} />)}
          </div>
        </div>
      )}
      {building.length > 0 && t !== "homepage" && t !== "full" && (
        <div className="mt-1 rounded-2xl bg-forest-pale px-7 pb-6 pt-7">
          <h2 className={headClass}>Opportunities we are building for</h2>
          <p className={subClass}>Join the Registry to be discoverable here as employer hiring needs come up.</p>
          <div className="mt-1 border-t border-forest/[0.14]">
            {consolidatedMarketGroups(building).map((g) => <MarketRow group={g} key={g.profession.slug + "|" + (g.specialty ? g.specialty.slug : "")} />)}
          </div>
          <Link href={buildJoinDestination(joinCtx || {})} className={`${btnPrimary} mt-5`}>Join the Registry →</Link>
        </div>
      )}
    </section>
  );
}