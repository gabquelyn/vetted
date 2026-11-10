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
import {
  applyFilters,
  matchesLocation,
  withMobilityFlags,
} from "@/app/utils/registry";
import NavRail from "./NavRail";
import { toast } from "sonner";
import Overlay from "./Overlay";
import SearchItem from "./SearchItem";
import { v4 as uuid } from "uuid";
import { searchCandidates, suggestBroadening } from "@/app/utils/search";
import QueryBar from "./QueryBar";
import HideChoice from "./HideChoice";
import ProfileView from "./ProfileView";
import CandidateCompare from "./Compare";
import Modal from "./Modal";
import CandidatePreview from "./CandidatePreview";
import IntroductionFlow from "./IntroductionFlow";
import Preview from "./Preview";
import Urgent, { UrgentRequest, INCLUDED_REQUESTS } from "./Urgent";
import RevealedPreview from "./RevealedPreview";
import ActiveFilters from "./ActiveFilters";
import Pagination from "./Pagination";
import { TourController } from "./TourController";
import { locationMatch } from "@/app/utils/geo";

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
  selectedProfessionsGate: Set<ProfessionCode>;
  gateDone: boolean;
}) {
  const [requests, setRequests] = useState<UrgentRequest[]>([]);
  // Urgent requests available: 2 included, +2 per completed simulated top-up (resets on reload)
  const [urgentAllowance, setUrgentAllowance] = useState(INCLUDED_REQUESTS);
  const [urgentSelected, setUrgentSelected] = useState<string | null>(null);
  // View to return to when the open profile is closed (set when a profile is opened from Urgent)
  const [returnTo, setReturnTo] = useState<ActiveView | null>(null);
  const [result, setResults] = useState("20");
    const [viewAll, setViewAll] = useState(false);
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
      setViewAll(false);
      setReturnTo(null);
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
    openTo: [],
    confirmed: [],
    skills: [],
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
  const [radius, setRadius] = useState(25);
  const [toggle, setToggle] = useState(() => selectedProfessionsGate.size > 0);
  const [location, setLocation] = useState("");
  const [resolved, setResolved] = useState<string | null>(null);

  // Where the open profile came from. Only profiles opened from the Registry results are
  // reconciled with the search; ones opened from Saved / Hidden / Recents / Introductions /
  // Compare / Urgent are inspected on their own.
  const [profileCtx, setProfileCtx] = useState<"registry" | "other">("registry");
  const openOther = (id: string) => {
    setProfileCtx("other");
    setViewing(id);
  };

  // Search inside the revealed workspace (profile view over revealed professionals).
  // Separate from the Registry's own search, which is left untouched.
  const [wsTerms, setWsTerms] = useState<string[]>([]);
  const [wsQuery, setWsQuery] = useState("");
  const [wsLocation, setWsLocation] = useState("");
  const [wsResolved, setWsResolved] = useState<string | null>(null);
  const [wsRadius, setWsRadius] = useState(25);

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
  const [recentSearch, setRecentSearch] = useState<Search[]>([]);

  const MAX_HISTORY = 5;

  const [searchHistory, setSearchHistory] = useState<Search[]>([]);
  const lastSignature = useRef<string | null>(null);

  // Everyone who passes the filters and the location, before any keyword is applied
  const pool = useMemo(
    () =>
      applyFilters(
        FULL_CANDIDATES.map(withMobilityFlags).filter(
          (candidate) =>
            candidate.discoverable !== false && !hidden.includes(candidate.id),
        ),
        filters,
      ).filter((c) => locationMatch(c, location, radius) !== null),
    [filters, hidden, location, radius],
  );

  // One card per person whenever no profession is selected, for every kind of criterion
  // (keywords, availability, shift...). A profession filter shows each profile on its own.
  // Siblings that also match are kept for the card's "Also matches as ..." note.
  const folded = useMemo(() => {
    const matched = searchCandidates(pool, terms);
    if (filters.profession.length > 0) {
      return { list: matched, siblings: new Map<string, Candidate[]>() };
    }
    const primary = new Map<string, Candidate>(); // person -> the card kept
    const siblings = new Map<string, Candidate[]>(); // kept card id -> other matching profiles
    const list: Candidate[] = [];
    for (const c of matched) {
      const key = c.personId ?? c.id;
      const kept = primary.get(key);
      if (!kept) {
        primary.set(key, c);
        list.push(c);
      } else {
        siblings.set(kept.id, [...(siblings.get(kept.id) ?? []), c]);
      }
    }
    return { list, siblings };
  }, [pool, terms, filters.profession]);
  const data = folded.list;

  // Empty result with several terms: offer (never apply) a search with one term dropped
  const broader = useMemo(
    () => (data.length === 0 ? suggestBroadening(pool, terms) : null),
    [data, pool, terms],
  );
  const broaderCount = useMemo(
    () => (broader ? searchCandidates(pool, broader).length : 0),
    [broader, pool],
  );

  useEffect(() => {
    // Nothing to remember when browsing with no criteria
    const hasCriteria =
      terms.length > 0 ||
      location.trim() !== "" ||
      Object.values(filters).some((g) => g.length > 0);
    if (!hasCriteria) {
      lastSignature.current = null;
      return;
    }

    // Same set of candidates as the last saved search -> not a different result
    const signature = data
      .map((c) => c.id)
      .sort()
      .join("|");
    if (signature === lastSignature.current) return;

    // Debounce so typing or ticking several filters saves one search, not each step
    const timer = setTimeout(() => {
      lastSignature.current = signature;
      setSearchHistory((prev) =>
        [
          {
            terms,
            filters,
            location,
            radius,
            count: data.length,
            timestamp: new Date().toISOString(),
            id: uuid(),
          },
          ...prev,
        ].slice(0, MAX_HISTORY),
      );
    }, 800);

    return () => clearTimeout(timer);
  }, [data, terms, filters, location, radius]);

  const sortedHistory = useMemo(
    () =>
      [...searchHistory].sort(
        (a, b) => +new Date(b.timestamp) - +new Date(a.timestamp),
      ),
    [searchHistory],
  );

  const sortedSearches = useMemo(
    () =>
      [...recentSearch].sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
      ),
    [recentSearch],
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
      openTo: [],
      confirmed: [],
      skills: [],
    });
    setTerms([]);
    setLocation("");
    setResolved(null);
    setRadius(25);
    setQuery("");
  }, []);

  const onApply = useCallback(
    (next: {
      filters: Filters;
      location: string;
      radius: number;
      terms: string[];
    }) => {
      setToggle(true);
      setFilters(next.filters);
      setLocation(next.location);
      setRadius(next.radius);
      setTerms(next.terms);
    },
    [],
  );

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

  const deleteHistorySearch = (id: string) => {
    setSearchHistory((prev) => prev.filter((search) => search.id !== id));
  };

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

  // Revealed designations only: every profile of a revealed person, in reveal order,
  // including ones hidden after the reveal; never non-discoverable profiles.
  const revealedProffesionals = useMemo(
    () =>
      FULL_CANDIDATES.filter(
        (c) => c.discoverable !== false && reveals.includes(c.personId || c.id),
      ).sort(
        (a, b) =>
          reveals.indexOf(a.personId || a.id) -
          reveals.indexOf(b.personId || b.id),
      ),
    [reveals],
  );
  const revealedCount = useMemo(
    () => new Set(revealedProffesionals.map((c) => c.personId || c.id)).size,
    [revealedProffesionals],
  );

  // The workspace rail: the revealed population narrowed by keyword and Location / Radius only
  const wsResults = useMemo(
    () =>
      searchCandidates(revealedProffesionals, wsTerms).filter(
        (c) => locationMatch(c, wsLocation, wsRadius) !== null,
      ),
    [revealedProffesionals, wsTerms, wsLocation, wsRadius],
  );

  const openRevealedWorkspace = () => {
    const first = revealedProffesionals[0];
    if (!first) return;
    setWsTerms([]);
    setWsQuery("");
    setWsLocation("");
    setWsResolved(null);
    setWsRadius(25);
    setViewAll(true);
    setViewing(first.id);
    setActiveView("registry");
  };

  const sorted = useMemo(() => {
    // if (query.trim()) return searched; // relevance order wins
    const list = [...data];
    switch (sort) {
      case "new":
        return list.sort((a, b) => a.confirmedDays - b.confirmedDays);
      case "most":
        return list.sort((a, b) => b.years - a.years);
      default:
        return list;
    }
  }, [data, sort]);

  const [page, setPage] = useState(1);

  // Back to page 1 whenever the filters or hidden list change.
  // Done during render rather than in an effect, so there's no extra flash.
  const [prev, setPrev] = useState({ filters, hidden });
  if (prev.filters !== filters || prev.hidden !== hidden) {
    setPrev({ filters, hidden });
    setPage(1);
  }

  const PAGE_SIZE = +result;

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages); // safety clamp
  const pageResults = sorted.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  // ---- Hide acts on designations ----
  const [hideChoice, setHideChoice] = useState<{
    from: string;
    options: Candidate[];
  } | null>(null);

  /** Hides designations: they leave discovery and Compare. Reveal history is untouched. */
  const hideIds = (ids: string[]) => {
    setHidden((prev) => [...new Set([...prev, ...ids])]);
    setCompare((prev) => prev.filter((id) => !ids.includes(id)));
    // Leaving the hidden profile: go to another visible result, or back to the list
    if (!viewAll && ids.includes(viewing)) {
      setViewing(pageResults.find((c) => !ids.includes(c.id))?.id ?? "");
    }
  };

  /** Hide from a card or profile. Two or more discoverable designations -> ask which. */
  const requestHide = (id: string) => {
    if (hidden.includes(id)) return onHide(id); // restore: just that designation
    const c = FULL_CANDIDATES.find((x) => x.id === id);
    if (!c) return;
    const options = FULL_CANDIDATES.filter(
      (x) =>
        (x.personId ?? x.id) === (c.personId ?? c.id) &&
        x.discoverable !== false &&
        !hidden.includes(x.id),
    );
    if (options.length >= 2) setHideChoice({ from: id, options });
    else hideIds([id]);
  };

  const clearWsSearch = () => {
    setWsTerms([]);
    setWsQuery("");
    setWsLocation("");
    setWsResolved(null);
    setWsRadius(25);
  };

  // A search or filter change alters the result set, never the workspace mode. If the open
  // profile (opened from the Registry results) stops matching:
  //  - other results exist -> show the first one on this page, with a toast
  //  - nothing matches -> stay on the profile, marked as a stale reference
  const siblingIds = useMemo(
    () => new Set([...folded.siblings.values()].flat().map((c) => c.id)),
    [folded],
  );
  // Adjusted while rendering (no effect): the notice is tied to the profile it was raised for,
  // so it disappears as soon as the employer opens a different one.
  const [profileNotice, setProfileNotice] = useState<{ id: string; text: string } | null>(null);
  if (
    viewing &&
    !viewAll &&
    profileCtx === "registry" &&
    activeView === "registry" &&
    pageResults.length > 0 &&
    !pageResults.some((c) => c.id === viewing) &&
    !siblingIds.has(viewing)
  ) {
    const next = pageResults[0].id;
    setProfileNotice({
      id: next,
      text: sorted.some((c) => c.id === viewing)
        ? "That professional is on a different results page — showing the first match on this page."
        : "That professional no longer matches your filters — showing the next match.",
    });
    setViewing(next);
  }

  const profileStale =
    !!viewing &&
    (viewAll
      ? wsResults.length === 0 &&
        (wsTerms.length > 0 || wsLocation.trim() !== "")
      : profileCtx === "registry" && sorted.length === 0);

  const goToPage = (p: number) => {
    setPage(p);
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // The chip row: shown above the results, and also while a profile is open
  const activeChips = (
    <ActiveFilters
      filters={filters}
      setFilters={setFilters}
      onClear={clearFilters}
      location={{ radius, location, resolved: !!resolved }}
      onSave={() => {
        toast.info("Search saved");
        setRecentSearch((prev) => [
          ...prev,
          {
            filters,
            timestamp: new Date().toISOString(),
            id: uuid(),
            location,
            radius,
            terms,
          },
        ]);
        setToggle(false);
      }}
      terms={terms}
      removeTerm={(term: string) =>
        setTerms(terms.filter((t) => t !== term))
      }
      removeLoc={() => {
        setLocation("");
        setResolved(null);
        setRadius(25);
      }}
    />
  );

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
          // In the revealed workspace the bar searches only the revealed professionals,
          // by keyword and Location / Radius, and leaves the Registry search alone
          keywordOnly={viewAll}
          query={viewAll ? wsQuery : query}
          location={viewAll ? wsLocation : location}
          setLocation={viewAll ? setWsLocation : setLocation}
          radiusKm={viewAll ? wsRadius : radius}
          setRadius={viewAll ? setWsRadius : setRadius}
          setQuery={(e) => {
            if (viewAll) setWsQuery(e);
            else setQuery(e);
          }}
          onResolveLoc={(e) => (viewAll ? setWsResolved(e) : setResolved(e))}
          resolved={viewAll ? wsResolved : resolved}
          terms={viewAll ? wsTerms : terms}
          onTermsChange={(t) => (viewAll ? setWsTerms(t) : setTerms(t))}
          filters={filters}
          setFilters={viewAll ? () => {} : setFilters}
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

        {!["compare", "urgent"].includes(activeView) && !viewAll && (
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
          <p className="text-[.6rem] uppercase text-ink-soft leading-1 mb-2">
            Saved searches
          </p>

          {recentSearch.length == 0 && (
            <div className="text-xs text-ink-soft h-60 flex items-center justify-center">
              <p>Save a search from the Filter Dock to keep it here.</p>
            </div>
          )}

          <div className="flex flex-col gap-1">
            {sortedSearches.map((search) => (
              <SearchItem
                key={search.id}
                timestamp={search.timestamp}
                id={search.id}
                search={search}
                onApply={() => {
                  onApply(search);
                  setActiveView("registry");
                }}
                onDelete={() => deleteSearch(search.id)}
                setResolved={setResolved}
              />
            ))}
          </div>

          <p className="text-[.6rem] uppercase text-ink-soft leading-1 my-2 mt-4">
            Recent history
          </p>
          <div className="flex flex-col gap-1">
            {sortedHistory.map((search) => (
              <SearchItem
                key={search.id}
                timestamp={search.timestamp}
                id={search.id}
                search={search}
                setResolved={setResolved}
                onApply={() => {
                  onApply(search);
                  setActiveView("registry");
                }}
                onDelete={() => deleteHistorySearch(search.id)}
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
                  openOther(s);
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
          title="Introductions"
        >
          <div className="flex flex-col gap-1">
            {introduced.map((c) => (
              <Preview
                key={c}
                c={c}
                onViewProfile={() => {
                  setActiveView("registry");
                  openOther(c);
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
                  openOther(s);
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
                  openOther(c);
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
                onClick={openRevealedWorkspace}
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
                onViewProfile={(c) => {
                  setViewAll(true);
                  setActiveView("registry");
                  setViewing(c.id);
                }}
                reveals={reveals}
                onViewSibling={(c) => {
                  setViewAll(true);
                  setActiveView("registry");
                  setViewing(c.id);
                }}
              />
            ))}
          </div>
        </Overlay>

        {/* Reveal modal */}
        <Modal
          open={!!revealing}
          onClose={() => setRevealing(null)}
          title={
            reveals.includes(revealing?.personId || revealing?.id || "") ? (
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
                openOther(sibling.id);
              }}
              revealing={true}
              reveals={reveals}
              deductReveal={useReveal}
              revealsRemaining={revealsRemaining}
            />
          )}
        </Modal>

        {/* Which designation to hide */}
        {hideChoice && (
          <HideChoice
            options={hideChoice.options}
            initialId={hideChoice.from}
            reveals={reveals}
            onClose={() => setHideChoice(null)}
            onConfirm={(ids) => {
              hideIds(ids);
              setHideChoice(null);
            }}
          />
        )}

        {/* Introduction flow */}
        {introducing && (
          <IntroductionFlow
            open={!!introducing}
            onClose={() => setIntroducing(null)}
            role={introducing.title}
            location={introducing.loc}
            submitting={false}
            onSubmit={(values) => {
              // recorded when the simulated payment is made; the flow closes itself on Done
              setIntroduced((prev) => [...prev, introducing.id]);
            }}
          />
        )}

        {/* Main content */}
        <main className="flex min-h-0 min-w-0 flex-1 flex-col bg-white">
          {!viewing && activeView == "registry" && (
            <p className="text-xs py-3 text-ink-soft px-8 lg:px-12 font-semibold">
              {data.length} {data.length == 0 ? "results" : "professionals"}
            </p>
          )}

          {viewing && viewAll && (
            <p className="px-8 py-3 text-xs font-semibold text-ink-soft lg:px-12">
              {revealedCount} revealed {revealedCount === 1 ? "person" : "people"}
              {wsResults.length !== revealedProffesionals.length &&
                ` · ${wsResults.length} shown`}
            </p>
          )}

          {!["compare", "urgent"].includes(activeView) && (
            <>
              {/* Profile or candidate results */}
              {viewing ? (
                <div className="flex min-h-0 flex-1 flex-col">
                  {!viewAll && (
                    <div className="px-4 pt-1 text-xs text-[#8a8a84] sm:px-6 lg:px-12">
                      {activeChips}
                    </div>
                  )}
                  <div className="min-h-0 flex-1">
                <ProfileView
                  viewing={viewing}
                  closed={!revealing}
                  results={
                    viewAll ? wsResults : pageResults.slice(0, +result)
                  }
                  activeView={activeView}
                  setView={(id) => {
                    setProfileCtx("registry");
                    setViewing(id);
                  }}
                  onOpenSibling={(c) => openOther(c.id)}
                  stale={profileStale}
                  notice={profileNotice?.id === viewing ? profileNotice.text : undefined}
                  onClearChanges={viewAll ? clearWsSearch : clearFilters}
                  emptyMessage={
                    viewAll
                      ? "No revealed professionals match this search."
                      : "No professionals match your current search."
                  }
                  staleMessage={
                    viewAll
                      ? "This professional no longer matches this search."
                      : "This professional no longer matches your current search."
                  }
                  clearLabel={viewAll ? "Clear search →" : "Clear recent changes →"}
                  onCompare={(id) => onCompare(id)}
                  onSave={(id) => onSave(id)}
                  compare={compare}
                  saved={saved}
                  allRevealed={viewAll}
                  onClose={
                    viewAll
                      ? () => {
                          setViewing("");
                          setViewAll(false);
                          setActiveView("reveals");
                        }
                      : () => {
                          setViewing("");
                          if (returnTo) {
                            setActiveView(returnTo);
                            setReturnTo(null);
                          }
                        }
                  }
                  setReveal={(c) => setRevealing(c)}
                  reveals={reveals}
                  onIntroduction={(c) => setIntroducing(c)}
                  introduced={introduced}
                  onHide={requestHide}
                  hidden={hidden}
                  totalPages={totalPages}
                  total={total}
                  page={page}
                  onPageChange={goToPage}
                  terms={viewAll ? wsTerms : terms}
                />
                  </div>
                </div>
              ) : (
                activeView != "urgent" && (
                  <div className="min-h-0 min-w-0 flex-1 overflow-y-auto px-4 pb-2 sm:px-6 lg:px-12">
                    {/* FIltering and filter tag pills */}

                    <div className="mb-2 mx-0.5 text-xs text-[#8a8a84]">
                      {activeChips}
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
                      {resolved && (
                        <p className="text-forest text-xs font-semibold mb-2">
                          Within {radius} km of {resolved}
                        </p>
                      )}
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
                                  setProfileCtx("registry");
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
                                onHide={requestHide}
                                terms={terms}
                                compared={compare.includes(candidate.id)}
                                siblings={folded.siblings.get(candidate.id)}
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
                        {broader && (
                          <>
                            <button
                              type="button"
                              onClick={() => setTerms(broader)}
                              className="my-1 cursor-pointer rounded-full border-none bg-forest-light px-4 py-2 text-[13px] font-bold text-[#16260c] transition-colors hover:bg-[#dcead0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
                            >
                              Search {broader.map((t) => `“${t}”`).join(", ")} only
                              ({broaderCount})
                            </button>
                            <br />
                            <span className="text-xs">
                              Nothing matches{" "}
                              {terms.map((t) => `“${t}”`).join(" + ")} together.
                              Your filters stay as they are.
                            </span>
                            <br />
                          </>
                        )}
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
                clearComparison={() => setCompare([])}
                onViewProfile={(id) => {
                  setActiveView("registry");
                  openOther(id);
                }}
                onRemove={(id) => onCompare(id)}
                reveals={reveals}
                onReveal={(c) => setRevealing(c)}
              />
            </div>
          )}

          {/* Urgent Hiring */}
          {activeView === "urgent" && (
            <Urgent
              onViewProfile={(c) => {
                setReturnTo("urgent");
                setActiveView("registry");
                openOther(c.id);
              }}
              selectedId={urgentSelected}
              setSelectedId={setUrgentSelected}
              requests={requests}
              setRequests={setRequests}
              allowance={urgentAllowance}
              onTopUp={() => setUrgentAllowance((n) => n + 2)}
              introduced={introduced}
              setIntroduction={(c) => setIntroducing(c)}
              revealed={reveals}
              onRevealing={(c) => setRevealing(c)}
            />
          )}
        </main>
      </section>
    </>
  );
}