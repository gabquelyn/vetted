import Link from "next/link";

export default function Navigation() {
  return (
    <nav
      className={`fixed w-full z-50 flex items-center justify-between p-4 bg-cream/90 border-b border-b-ash backdrop-blur-xs px-6`}
    >
      <Link href="/" className="nav-logo">
        Vetted
      </Link>
      <ul className="nav-links">
        <li>
          <Link href="#how-it-works">How It Works</Link>
        </li>
        <li>
          <Link href="/employer">For Employers</Link>
        </li>
        <li>
          <Link href="/candidate">Join the Registry</Link>
        </li>
        <li>
          <Link
            href="/employer#short-notice"
            className="flex items-center gap-2"
          >
            Short-Notice
          </Link>
        </li>
        <li>
          <Link href="#pricing">Pricing</Link>
        </li>
        <li>
          <Link
            href="/employer"
            className="bg-forest text-white p-2 px-4 rounded-lg text-md transition-all hover:bg-primary-mid font-medium"
          >
            Get Early Access
          </Link>
        </li>
      </ul>
    </nav>
  );
}
