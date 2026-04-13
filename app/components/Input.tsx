export default function Input({
  label,
  value,
  onChange,
  type = "text",
  name,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  name: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-[10px] uppercase tracking-widest text-ink-soft mb-1">
        {label}
      </label>
      <input
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-lg border border-ash bg-cream px-3 py-2 text-sm outline-none focus:border-forest transition"
      />
    </div>
  );
}
