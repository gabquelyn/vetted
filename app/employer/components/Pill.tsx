export default function Pill({ s }: { s: string }) {
  return (
    <p className="bg-forest-light text-[.7rem] text-forest rounded-2xl p-1 px-2">
      {s}
    </p>
  );
}