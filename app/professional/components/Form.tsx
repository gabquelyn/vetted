import React, {
  Dispatch,
  KeyboardEvent,
  RefObject,
  SetStateAction,
} from "react";
import { PROFESSIONS } from "./data";

interface FormProps {
  firstRef: RefObject<HTMLInputElement | null>;
  lastRef: RefObject<HTMLInputElement | null>;
  emailRef: RefObject<HTMLInputElement | null>;
  yearsRef: RefObject<HTMLInputElement | null>;
  consentRef: RefObject<HTMLInputElement | null>;
  locInputRef: RefObject<HTMLInputElement | null>;
  profWrapRef: RefObject<HTMLDivElement | null>;
  profInputRef: RefObject<HTMLInputElement | null>;
  icConfirmBtnRef: RefObject<HTMLButtonElement | null>;
  contractWrapRef: RefObject<HTMLDivElement | null>;
  handleSubmit(e: React.FormEvent<HTMLFormElement>): void;
  usingGooglePlaces: boolean;
  onChangeLoc(e: inputEvent): void;
  onFocusLoc(e: inputEvent): void;
  onBlurLoc(e: inputEvent): void;
  onKeyDownLoc(e: KeyboardEvent<HTMLInputElement>): void;
  locDemoOpen: boolean;
  locDemoSuggestions: Place[];
  locSelectDemoPlace(place: Place): void;
  locError: boolean;
  profOpen: boolean;
  profOpenPanel(): void;
  profSelectOption(value: string): void;
  onChangeProf(e: inputEvent): void;
  onKeyDownProf(e: KeyboardEvent<HTMLInputElement>): void;
  profVisibleOptions: string[];
  profSelected: string;
  OTHER_PROFESSION: "Other healthcare profession";
  setProfActiveIndex: Dispatch<SetStateAction<number>>;
  profActiveIndex: number;
  profError: boolean;
  resumeInputRef: RefObject<HTMLInputElement | null>;
  handleResumeChange(): void;
  resumeFileName: string | null;
  resumeError: boolean;
  setIcInfoOpen: (value: SetStateAction<boolean>) => void;
  icInfoOpen: boolean;
  toggleIc(): void;
  icOn: boolean;
  NOTICE_OPTIONS: string[];
  noticeWrapRef: RefObject<HTMLDivElement | null>;
  onKeyDownNotice: (e: KeyboardEvent<HTMLButtonElement>) => void;
  onClickNotice: () => void;
  noticeOther: string;
  noticeValue: string;
  noticeOpen: boolean;
  onChangeNotice: (e: inputEvent) => void;
  selectNotice(value: string): void;
  setNoticeActiveIndex: Dispatch<SetStateAction<number>>;
  noticeActiveIndex: number;
  icConfirmed: boolean;
  noticeOtherError: boolean;
  setIcConsentChecked: Dispatch<SetStateAction<boolean>>;
  icConsentChecked: boolean;
  confirmIcStatus(): void;
  changeIcStatus(): void;
  icError: boolean;
  contractPanelCtr: (e: React.KeyboardEvent<HTMLButtonElement>) => void;
  contractValue: string;
  contractOpen: boolean;
  CONTRACT_OPTIONS: string[];
  selectContract(value: string): void;
  contractActiveIndex: number;
  setContractActiveIndex: Dispatch<SetStateAction<number>>;
  selectContract(value: string): void;
  setContractOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Form({
  firstRef,
  lastRef,
  emailRef,
  yearsRef,
  consentRef,
  locInputRef,
  handleSubmit,
  usingGooglePlaces,
  onChangeLoc,
  onFocusLoc,
  onBlurLoc,
  onKeyDownLoc,
  locDemoOpen,
  locDemoSuggestions,
  locSelectDemoPlace,
  locError,
  profWrapRef,
  profInputRef,
  profOpen,
  profOpenPanel,
  profSelectOption,
  onChangeProf,
  onKeyDownProf,
  profVisibleOptions,
  profSelected,
  OTHER_PROFESSION,
  setProfActiveIndex,
  profActiveIndex,
  profError,
  resumeInputRef,
  handleResumeChange,
  resumeFileName,
  resumeError,
  setIcInfoOpen,
  icInfoOpen,
  icOn,
  toggleIc,
  NOTICE_OPTIONS,
  noticeWrapRef,
  onKeyDownNotice,
  onClickNotice,
  noticeOther,
  noticeValue,
  noticeOpen,
  onChangeNotice,
  selectNotice,
  setNoticeActiveIndex,
  noticeActiveIndex,
  icConfirmed,
  noticeOtherError,
  icConfirmBtnRef,
  icConsentChecked,
  setIcConsentChecked,
  confirmIcStatus,
  changeIcStatus,
  icError,
  contractWrapRef,
  contractPanelCtr,
  contractValue,
  contractOpen,
  CONTRACT_OPTIONS,
  contractActiveIndex,
  setContractActiveIndex,
  selectContract,
  setContractOpen,
}: FormProps) {
  return (
    <div>
      <div className="mb-2 text-[10.5px] font-bold uppercase tracking-[0.08em] text-forest">
        Join Vetted before we launch
      </div>
      <h3 className="mb-1.25 font-serif text-[22px] font-semibold text-ink">
        Join Vetted
      </h3>
      <div className="mb-3.5 text-[12.5px] text-ink-soft">
        Vetted is getting ready to launch. Share your details now and we will
        let you know when it is time to complete your professional profile —
        including choosing the Registry, the Directory, or both — and go live on
        Vetted.
      </div>
      <div className="mb-5 text-2.75 font-semibold text-ink-soft">
        All fields are required.
      </div>
      <form noValidate onSubmit={handleSubmit}>
        <div className="mb-3.5 grid grid-cols-2 gap-3.5 max-[520px]:grid-cols-1">
          <div className="mb-3.5">
            <label
              htmlFor="fFirst"
              className="mb-1.5 block text-[10.5px] font-semibold uppercase tracking-[0.03em] text-ink-soft"
            >
              First name
            </label>
            <input
              type="text"
              id="fFirst"
              ref={firstRef}
              required
              className="join-input"
            />
          </div>
          <div className="mb-3.5">
            <label
              htmlFor="fLast"
              className="mb-1.5 block text-[10.5px] font-semibold uppercase tracking-[0.03em] text-ink-soft"
            >
              Last name
            </label>
            <input
              type="text"
              id="fLast"
              ref={lastRef}
              required
              className="join-input"
            />
          </div>
        </div>

        <div className="mb-3.5">
          <label
            htmlFor="fEmail"
            className="mb-1.5 block text-[10.5px] font-semibold uppercase tracking-[0.03em] text-ink-soft"
          >
            Email
          </label>
          <input
            type="email"
            id="fEmail"
            ref={emailRef}
            required
            className="join-input"
          />
        </div>

        <div className="mb-3.5 grid grid-cols-2 gap-3.5 max-[520px]:grid-cols-1">
          <div className="mb-3.5">
            <label
              htmlFor="fLocInput"
              className="mb-1.5 block text-[10.5px] font-semibold uppercase tracking-[0.03em] text-ink-soft"
            >
              Location
            </label>

            <div className="relative">
              <input
                type="text"
                id="fLocInput"
                ref={locInputRef}
                placeholder="Start typing your city..."
                autoComplete="off"
                aria-label="Location"
                onChange={onChangeLoc}
                onFocus={onFocusLoc}
                onBlur={onBlurLoc}
                onKeyDown={onKeyDownLoc}
                className="join-input"
              />
              {!usingGooglePlaces &&
                locDemoOpen &&
                locDemoSuggestions.length > 0 && (
                  <ul
                    role="listbox"
                    className="absolute left-0 right-0 top-[calc(100%+6px)] z-20 max-h-63 list-none overflow-y-auto rounded-[10px] border border-ash bg-white p-1.5 shadow-[0_16px_36px_rgba(28,52,16,0.16)]"
                  >
                    {locDemoSuggestions.map((place) => (
                      <li
                        key={place.city}
                        role="option"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => locSelectDemoPlace(place)}
                        className="cursor-pointer rounded-[7px] px-2.75 py-2.5 text-[13.5px] text-ink transition-colors duration-100 hover:bg-forest-light hover:text-forest"
                      >
                        {place.city}, {place.province}
                      </li>
                    ))}
                  </ul>
                )}
            </div>
            <div
              id="fLocError"
              hidden={!locError}
              className="mt-1.5 text-[11.5px] text-[#b8622a]"
            >
              Please select a location from the list.
            </div>
          </div>
          <div className="mb-3.5">
            <label
              htmlFor="fYears"
              className="mb-1.5 block text-[10.5px] font-semibold uppercase tracking-[0.03em] text-ink-soft"
            >
              Years of experience
            </label>
            <input
              type="number"
              id="fYears"
              ref={yearsRef}
              min={0}
              required
              className="join-input"
            />
          </div>
        </div>

        <div className="mb-3.5">
          <label
            id="fProfLabel"
            htmlFor="fProfInput"
            className="mb-1.5 block text-[10.5px] font-semibold uppercase tracking-[0.03em] text-ink-soft"
          >
            Profession
          </label>
          <div className="relative" ref={profWrapRef}>
            <div className="relative">
              <input
                type="text"
                id="fProfInput"
                ref={profInputRef}
                role="combobox"
                aria-expanded={profOpen}
                aria-controls="fProfPanel"
                aria-autocomplete="list"
                aria-labelledby="fProfLabel"
                autoComplete="off"
                placeholder="Search or select your profession"
                onFocus={profOpenPanel}
                onClick={() => {
                  if (!profOpen) profOpenPanel();
                }}
                onChange={onChangeProf}
                onKeyDown={onKeyDownProf}
                className="peer block w-full cursor-text rounded-[9px] border border-ash bg-cream py-2.75 pl-3.25 pr-8.5 text-[13.5px] text-ink transition-colors duration-150 placeholder:text-ink-soft hover:border-ink-soft focus:border-forest focus:bg-white focus:shadow-[0_0_0_2px_var(--forest-light)] focus:outline-none"
              />
              <svg
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
                className="pointer-events-none absolute right-3.25 top-1/2 -translate-y-1/2 text-ink-soft transition-[transform,color] duration-150 peer-aria-expanded:rotate-180 peer-aria-expanded:text-forest"
              >
                <path
                  d="M1 1l4 4 4-4"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <ul
              id="fProfPanel"
              role="listbox"
              aria-labelledby="fProfLabel"
              hidden={!profOpen}
              className="absolute left-0 right-0 top-[calc(100%+6px)] z-20 max-h-63 list-none overflow-y-auto rounded-[10px] border border-ash bg-white p-1.5 shadow-[0_16px_36px_rgba(28,52,16,0.16)]"
            >
              {profVisibleOptions.map((p, i) => (
                <li
                  key={p}
                  id={`fProfOpt${i + 1}`}
                  role="option"
                  aria-selected={p === profSelected}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => profSelectOption(p)}
                  onMouseEnter={() => setProfActiveIndex(i)}
                  className={`cursor-pointer rounded-[7px] px-2.75 py-2.5 text-[13.5px] text-ink transition-colors duration-100 aria-selected:font-bold aria-selected:text-forest ${
                    p === OTHER_PROFESSION
                      ? "mt-1 border-t border-ash pt-3"
                      : ""
                  } ${i === profActiveIndex ? "bg-forest-light text-forest" : ""}`}
                >
                  {p}
                </li>
              ))}
              {profVisibleOptions.length === 0 && (
                <li
                  role="option"
                  aria-disabled="true"
                  className="cursor-default italic text-ink-soft"
                >
                  No matching professions
                </li>
              )}
            </ul>

            <select
              id="fProf"
              required
              aria-hidden="true"
              tabIndex={-1}
              value={profSelected}
              onChange={() => {}}
              style={{
                position: "absolute",
                opacity: 0,
                height: 1,
                width: 1,
                pointerEvents: "none",
              }}
            >
              <option value=""></option>
              {PROFESSIONS.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
              <option value={OTHER_PROFESSION}>{OTHER_PROFESSION}</option>
            </select>
          </div>
          <div
            id="fProfError"
            hidden={!profError}
            className="mt-1.5 text-[11.5px] text-[#b8622a]"
          >
            Please select a profession from the list.
          </div>
        </div>

        <div className="mb-3.5">
          <label
            htmlFor="fResume"
            className="mb-1.5 block text-[10.5px] font-semibold uppercase tracking-[0.03em] text-ink-soft"
          >
            Resume{" "}
            <span className="font-medium normal-case tracking-normal text-ink-soft">
              Required · PDF, DOC or DOCX
            </span>
          </label>
          <div className="relative flex items-center gap-3 rounded-[9px] border border-ash bg-cream px-3.25 py-2.75">
            <button
              type="button"
              onClick={() => resumeInputRef.current?.click()}
              className="border-b border-forest pb-px text-[12.5px] font-bold text-forest"
            >
              Choose file
            </button>
            <span className="text-[11.5px] text-ink-soft">
              {resumeFileName ?? "No file selected"}
            </span>
            <input
              type="file"
              id="fResume"
              ref={resumeInputRef}
              required
              accept=".pdf,.doc,.docx"
              onChange={handleResumeChange}
              style={{
                position: "absolute",
                width: 1,
                height: 1,
                opacity: 0,
                overflow: "hidden",
                left: 13,
                bottom: 6,
              }}
            />
          </div>
          <div
            id="fFileError"
            hidden={!resumeError}
            className="mt-1.5 text-[11.5px] text-[#b8622a]"
          >
            Please attach your resume to continue.
          </div>
        </div>

        <div className="mt-1.5 flex items-center justify-between border-t border-ash pb-0.5 pt-4">
          <span className="inline-flex items-center gap-1.75 text-3.25 font-semibold text-ink">
            I am an independent contractor
            <button
              type="button"
              aria-expanded={icInfoOpen}
              aria-controls="icInfoPanel"
              aria-label="What does independent contractor mean?"
              onClick={() => setIcInfoOpen((v) => !v)}
              className="flex h-4 w-4 items-center justify-center rounded-full border border-ink-soft font-['Georgia',serif] text-[10px] italic text-ink-soft transition-colors duration-150 hover:border-forest hover:text-forest aria-expanded:border-forest aria-expanded:text-forest"
            >
              i
            </button>
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={icOn}
            aria-label="Independent contractor"
            onClick={toggleIc}
            className={`relative h-5.5 w-9.5 shrink-0 rounded-full transition-colors duration-200 ${
              icOn ? "bg-forest" : "bg-ash"
            }`}
          >
            <span
              className={`absolute top-0.75 h-4 w-4 rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.2)] transition-[left] duration-200 ${
                icOn ? "left-4.75" : "left-0.75"
              }`}
            />
          </button>
        </div>
        <div
          id="icInfoPanel"
          hidden={!icInfoOpen}
          className="mt-2 rounded-lg bg-cream px-3 py-2.5 text-[11.5px] leading-[1.55] text-ink-soft"
        >
          This is for professionals who work for themselves as independent
          contractors. You wll confirm your independent contractor status and
          that you carry your own professional liability insurance. You can
          still choose casual or short-notice availability without selecting
          this option.
        </div>

        <div
          className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${
            icOn ? "mt-3.5 max-h-155" : "max-h-0"
          }`}
        >
          <div className="mb-3.5 mt-0.5">
            <label
              id="fNoticeLabel"
              htmlFor="fNoticeBtn"
              className="mb-1.5 block text-[10.5px] font-semibold uppercase tracking-[0.03em] text-ink-soft"
            >
              Minimum notice window
            </label>
            <div className="relative" ref={noticeWrapRef}>
              <button
                type="button"
                id="fNoticeBtn"
                aria-haspopup="listbox"
                //   aria-expanded={noticeOpen}
                aria-controls="fNoticePanel"
                aria-labelledby="fNoticeLabel fNoticeBtn"
                onClick={onClickNotice}
                onKeyDown={onKeyDownNotice}
                className="group flex w-full items-center justify-between gap-2.5 rounded-[9px] border border-ash bg-cream px-3.25 py-2.75 text-[13.5px] text-ink transition-colors duration-150 hover:border-ink-soft aria-expanded:border-forest aria-expanded:bg-white"
              >
                <span>{noticeValue}</span>
                <svg
                  width="10"
                  height="6"
                  viewBox="0 0 10 6"
                  fill="none"
                  className="text-ink-soft transition-[transform,color] duration-150 group-aria-expanded:rotate-180 group-aria-expanded:text-forest"
                >
                  <path
                    d="M1 1l4 4 4-4"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <ul
                id="fNoticePanel"
                role="listbox"
                aria-labelledby="fNoticeLabel"
                hidden={!noticeOpen}
                className="absolute left-0 right-0 top-[calc(100%+6px)] z-20 max-h-63 list-none overflow-y-auto rounded-[10px] border border-ash bg-white p-1.5 shadow-[0_16px_36px_rgba(28,52,16,0.16)]"
              >
                {NOTICE_OPTIONS.map((opt, i) => (
                  <li
                    key={opt}
                    role="option"
                    aria-selected={opt === noticeValue}
                    data-value={opt}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => selectNotice(opt)}
                    onMouseEnter={() => setNoticeActiveIndex(i)}
                    className={`cursor-pointer rounded-[7px] px-2.75 py-2.5 text-[13.5px] text-ink transition-colors duration-100 aria-selected:font-bold aria-selected:text-forest ${
                      i === noticeActiveIndex
                        ? "bg-forest-light text-forest"
                        : ""
                    }`}
                  >
                    {opt}
                  </li>
                ))}
              </ul>
              <select
                id="fNotice"
                aria-hidden="true"
                tabIndex={-1}
                value={noticeValue}
                onChange={() => {}}
                style={{
                  position: "absolute",
                  opacity: 0,
                  height: 1,
                  width: 1,
                  pointerEvents: "none",
                }}
              >
                {NOTICE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div
            id="fNoticeOtherField"
            hidden={noticeValue !== "Other"}
            className="mb-3.5"
          >
            <label
              htmlFor="fNoticeOther"
              className="mb-1.5 block text-[10.5px] font-semibold uppercase tracking-[0.03em] text-ink-soft"
            >
              Minimum notice required
            </label>
            <input
              type="text"
              id="fNoticeOther"
              placeholder="Enter your notice period"
              value={noticeOther}
              onChange={onChangeNotice}
              className="join-input"
            />
            <div
              id="fNoticeOtherError"
              hidden={!noticeOtherError}
              className="mt-1.5 text-[11.5px] text-[#b8622a]"
            >
              Please enter your minimum notice period.
            </div>
          </div>

          <div className="mb-3.5">
            <label
              id="fContractLabel"
              htmlFor="fContractBtn"
              className="mb-1.5 block text-[10.5px] font-semibold uppercase tracking-[0.03em] text-ink-soft"
            >
              Contract preference
            </label>
            <div className="relative" ref={contractWrapRef}>
              <button
                type="button"
                id="fContractBtn"
                aria-haspopup="listbox"
                aria-expanded={contractOpen}
                aria-controls="fContractPanel"
                aria-labelledby="fContractLabel fContractBtn"
                onClick={() => setContractOpen((v) => !v)}
                onKeyDown={contractPanelCtr}
                className="group flex w-full items-center justify-between gap-2.5 rounded-[9px] border border-ash bg-cream px-3.25 py-2.75 text-[13.5px] text-ink transition-colors duration-150 hover:border-ink-soft aria-expanded:border-forest aria-expanded:bg-white"
              >
                <span>{contractValue}</span>
                <svg
                  width="10"
                  height="6"
                  viewBox="0 0 10 6"
                  fill="none"
                  className="text-ink-soft transition-[transform,color] duration-150 group-aria-expanded:rotate-180 group-aria-expanded:text-forest"
                >
                  <path
                    d="M1 1l4 4 4-4"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <ul
                id="fContractPanel"
                role="listbox"
                aria-labelledby="fContractLabel"
                hidden={!contractOpen}
                className="absolute left-0 right-0 top-[calc(100%+6px)] z-20 max-h-63 list-none overflow-y-auto rounded-[10px] border border-ash bg-white p-1.5 shadow-[0_16px_36px_rgba(28,52,16,0.16)]"
              >
                {CONTRACT_OPTIONS.map((opt, i) => (
                  <li
                    key={opt}
                    role="option"
                    aria-selected={opt === contractValue}
                    data-value={opt}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => selectContract(opt)}
                    onMouseEnter={() => setContractActiveIndex(i)}
                    className={`cursor-pointer rounded-[7px] px-2.75 py-2.5 text-[13.5px] text-ink transition-colors duration-100 aria-selected:font-bold aria-selected:text-forest ${
                      i === contractActiveIndex
                        ? "bg-forest-light text-forest"
                        : ""
                    }`}
                  >
                    {opt}
                  </li>
                ))}
              </ul>
              <select
                id="fContract"
                aria-hidden="true"
                tabIndex={-1}
                value={contractValue}
                onChange={() => {}}
                style={{
                  position: "absolute",
                  opacity: 0,
                  height: 1,
                  width: 1,
                  pointerEvents: "none",
                }}
              >
                {CONTRACT_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {!icConfirmed && (
            <div>
              <div className="mt-3.5 flex items-start gap-2.25 text-xs leading-normal text-ink-soft">
                <input
                  type="checkbox"
                  id="fICConsent"
                  checked={icConsentChecked}
                  onChange={(e) => setIcConsentChecked(e.target.checked)}
                  className="mt-0.75 shrink-0"
                />
                <label htmlFor="fICConsent">
                  I confirm that I am self-employed / working as an independent
                  contractor and that I carry my own professional liability
                  insurance.
                </label>
              </div>
              <button
                type="button"
                ref={icConfirmBtnRef}
                onClick={confirmIcStatus}
                className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-[rgba(45,80,22,0.35)] bg-transparent px-3.5 py-2 text-[12.5px] font-bold text-forest transition-colors duration-150 hover:border-forest hover:bg-forest-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest"
              >
                Confirm IC status <span aria-hidden="true">→</span>
              </button>
              <div
                id="fICError"
                hidden={!icError}
                className="mt-1.5 text-[11.5px] text-[#b8622a]"
              >
                Please confirm the statement above, or turn this off to join as
                a regular Vetted professional.
              </div>
            </div>
          )}
          {icConfirmed && (
            <div>
              <div className="mt-3 flex items-center gap-1.75 text-3.25 font-semibold text-forest">
                ✓ Independent contractor status confirmed
              </div>
              <button
                type="button"
                onClick={changeIcStatus}
                className="inline-flex items-center gap-1.75 border-b border-ash pb-0.5 text-3.25 font-semibold text-ink-soft transition-[border-color,color,opacity] duration-150 hover:border-forest hover:text-forest"
              >
                Change
              </button>
            </div>
          )}
        </div>

        <div className="my-5 flex items-start gap-2.25 text-xs leading-normal text-ink-soft">
          <input
            type="checkbox"
            id="fConsent"
            ref={consentRef}
            required
            className="mt-0.75 shrink-0"
          />
          <label htmlFor="fConsent">
            I agree to Vetted&apos; Terms and Privacy Policy. I understand
            nothing about me is visible to employers until my profile is
            published.
          </label>
        </div>

        <button
          type="submit"
          className="mb-3.5 inline-flex w-full items-center justify-center gap-2.25 rounded-full bg-forest px-6.75 py-3.75 text-sm font-bold text-white transition-[transform,box-shadow,background-color] duration-200 ease-out hover:-translate-y-0.5 hover:bg-[#3d6b1f] hover:shadow-[0_14px_28px_rgba(45,80,22,0.22)]"
        >
          Join Vetted <span aria-hidden="true">→</span>
        </button>
        <div className="text-center text-[11.5px] leading-noraml text-ink-soft">
          Your contact information isn&apos;t displayed publicly. Employer
          access follows Vetted&apos;s Registry Reveal and Directory opportunity
          rules.
        </div>
      </form>
    </div>
  );
}
