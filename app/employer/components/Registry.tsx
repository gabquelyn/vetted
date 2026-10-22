"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Candidate, FULL_CANDIDATES } from "@/app/data/registry";
import { AnimatePresence, motion } from "motion/react";
import CandidateCard from "./CanCard";
import Select from "@/app/components/CustomSelect";
import Filtering from "./Filtering";
import { applyFilters } from "@/app/utils/registry";
import NavRail from "./NavRail";
import { IoBookmarkOutline } from "react-icons/io5";
import { toast } from "sonner";
import Overlay from "./Overlay";
import SearchItem from "./SearchItem";
import { v4 as uuid } from "uuid";
import { searchCandidates } from "@/app/utils/search";
import QueryBar from "./QueryBar";
import ProfileView from "./ProfileView";
import CandidateCompare from "./Compare";
import Modal from "./Modal";
import CandidatePreview from "./CandidatePreview";
import IntroductionFlow from "./IntroductionFlow";
import Preview from "./Preview";
import Urgent, { UrgentRequest } from "./Urgent";

export default function Registry({
  revealsRemaining,
  useReveal,
  selectedProfessionsGate,
}: {
  revealsRemaining: number;
  useReveal: () => void;
  selectedProfessionsGate: Set<string>;
}) {
  const [requests, setRequests] = useState<UrgentRequest[]>([]);
  const [result, setResults] = useState("20");
  const [sort, setSort] = useState<"new" | "most">("new");
  const [query, setQuery] = useState("");
  const [activeView, setActiveView] = useState<ActiveView>("registry");
  const handleRailSelect = useCallback((id: string) => {
    if (
      id === "registry" ||
      id === "directory" ||
      id === "saved" ||
      id === "searches" ||
      id === "recent" ||
      id == "compare" ||
      id == "reveals" ||
      id == "requests" ||
      id == "urgent"
    ) {
      setActiveView(id);

      return;
    }

    // TODO:
    // directory / saved / searches / recent / revealed /
    // introductions / compare / hidden destinations.
  }, []);

  const [saved, setSaved] = useState<string[]>([]);
  const [compare, setCompare] = useState<string[]>([]);

  const [filters, setFilters] = useState<Filters>({
    profession: selectedProfessionsGate ? [...selectedProfessionsGate] : [],
    environment: [],
    shift: [],
    employment: [],
    mobility: [],
    profile: [],
  });

  console.log(filters, selectedProfessionsGate);
  const [reveals, setReveals] = useState<string[]>([]);
  const [recents, setRecents] = useState<string[]>([]);
  const [introduced, setIntroduced] = useState<string[]>([]);
  const [revealing, setRevealing] = useState<Candidate | null>(null);
  const [viewing, setViewing] = useState("");
  const [introducing, setIntroducing] = useState<Candidate | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [highlightActive, setHighlightActive] = useState<string | null>(null);
  const [activePanel, setActivePanel] = useState(false);

  // Close on Escape and lock page scroll while the mobile panel is open
  useEffect(() => {
    if (!filtersOpen) return;
    const onKey = (e: KeyboardEvent) =>
      e.key === "Escape" && setFiltersOpen(false);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [filtersOpen]);
  const [recentSearch, setRecentSearch] = useState<
    { timestamp: string; id: string; search: Filters }[]
  >([]);
  const [toggle, setToggle] = useState(() => selectedProfessionsGate.size > 0);

  const data = useMemo(() => applyFilters(FULL_CANDIDATES, filters), [filters]);
  const count = useMemo(
    () => Object.values(filters).reduce((n, v) => n + v.length, 0),
    [filters],
  );

  const clearFilters = useCallback(
    () =>
      setFilters({
        profession: [],
        environment: [],
        shift: [],
        employment: [],
        mobility: [],
        profile: [],
      }),
    [],
  );

  const onApply = useCallback((next: Filters) => {
    setToggle(true);
    setFilters(next);
  }, []);

  const deleteSearch = (id: string) => {
    setRecentSearch((prev) => prev.filter((search) => search.id !== id));
  };

  const searched = useMemo(() => searchCandidates(data, query), [data, query]);

  const onSave = (id: string) => {
    const isExisting = saved.find((i) => i == id);
    if (isExisting) {
      setSaved((prev) => prev.filter((i) => i != id));
    } else {
      setSaved((prev) => [...prev, id]);
    }
  };
  const onCompare = (id: string) => {
    const isExisting = compare.find((i) => i == id);
    if (isExisting) {
      setCompare((prev) => prev.filter((i) => i != id));
    } else {
      if (compare.length >= 3) {
        return toast.info(
          "You can compare up to 3 professionals at a time — remove one to add another",
        );
      }
      setCompare((prev) => [...prev, id]);
    }
  };

  const onReveal = (c: string) => {
    setReveals((prev) => [...prev, c]);
  };

  const sorted = useMemo(() => {
    if (query.trim()) return searched; // relevance order wins
    const list = [...searched];
    switch (sort) {
      case "new":
        return list.sort((a, b) => a.confirmedDays - b.confirmedDays);
      case "most":
        return list.sort((a, b) => b.years - a.years);
      default:
        return list;
    }
  }, [searched, sort, query]);

  return (
    <>
      {!["compare", "urgent"].includes(activeView) && (
        <QueryBar
          query={query}
          setQuery={(e) => {
            setQuery(e.target.value);
          }}
        />
      )}

      <section className="flex min-h-0 min-w-0 flex-1 flex-col items-stretch gap-2 sm:gap-3 lg:flex-row">
        <NavRail
          active={activeView}
          onSelect={handleRailSelect}
          counts={{
            saved: saved.length,
            compare: compare.length,
            reveals: reveals.length,
            requests: introduced.length,
          }}
        />

        {!["compare", "urgent"].includes(activeView) && (
          <div className="min-w-0 max-w-full">
            <Filtering
              onClear={clearFilters}
              filters={filters}
              setFilters={setFilters}
              setActivatePanel={() => setActivePanel((prev) => !prev)}
              activatePanel={activePanel}
              count={count}
            />
          </div>
        )}

        {/* Saved searches */}
        <Overlay
          open={activeView == "searches"}
          onClose={() => setActiveView("registry")}
          title="Saved Searches"
        >
          {recentSearch.length == 0 && (
            <div className="text-xs text-ink-soft">Empty</div>
          )}

          <div className="flex flex-col gap-1">
            {recentSearch.map((search) => (
              <SearchItem
                key={search.id}
                timestamp={search.timestamp}
                id={search.id}
                search={search.search}
                onApply={() => {
                  onApply(search.search);
                  setActiveView("registry");
                }}
                onDelete={() => deleteSearch(search.id)}
              />
            ))}
          </div>
        </Overlay>

        {/* introductions */}

        <Overlay
          open={activeView == "requests"}
          onClose={() => setActiveView("registry")}
          title="Specialist Requests"
        >
          <div className="flex flex-col gap-1">
            {introduced.map((c) => (
              <Preview
                key={c}
                c={c}
                onViewProfile={() => {
                  setActiveView("registry");
                  setViewing(c);
                }}
                onReveal={(c) => {
                  if (revealsRemaining > 0) setRevealing(c);
                }}
                reveals={reveals}
                onIntroduction={(c) => setIntroducing(c)}
                introduced={introduced}
              />
            ))}
          </div>
        </Overlay>

        {/* Saved professionals */}
        <Overlay
          open={activeView == "saved"}
          onClose={() => setActiveView("registry")}
          title="Saved Professionals"
        >
          {saved.length == 0 && <p className="text-xs text-ink-mid">Empty</p>}

          <div className="min-h-0 space-y-2 overflow-y-auto">
            {saved.map((s) => (
              <Preview
                key={s}
                c={s}
                onViewProfile={() => {
                  setActiveView("registry");
                  setViewing(s);
                }}
                onReveal={(c) => {
                  if (revealsRemaining > 0) setRevealing(c);
                }}
                reveals={reveals}
                onIntroduction={(c) => setIntroducing(c)}
                introduced={introduced}
              />
            ))}
          </div>
        </Overlay>

        {/* Recents */}

        <Overlay
          open={activeView == "recent"}
          onClose={() => setActiveView("registry")}
          title="Recents"
        >
          <div className="min-h-0 space-y-2 overflow-y-auto">
            {recents.map((c) => (
              <Preview
                key={c}
                c={c}
                onViewProfile={() => {
                  setActiveView("registry");
                  setViewing(c);
                }}
                onReveal={(c) => {
                  if (revealsRemaining > 0) setRevealing(c);
                }}
                reveals={reveals}
                onIntroduction={(c) => setIntroducing(c)}
                introduced={introduced}
              />
            ))}
          </div>
        </Overlay>

        {/* Recents */}
        <Overlay
          open={activeView == "reveals"}
          onClose={() => setActiveView("registry")}
          title="Reveals"
        >
          <div className="min-h-0 space-y-2 overflow-y-auto">
            {recents.map((c) => (
              <Preview
                key={c}
                c={c}
                onViewProfile={() => {
                  setActiveView("registry");
                  setViewing(c);
                }}
                onReveal={(c) => {
                  if (revealsRemaining > 0) setRevealing(c);
                }}
                reveals={reveals}
                onIntroduction={(c) => setIntroducing(c)}
                introduced={introduced}
              />
            ))}
          </div>
        </Overlay>

        {/* Reveal modal */}
        <Modal
          open={!!revealing}
          onClose={() => setRevealing(null)}
          title={
            reveals.includes(revealing?.id || "") ? (
              <div className="text-white p-3">
                <p className="text-xs text-forest-light">
                  Demo reveal complete
                </p>
                <p className="font-semibold text-xl mt-3">
                  {revealing?.reveal.name}
                </p>
                <p className="text-[#E8F0E0] text-xs">
                  {revealing?.title} · {revealing?.loc}
                </p>
              </div>
            ) : (
              <div className="text-white p-3">
                <p className="font-serif text-3xl">
                  Reveal contact information for {revealing?.id}?
                </p>
                <p className="text-[#E8F0E0] text-xs">
                  {revealing?.title} · {revealing?.loc}
                </p>
              </div>
            )
          }
        >
          {revealing && (
            <CandidatePreview
              candidate={revealing}
              onCancel={() => setRevealing(null)}
              onReveal={(id) => onReveal(id)}
              revealing={true}
              reveals={reveals}
              deductReveal={useReveal}
              revealsRemaining={revealsRemaining}
            />
          )}
        </Modal>

        {/* Introduction flow */}
        {introducing && (
          <IntroductionFlow
            open={!!introducing}
            onClose={() => setIntroducing(null)}
            role={introducing.title}
            location={introducing.loc}
            fee="250"
            submitting={false}
            onSubmit={(values) => {
              setIntroduced((prev) => [...prev, introducing.id]);
              setIntroducing(null);
            }}
          />
        )}

        {/* Main content */}
        <main className="flex min-h-0 min-w-0 flex-1 flex-col bg-white">
          {!["compare"].includes(activeView) && (
            <>
              {/* Profile or candidate results */}
              {viewing ? (
                <ProfileView
                  viewing={viewing}
                  closed={!revealing}
                  results={sorted.slice(0, +result)}
                  activeView={activeView}
                  setView={(id) => setViewing(id)}
                  onCompare={(id) => onCompare(id)}
                  onSave={(id) => onSave(id)}
                  compare={compare}
                  saved={saved}
                  onClose={() => setViewing("")}
                  setReveal={(c) => setRevealing(c)}
                  reveals={reveals}
                  onIntroduction={(c) => setIntroducing(c)}
                  introduced={introduced}
                />
              ) : (
                activeView != "urgent" && (
                  <div className="min-h-0 min-w-0 flex-1 overflow-y-auto px-4 py-5 sm:px-6 sm:py-6 lg:px-12">
                    {sorted.length == 0 && (
                      <div className="flex flex-col items-center justify-center gap-1 text-center text-sm text-ink-soft">
                        <p>No professional with this record found</p>

                        <button
                          className="cursor-pointer font-semibold text-forest underline"
                          onClick={clearFilters}
                        >
                          Clear filters and try again
                        </button>
                      </div>
                    )}

                    {count > 0 && toggle && (
                      <div className="flex items-center justify-between gap-2 text-xs md:justify-end mb-1">
                        <button
                          className="shrink-0 cursor-pointer font-semibold text-ink-soft underline"
                          onClick={clearFilters}
                        >
                          Clear all
                        </button>
                        <button
                          className="flex shrink-0 cursor-pointer items-center gap-1 rounded-full border border-ash px-3 py-1.5 font-bold text-forest md:py-2"
                          onClick={() => {
                            toast.info("Search saved");
                            setRecentSearch((prev) => [
                              ...prev,
                              {
                                search: filters,
                                timestamp: new Date().toISOString(),
                                id: uuid(),
                              },
                            ]);
                            setToggle(false);
                          }}
                        >
                          <IoBookmarkOutline />
                          <span>Save search</span>
                        </button>
                      </div>
                    )}

                    <div className="flex flex-col gap-3 border-t border-ash md:flex-row md:justify-between py-4 md:items-center md:gap-x-4 md:border-t-0 md:pt-0">
                      <div className="flex items-center justify-between gap-1.5 md:justify-start">
                        <p className="whitespace-nowrap text-xs text-ink-soft">
                          Results per page:
                        </p>
                        <Select
                          options={[
                            { value: "20", label: "20" },
                            { value: "40", label: "40" },
                            { value: "60", label: "60" },
                          ]}
                          onChange={(val) => setResults(val)}
                          value={result}
                        />
                      </div>

                      <div className="flex items-center justify-between gap-1.5 md:justify-start">
                        <p className="whitespace-nowrap text-xs text-ink-soft">
                          Sort:
                        </p>
                        <Select
                          options={[
                            { value: "new", label: "Newest Confirmed" },
                            { value: "most", label: "Most Experienced" },
                          ]}
                          onChange={(val) => setSort(val as "new" | "most")}
                          value={sort}
                        />
                      </div>
                    </div>

                    <div
                      className={`${activePanel ? "sm:grid-cols-1 xl:grid-cols-3 2xl:grid-cols-3" : "sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"} grid grid-cols-1 gap-5`}
                    >
                      <AnimatePresence mode="popLayout" initial={false}>
                        {sorted.slice(0, +result).map((candidate) => (
                          <motion.div
                            key={candidate.id}
                            layout
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{
                              layout: {
                                type: "spring",
                                stiffness: 500,
                                damping: 40,
                              },
                              opacity: { duration: 0.2 },
                            }}
                          >
                            <CandidateCard
                              c={candidate}
                              key={candidate.id}
                              saved={saved}
                              onSave={(id) => onSave(id)}
                              onCompare={(id) => onCompare(id)}
                              onProfileView={() => {
                                setRecents((prev) => {
                                  const val = new Set([...prev, candidate.id]);
                                  return [...val];
                                });
                                setViewing(candidate.id);
                              }}
                              onReveal={(c) => {
                                if (revealsRemaining > 0) setRevealing(c);
                              }}
                              reveals={reveals}
                              onIntroduction={(c) => setIntroducing(c)}
                              highlightActive={highlightActive == candidate.id}
                              setHighlightActive={(id) => {
                                setHighlightActive((prev) =>
                                  prev == id ? null : id,
                                );
                              }}
                              introduced={introduced}
                            />
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  </div>
                )
              )}
            </>
          )}

          {/* Compare view */}
          {activeView == "compare" && (
            <div className="min-h-0 min-w-0 flex-1 overflow-y-auto px-4 py-5 sm:px-6 sm:py-6 lg:px-7">
              <CandidateCompare
                ids={compare}
                onViewProfile={(id) => {
                  setActiveView("registry");
                  setViewing(id);
                }}
                onRemove={(id) => onCompare(id)}
              />
            </div>
          )}

          {/* Urgent Hiring */}
          {activeView === "urgent" && !viewing && (
            <Urgent
              onViewProfile={(c) => setViewing(c.id)}
              requests={requests}
              setRequests={setRequests}
            />
          )}
        </main>
      </section>
    </>
  );
}
