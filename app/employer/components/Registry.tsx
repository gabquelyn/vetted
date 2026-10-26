"use client";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Candidate, FULL_CANDIDATES } from "@/app/data/registry";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import CandidateCard from "./CanCard";
import Select from "@/app/components/CustomSelect";
import Filtering from "./Filtering";
import { applyFilters } from "@/app/utils/registry";
import NavRail from "./NavRail";
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
import RevealedPreview from "./RevealedPreview";
import ActiveFilters from "./ActiveFilters";
import Pagination from "./Pagination";
import { TourController } from "./TourController";

const CARD = 316;
const GAP = 16;
const MAX_COLS = 4;

export default function Registry({
  revealsRemaining,
  gateDone,
  useReveal,
  selectedProfessionsGate,
}: {
  revealsRemaining: number;
  useReveal: () => void;
  selectedProfessionsGate: Set<string>;
  gateDone: boolean;
}) {
  const [requests, setRequests] = useState<UrgentRequest[]>([]);
  const [result, setResults] = useState("20");
  const [sort, setSort] = useState<"new" | "most">("new");
  const [query, setQuery] = useState("");
  const [activeView, setActiveView] = useState<ActiveView>("registry");
  const handleRailSelect = useCallback((id: string) => {
    if (
      id === "registry" ||
      id === "saved" ||
      id === "searches" ||
      id === "recent" ||
      id == "compare" ||
      id == "reveals" ||
      id == "requests" ||
      id == "urgent" ||
      id == "hidden"
    ) {
      setActiveView(id);

      return;
    }

    if (id === "directory") {
      toast.info("Directory browsing unavailable in demo");
    }

    // TODO:
    // directory / saved / searches / recent / revealed /
    // introductions / compare / hidden destinations.
  }, []);

  const [saved, setSaved] = useState<string[]>([]);
  const [compare, setCompare] = useState<string[]>([]);

  const [filters, setFilters] = useState<Filters>({
    profession: [],
    environment: [],
    shift: [],
    employment: [],
    mobility: [],
    profile: [],
    availability: [],
  });

  const [reveals, setReveals] = useState<string[]>([]);
  const [hidden, setHidden] = useState<string[]>([]);
  const [recents, setRecents] = useState<string[]>([]);
  const [introduced, setIntroduced] = useState<string[]>([]);
  const [revealing, setRevealing] = useState<Candidate | null>(null);
  const [viewing, setViewing] = useState("");
  const [terms, setTerms] = useState<string[]>([]);
  const [introducing, setIntroducing] = useState<Candidate | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [highlightActive, setHighlightActive] = useState<string | null>(null);
  const [activePanel, setActivePanel] = useState(false);
  const [toggle, setToggle] = useState(() => selectedProfessionsGate.size > 0);
  const [viewAll, setViewAll] = useState(false);

  const gateProfessions = selectedProfessionsGate
    ? [...selectedProfessionsGate]
    : [];
  const gateKey = [...gateProfessions].sort().join("|");

  const [prevGateKey, setPrevGateKey] = useState(gateKey);
  if (gateKey !== prevGateKey) {
    setPrevGateKey(gateKey);
    if (gateProfessions.length > 0) {
      setToggle(true);
      setFilters((f) => ({ ...f, profession: gateProfessions }));
    }
  }
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

  const data = useMemo(
    () =>
      applyFilters(
        FULL_CANDIDATES.filter((candidate) => !hidden.includes(candidate.id)),
        filters,
      ),
    [filters, hidden],
  );

  const count = useMemo(
    () => Object.values(filters).reduce((n, v) => n + v.length, 0),
    [filters],
  );

  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [width, setWidth] = useState<number | null>(null);

  // Track the grid's available width. setState only happens in the observer callback.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) =>
      setWidth(entry.contentRect.width),
    );
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const total = data.length;
  const cols =
    width === null
      ? null
      : Math.min(
          MAX_COLS,
          Math.max(1, Math.floor((width + GAP) / (CARD + GAP))),
        );

  // Whole result set fits in one row of the current column capacity -> centre it
  const singleRow = cols !== null && total > 0 && total <= cols;

  const clearFilters = useCallback(() => {
    setFilters({
      profession: [],
      environment: [],
      shift: [],
      employment: [],
      mobility: [],
      profile: [],
      availability: [],
    });
    setTerms([]);
  }, []);

  const onApply = useCallback((next: Filters) => {
    setToggle(true);
    setFilters(next);
  }, []);

  const onHide = (id: string) => {
    const existing = hidden.find((h) => h == id);
    if (!existing) {
      setHidden((prev) => [...prev, id]);
    } else {
      setHidden((prev) => prev.filter((k) => k !== id));
    }
  };

  const deleteSearch = (id: string) => {
    setRecentSearch((prev) => prev.filter((search) => search.id !== id));
  };

  const searched = useMemo(() => searchCandidates(data, terms), [data, terms]);

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

  const revealedProffesionals = useMemo(
    () =>
      reveals
        .map((id) => FULL_CANDIDATES.find((c) => c.id === id))
        .filter((c): c is Candidate => c !== undefined),
    [reveals],
  );

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

  const [page, setPage] = useState(1);

  // Back to page 1 whenever the filters or hidden list change.
  // Done during render rather than in an effect, so there's no extra flash.
  const [prev, setPrev] = useState({ filters, hidden });
  if (prev.filters !== filters || prev.hidden !== hidden) {
    setPrev({ filters, hidden });
    setPage(1);
  }

  const PAGE_SIZE = +result;

  const totalPages = Math.max(1, Math.ceil(data.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages); // safety clamp
  const pageResults = sorted.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const goToPage = (p: number) => {
    setPage(p);
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <TourController
        activeView={activeView}
        condition={gateDone}
        surface={
          activePanel
            ? "results-pinned"
            : viewing
              ? "profile"
              : gateDone
                ? "results"
                : undefined
        }
      />
      {!["compare", "urgent"].includes(activeView) && (
        <QueryBar
          query={query}
          setQuery={(e) => {
            setQuery(e);
          }}
          terms={terms}
          onTermsChange={(t) => setTerms(t)}
          onBuild={() =>
            toast.info(
              "AI-assisted search construction is available in the full Employer Workspace.",
            )
          }
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
            hidden: hidden.length,
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

        {/* hidden professionals */}
        <Overlay
          open={activeView == "hidden"}
          onClose={() => setActiveView("registry")}
          title="Hidden"
        >
          {hidden.length == 0 && (
            <div className="text-xs text-ink-soft">Empty</div>
          )}

          <div className="flex flex-col gap-1">
            {hidden.map((s) => (
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
                onRemove={onHide}
                removeLabel="Restore"
                meta="Hidden from your Registry results — private to your workspace only."
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
                onRemove={onSave}
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

        {/* Revealed professionals */}
        <Overlay
          open={activeView == "reveals"}
          onClose={() => setActiveView("registry")}
          title="Revealed Professionals"
        >
          <div className="pb-3 pt-1">
            {reveals.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  setViewAll(true);
                  setActiveView("registry");
                  setViewing(reveals[0]);
                }}
                className="flex w-full cursor-pointer items-center gap-1.5 rounded-[9px] border border-[#ece7da] bg-[#f6f3ea] px-3.25 py-2.5 text-left text-[12.5px] font-bold text-forest transition-colors hover:bg-[#eee9db] focus-visible:bg-[#eee9db] focus-visible:outline-none"
              >
                View all revealed professionals{" "}
                <span aria-hidden="true">→</span>
              </button>
            )}
          </div>
          <div className="min-h-0 space-y-2 overflow-y-auto">
            {reveals.map((c) => (
              <RevealedPreview
                key={c}
                c={c}
                onViewProfile={() => {
                  setActiveView("registry");
                  setViewing(c);
                }}
                reveals={reveals}
                onViewSibling={(c) => setViewing(c.id)}
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
              /* .vr-identity-block */
              <div className="bg-[#16260c] pb-5 pl-8 pr-24 pt-5.5 text-white">
                <div className="mb-1.5 text-[10px] font-bold uppercase tracking-[.05em] text-[#B9D8A0]">
                  ✓ Demo Reveal complete
                </div>
                <div className="mb-0.5 mt-1.5 text-[21px] font-bold">
                  {revealing?.reveal.name}
                </div>
                <div className="text-[13.5px] text-white/75">
                  {revealing?.title} · {revealing?.loc}
                </div>
              </div>
            ) : (
              /* .vr-top */
              <div className="bg-[#16260c] py-6.5 pl-8 pr-24 text-white">
                <div className="mb-1.5 text-[10px] font-bold uppercase tracking-[.05em] text-white/55">
                  Demo Reveal
                </div>
                <div className="font-serif text-[26px] font-semibold leading-tight">
                  Reveal contact information for {revealing?.id}?
                </div>
                <div className="mt-0.75 text-[12.5px] text-[#B9D8A0]">
                  {revealing?.title} · {revealing?.loc}
                </div>
              </div>
            )
          }
        >
          {revealing && (
            <CandidatePreview
              candidate={revealing}
              onCancel={() => setRevealing(null)}
              onReveal={(id) => onReveal(id)}
              onOpenSibling={(sibling) => {
                setRevealing(null);
                setViewing(sibling.id);
              }}
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
          {!viewing && activeView == "registry" && (
            <p className="text-xs py-3 text-ink-soft px-8 lg:px-12 font-semibold">
              {pageResults.length} results
            </p>
          )}

          {!["compare"].includes(activeView) && (
            <>
              {/* Profile or candidate results */}
              {viewing ? (
                <ProfileView
                  viewing={viewing}
                  closed={!revealing}
                  results={
                    viewAll
                      ? revealedProffesionals
                      : pageResults.slice(0, +result)
                  }
                  activeView={activeView}
                  setView={(id) => setViewing(id)}
                  onCompare={(id) => onCompare(id)}
                  onSave={(id) => onSave(id)}
                  compare={compare}
                  saved={saved}
                  onClose={
                    viewAll
                      ? () => {
                          setViewing("");
                          setViewAll(false);
                          setActiveView("reveals");
                        }
                      : () => setViewing("")
                  }
                  setReveal={(c) => setRevealing(c)}
                  reveals={reveals}
                  onIntroduction={(c) => setIntroducing(c)}
                  introduced={introduced}
                  onHide={onHide}
                  hidden={hidden}
                  totalPages={totalPages}
                  total={total}
                  page={page}
                  onPageChange={goToPage}
                  terms={terms}
                />
              ) : (
                activeView != "urgent" && (
                  <div className="min-h-0 min-w-0 flex-1 overflow-y-auto px-4 pb-2 sm:px-6 lg:px-12">
                    {/* FIltering and filter tag pills */}

                    <div className="mb-2 mx-0.5 text-xs text-[#8a8a84]">
                      <ActiveFilters
                        filters={filters}
                        setFilters={setFilters}
                        onClear={clearFilters}
                        onSave={() => {
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
                        terms={terms}
                        removeTerm={(term: string) =>
                          setTerms(terms.filter((t) => t !== term))
                        }
                      />
                      <div className="hidden md:flex justify-end gap-3 py-2">
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
                    </div>

                    <div className="mx-auto w-full min-w-0 max-w-340">
                      <div
                        ref={ref}
                        className="grid items-start gap-4"
                        style={{
                          gridTemplateColumns: singleRow
                            ? `repeat(${total}, minmax(0, ${CARD}px))`
                            : `repeat(auto-fill, minmax(0, ${CARD}px))`,
                          justifyContent: singleRow ? "center" : "start",
                        }}
                      >
                        <AnimatePresence mode="popLayout" initial={false}>
                          {pageResults.map((candidate) => (
                            <motion.div
                              key={candidate.id}
                              data-tour="card-row"
                              layout
                              // cardIn: opacity 0 + 8px down -> in place, .4s ease
                              initial={
                                reduceMotion ? false : { opacity: 0, y: 8 }
                              }
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0 }}
                              transition={{
                                duration: 0.4,
                                ease: [0.25, 0.1, 0.25, 1],
                                // filtering / sorting / pinning Filters slides cards to their new spots
                                layout: reduceMotion
                                  ? { duration: 0 }
                                  : {
                                      type: "spring",
                                      stiffness: 500,
                                      damping: 40,
                                    },
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
                                    const val = new Set([
                                      ...prev,
                                      candidate.id,
                                    ]);
                                    return [...val];
                                  });
                                  setViewing(candidate.id);
                                }}
                                onReveal={(c) => {
                                  if (revealsRemaining > 0) setRevealing(c);
                                }}
                                reveals={reveals}
                                onIntroduction={(c) => setIntroducing(c)}
                                highlightActive={
                                  highlightActive == candidate.id
                                }
                                setHighlightActive={(id) => {
                                  setHighlightActive((prev) =>
                                    prev == id ? null : id,
                                  );
                                }}
                                introduced={introduced}
                                onHide={onHide}
                                terms={terms}
                              />
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Pagination */}
                    <Pagination
                      page={currentPage}
                      totalPages={totalPages}
                      onPageChange={goToPage}
                    />

                    {sorted.length == 0 && (
                      <div className="col-span-full rounded-2xl border border-dashed border-ash bg-white p-12 mt-4 text-center text-[13.5px] leading-[1.8] text-[#8a8a84]">
                        No professionals in this demo&apos;s sample set match
                        this combination of filters.
                        <br />
                        <button
                          type="button"
                          onClick={clearFilters}
                          className="cursor-pointer border-none bg-transparent p-0 text-[13.5px] font-semibold text-forest underline transition-colors hover:text-[#1e3a0f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
                        >
                          Clear filters and try again →
                        </button>
                      </div>
                    )}
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
