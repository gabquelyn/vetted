
interface FaqItem {
  q: string;
  a: string;
}

export default function FaqBlock({ items }: { items: FaqItem[] }) {
  return (
    <section className="mx-auto mb-16 mt-14 max-w-180 px-12 max-[860px]:px-5">
      <h2 className="mb-1.5 font-['Cormorant_Garamond',serif] text-[clamp(24px,3vw,30px)] font-semibold leading-[1.2] text-ink">
        Frequently asked questions
      </h2>
      <div className="mt-4.5 border-t border-[#e5e2da]">
        {items.map((f, i) => (
          <details className="group border-b border-[#e5e2da] py-4" key={i}>
            <summary className="flex cursor-pointer list-none items-center justify-between text-[14.5px] font-semibold text-ink after:ml-3 after:shrink-0 after:text-lg after:font-normal after:text-forest after:content-['+'] group-open:after:content-['–'] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest [&::-webkit-details-marker]:hidden">
              {f.q}
            </summary>
            <p
              className="mt-3 max-w-150 text-[13.5px] leading-[1.6] text-ink-mid"
              dangerouslySetInnerHTML={{ __html: f.a }}
            />
          </details>
        ))}
      </div>
    </section>
  );
}