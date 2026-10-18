/// <reference types="google.maps" />
"use client";
import { useEffect, useRef, useState } from "react";
import { DEMO_ONLY_ONTARIO_MUNICIPALITIES, PROFESSIONS } from "./data";
import Success from "./Success";
import Form from "./Form";
import CTA from "./CTA";

const OTHER_PROFESSION = "Other healthcare profession";
export default function JoinSection() {
  const [navScrolled, setNavScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setNavScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const [modalOpen, setModalOpen] = useState(false);
  const modalBoxRef = useRef<HTMLDivElement | null>(null);
  const lastTriggerRef = useRef<HTMLElement | null>(null);

  function closeModal() {
    setModalOpen(false);
    lastTriggerRef.current?.focus();
  }

  useEffect(() => {
    if (!modalOpen) return;
    document.body.style.overflow = "hidden";
    modalBoxRef.current?.focus();

    function focusableEls(): HTMLElement[] {
      const box = modalBoxRef.current;
      if (!box) return [];
      return Array.from(
        box.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((el) => !el.hasAttribute("hidden") && el.offsetParent !== null);
    }
    function onKeydown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        closeModal();
        return;
      }
      if (e.key === "Tab") {
        const items = focusableEls();
        if (!items.length) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener("keydown", onKeydown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeydown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalOpen]);

  const profInputRef = useRef<HTMLInputElement | null>(null);
  const profWrapRef = useRef<HTMLDivElement | null>(null);
  const [profOpen, setProfOpen] = useState(false);
  const [profQuery, setProfQuery] = useState("");
  const [profActiveIndex, setProfActiveIndex] = useState(-1);
  const [profSelected, setProfSelected] = useState("");
  const [profError, setProfError] = useState(false);

  const profAllOptions = [...PROFESSIONS, OTHER_PROFESSION];
  const profVisibleOptions = profOpen
    ? profAllOptions.filter((p) =>
        p.toLowerCase().includes(profQuery.trim().toLowerCase()),
      )
    : profAllOptions;

  function profOpenPanel() {
    setProfQuery(profInputRef.current?.value ?? "");
    setProfOpen(true);
    const idx = profAllOptions.findIndex((p) => p === profSelected);
    setProfActiveIndex(idx >= 0 ? idx : 0);
  }
  function profClosePanel() {
    setProfOpen(false);
    setProfActiveIndex(-1);
    // free-typed text that doesn't match a canonical option is cleared on close —
    // it never silently becomes a new profession
    if (profInputRef.current) {
      profInputRef.current.value = profSelected;
    }
  }
  function profSelectOption(value: string) {
    setProfSelected(value);
    if (profInputRef.current) profInputRef.current.value = value;
    setProfError(false);
    profClosePanel();
  }
  useEffect(() => {
    if (!profOpen) return;
    function onDocClick(e: MouseEvent) {
      if (
        profWrapRef.current &&
        !profWrapRef.current.contains(e.target as Node)
      ) {
        profClosePanel();
      }
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profOpen]);

  const locInputRef = useRef<HTMLInputElement | null>(null);
  const [locResolved, setLocResolved] = useState<ResolvedLocation>(null);
  const [locError, setLocError] = useState(false);
  const [locDemoSuggestions, setLocDemoSuggestions] = useState<Place[]>([]);
  const [locDemoOpen, setLocDemoOpen] = useState(false);
  const GOOGLE_MAPS_API_KEY = "";
  const usingGooglePlaces = Boolean(GOOGLE_MAPS_API_KEY);

  function locClearResolved() {
    setLocResolved(null);
  }
  function locApplyResolved(
    city: string,
    province: string,
    country: string,
    lat: number | string,
    lng: number | string,
    formatted?: string,
  ) {
    if (!city || !province) {
      locClearResolved();
      setLocError(true);
      return;
    }
    const label = formatted || `${city}, ${province}, ${country}`;
    setLocResolved({ city, province, country, lat, lng, formatted: label });
    if (locInputRef.current) locInputRef.current.value = label;
    setLocError(false);
  }

  //   Prof

  function onChangeProf(e: inputEvent) {
    setProfQuery(e.target.value);
    if (!profOpen) profOpenPanel();
    setProfActiveIndex(0);
  }

  function onClickProf(e: inputEvent) {
    setProfQuery(e.target.value);
    if (!profOpen) profOpenPanel();
    setProfActiveIndex(0);
  }

  function onKeyDownProf(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!profOpen && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
      e.preventDefault();
      profOpenPanel();
      return;
    }
    if (!profOpen) return;
    const vis = profVisibleOptions;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setProfActiveIndex((i) => Math.min(i + 1, vis.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setProfActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Home") {
      e.preventDefault();
      setProfActiveIndex(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setProfActiveIndex(vis.length - 1);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (profActiveIndex >= 0 && vis[profActiveIndex])
        profSelectOption(vis[profActiveIndex]);
    } else if (e.key === "Escape") {
      e.preventDefault();
      profClosePanel();
    } else if (e.key === "Tab") {
      profClosePanel();
    }
  }

  //   LOc inputhandler
  function onChangeLoc(e: inputEvent) {
    if (!usingGooglePlaces) locHandleInputDemo(e.target.value);
    else locClearResolved();
  }

  function onFocusLoc(e: inputEvent) {
    if (!usingGooglePlaces)
      locHandleInputDemo(locInputRef.current?.value ?? "");
  }

  function onBlurLoc(e: inputEvent) {
    if (!usingGooglePlaces) setTimeout(() => setLocDemoOpen(false), 120);
  }

  function onKeyDownLoc(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Escape") {
      setLocDemoOpen(false);
    }
  }

  function locHandleInputDemo(value: string) {
    locClearResolved();
    const q = value.trim().toLowerCase();
    if (!q) {
      setLocDemoOpen(false);
      setLocDemoSuggestions([]);
      return;
    }
    const starts = DEMO_ONLY_ONTARIO_MUNICIPALITIES.filter((m) =>
      m.city.toLowerCase().startsWith(q),
    );
    const contains = DEMO_ONLY_ONTARIO_MUNICIPALITIES.filter(
      (m) =>
        !m.city.toLowerCase().startsWith(q) && m.city.toLowerCase().includes(q),
    );
    const matches = starts.concat(contains).slice(0, 8);
    setLocDemoSuggestions(matches);
    setLocDemoOpen(matches.length > 0);
  }
  function locSelectDemoPlace(place: Place) {
    locApplyResolved(
      place.city,
      place.province,
      place.country,
      place.lat,
      place.lng,
      `${place.city}, ${place.province}, ${place.country}`,
    );
    setLocDemoOpen(false);
  }

  useEffect(() => {
    if (!usingGooglePlaces || !locInputRef.current) {
      return;
    }

    const input = locInputRef.current;

    const initAutocomplete = () => {
      if (!window.google?.maps?.places) {
        return;
      }

      const autocomplete = new google.maps.places.Autocomplete(input, {
        types: ["(cities)"],
        componentRestrictions: {
          country: "ca",
        },
        fields: ["address_components", "formatted_address", "geometry", "name"],
      });

      autocomplete.setBounds(
        new google.maps.LatLngBounds(
          new google.maps.LatLng(41.6, -95.2),
          new google.maps.LatLng(56.9, -74.3),
        ),
      );

      const listener = autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();

        if (!place.geometry?.location) {
          locClearResolved();
          setLocError(true);
          return;
        }

        const components = place.address_components ?? [];

        const getComponent = (type: string): string =>
          components.find((component) => component.types.includes(type))
            ?.long_name ?? "";

        const city =
          getComponent("locality") ||
          getComponent("postal_town") ||
          getComponent("administrative_area_level_3");

        const province = getComponent("administrative_area_level_1");
        const country = getComponent("country");

        const { lat, lng } = place.geometry.location;

        locApplyResolved(
          city,
          province,
          country,
          lat(),
          lng(),
          place.formatted_address ?? "",
        );
      });

      return () => listener.remove();
    };

    // API already loaded
    if (window.google?.maps?.places) {
      return initAutocomplete();
    }

    const script = document.createElement("script");

    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(
      GOOGLE_MAPS_API_KEY,
    )}&libraries=places`;

    script.async = true;
    script.defer = true;
    script.dataset.vettedGooglePlaces = "true";

    script.onload = initAutocomplete;

    document.head.appendChild(script);

    return () => {
      script.onload = null;
    };
  }, [usingGooglePlaces]);

  const firstRef = useRef<HTMLInputElement | null>(null);
  const lastRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const yearsRef = useRef<HTMLInputElement | null>(null);
  const consentRef = useRef<HTMLInputElement | null>(null);

  const NOTICE_OPTIONS = [
    "Same-day",
    "12 hours",
    "24 hours",
    "48 hours",
    "1 week",
    "2 weeks",
    "Other",
  ];
  const CONTRACT_OPTIONS = ["One-off shifts", "Ongoing contracts", "Both"];
  const [noticeValue, setNoticeValue] = useState("Same-day");
  const [noticeOpen, setNoticeOpen] = useState(false);
  const [noticeActiveIndex, setNoticeActiveIndex] = useState(0);
  const [noticeOther, setNoticeOther] = useState("");
  const [noticeOtherError, setNoticeOtherError] = useState(false);
  const [contractValue, setContractValue] = useState("One-off shifts");
  const [contractOpen, setContractOpen] = useState(false);
  const [contractActiveIndex, setContractActiveIndex] = useState(0);
  const noticeWrapRef = useRef<HTMLDivElement | null>(null);
  const contractWrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!noticeOpen) return;
    function onDocClick(e: MouseEvent) {
      if (
        noticeWrapRef.current &&
        !noticeWrapRef.current.contains(e.target as Node)
      )
        setNoticeOpen(false);
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, [noticeOpen]);
  useEffect(() => {
    if (!contractOpen) return;
    function onDocClick(e: MouseEvent) {
      if (
        contractWrapRef.current &&
        !contractWrapRef.current.contains(e.target as Node)
      )
        setContractOpen(false);
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, [contractOpen]);

  const onChangeNotice = (e: inputEvent) => {
    setNoticeOther(e.target.value);
    if (e.target.value.trim()) setNoticeOtherError(false);
  };

  function selectNotice(value: string) {
    setNoticeValue(value);
    setNoticeOpen(false);
    if (value !== "Other") {
      setNoticeOther("");
      setNoticeOtherError(false);
    }
  }
  function selectContract(value: string) {
    setContractValue(value);
    setContractOpen(false);
  }

  /* ---------------- INDEPENDENT CONTRACTOR ---------------- */
  const [icOn, setIcOn] = useState(false);
  const [icInfoOpen, setIcInfoOpen] = useState(false);
  const [icConsentChecked, setIcConsentChecked] = useState(false);
  const [icConfirmed, setIcConfirmed] = useState(false);
  const [icError, setIcError] = useState(false);
  const icConfirmBtnRef = useRef<HTMLButtonElement | null>(null);

  function toggleIc() {
    const next = !icOn;
    setIcOn(next);
    if (!next) {
      // turning the whole IC path off resets any in-progress confirmation, but
      // Minimum notice window / Contract preference selections are preferences, not
      // attestation state, and are left as the professional set them.
      setIcConfirmed(false);
      setIcConsentChecked(false);
      setIcError(false);
    }
  }
  const onClickNotice = () => setNoticeOpen((v) => !v);
  const onKeyDownNotice = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (!noticeOpen) {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
        e.preventDefault();
        setNoticeOpen(true);
      }
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setNoticeActiveIndex((i) => Math.min(i + 1, NOTICE_OPTIONS.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setNoticeActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      selectNotice(NOTICE_OPTIONS[noticeActiveIndex]);
    } else if (e.key === "Escape") {
      e.preventDefault();
      setNoticeOpen(false);
    } else if (e.key === "Tab") setNoticeOpen(false);
  };

  const contractPanelCtr = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (!contractOpen) {
      if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
        e.preventDefault();
        setContractOpen(true);
      }
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setContractActiveIndex((i) =>
        Math.min(i + 1, CONTRACT_OPTIONS.length - 1),
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setContractActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      selectContract(CONTRACT_OPTIONS[contractActiveIndex]);
    } else if (e.key === "Escape") {
      e.preventDefault();
      setContractOpen(false);
    } else if (e.key === "Tab") setContractOpen(false);
  };

  function confirmIcStatus() {
    if (!icConsentChecked) {
      setIcError(true);
      return;
    }
    setIcError(false);
    setIcConfirmed(true);
  }
  function changeIcStatus() {
    setIcConfirmed(false);
    setIcConsentChecked(false);
    setIcError(false);
  }

  /* ---------------- RESUME ---------------- */
  const resumeInputRef = useRef<HTMLInputElement | null>(null);
  const [resumeFileName, setResumeFileName] = useState<string | null>(null);
  const [resumeError, setResumeError] = useState(false);

  function handleResumeChange() {
    const files = resumeInputRef.current?.files;
    if (files && files.length) {
      setResumeFileName(files[0].name);
      setResumeError(false);
    } else {
      setResumeFileName(null);
    }
  }

  /* ---------------- FORM SUBMISSION ---------------- */
  const [formSubmitted, setFormSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Native required/type semantics for the plain fields, checked manually (the <form>
    // has noValidate so the browser never silently blocks before our own messaging runs).
    const standardRefs = [firstRef, lastRef, emailRef, yearsRef, consentRef];
    for (const ref of standardRefs) {
      const el = ref.current;
      if (el && !el.checkValidity()) {
        el.reportValidity();
        return;
      }
    }

    if (!locResolved) {
      setLocError(true);
      locInputRef.current?.scrollIntoView({
        block: "center",
        behavior: "smooth",
      });
      return;
    }
    setLocError(false);

    if (!profSelected) {
      setProfError(true);
      profInputRef.current?.scrollIntoView({
        block: "center",
        behavior: "smooth",
      });
      return;
    }
    setProfError(false);

    if (!resumeInputRef.current?.files?.length) {
      setResumeError(true);
      resumeInputRef.current?.scrollIntoView({
        block: "center",
        behavior: "smooth",
      });
      return;
    }
    setResumeError(false);

    // IC path opened but not confirmed: block submission and point the user to either
    // confirm IC status or turn IC off — never silently reinterpret their choice.
    if (icOn && !icConfirmed) {
      setIcError(true);
      icConfirmBtnRef.current?.scrollIntoView({
        block: "center",
        behavior: "smooth",
      });
      return;
    }

    // Conditional field: only relevant (and only required) when IC is on AND the notice
    // window is set to "Other" — never blocks submission otherwise.
    if (icOn && noticeValue === "Other" && !noticeOther.trim()) {
      setNoticeOtherError(true);
      return;
    }
    setNoticeOtherError(false);

    setFormSubmitted(true);
  }

  return (
    <section
      id="join"
      className="reveal border-y border-ash bg-cream px-12 py-24 max-[960px]:px-6 max-[960px]:py-17.5"
    >
      <div className="mx-auto grid max-w-290 grid-cols-[0.92fr_1.08fr] items-start gap-15 max-[960px]:grid-cols-1 max-[960px]:gap-10">
        <CTA />

        <div className="rounded-[20px] border border-ash bg-white px-9.5 pb-8.5 pt-9.5 shadow-[0_24px_60px_rgba(28,52,16,0.08)] max-[520px]:px-6 max-[520px]:py-7.5">
          {!formSubmitted && (
            <Form
              firstRef={firstRef}
              lastRef={lastRef}
              emailRef={emailRef}
              yearsRef={yearsRef}
              consentRef={consentRef}
              locInputRef={locInputRef}
              handleSubmit={handleSubmit}
              usingGooglePlaces={usingGooglePlaces}
              onChangeLoc={onChangeLoc}
              onFocusLoc={onFocusLoc}
              onBlurLoc={onBlurLoc}
              onKeyDownLoc={onKeyDownLoc}
              locDemoOpen={locDemoOpen}
              locDemoSuggestions={locDemoSuggestions}
              locSelectDemoPlace={locSelectDemoPlace}
              locError={locError}
              profWrapRef={profWrapRef}
              profInputRef={profInputRef}
              profOpen={profOpen}
              profOpenPanel={profOpenPanel}
              profSelectOption={profSelectOption}
              onChangeProf={onChangeProf}
              onKeyDownProf={onKeyDownProf}
              profVisibleOptions={profVisibleOptions}
              profSelected={profSelected}
              OTHER_PROFESSION={OTHER_PROFESSION}
              setProfActiveIndex={setProfActiveIndex}
              profActiveIndex={profActiveIndex}
              profError={profError}
              resumeInputRef={resumeInputRef}
              handleResumeChange={handleResumeChange}
              resumeFileName={resumeFileName}
              resumeError={resumeError}
              setIcInfoOpen={setIcInfoOpen}
              icInfoOpen={icInfoOpen}
              icOn={icOn}
              toggleIc={toggleIc}
              NOTICE_OPTIONS={NOTICE_OPTIONS}
              noticeWrapRef={noticeWrapRef}
              onKeyDownNotice={onKeyDownNotice}
              onClickNotice={onClickNotice}
              noticeOther={noticeOther}
              noticeValue={noticeValue}
              noticeOpen={noticeOpen}
              onChangeNotice={onChangeNotice}
              selectNotice={selectNotice}
              setNoticeActiveIndex={setNoticeActiveIndex}
              noticeActiveIndex={noticeActiveIndex}
              icConfirmed={icConfirmed}
              noticeOtherError={noticeOtherError}
              icConfirmBtnRef={icConfirmBtnRef}
              icConsentChecked={icConsentChecked}
              setIcConsentChecked={setIcConsentChecked}
              confirmIcStatus={confirmIcStatus}
              changeIcStatus={changeIcStatus}
              icError={icError}
              contractWrapRef={contractWrapRef}
              contractPanelCtr={contractPanelCtr}
              contractValue={contractValue}
              contractOpen={contractOpen}
              CONTRACT_OPTIONS={CONTRACT_OPTIONS}
              contractActiveIndex={contractActiveIndex}
              setContractActiveIndex={setContractActiveIndex}
              selectContract={selectContract}
              setContractOpen={setContractOpen}
            />
          )}

          {formSubmitted && <Success />}
        </div>
      </div>
    </section>
  );
}
