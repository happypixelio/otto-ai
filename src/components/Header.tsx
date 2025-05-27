import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-between items-center max-w-6xl mx-auto mb-10">
      <h1 className="text-white font-bold text-xl font-[Khand]">
        DANIEL <span className="text-gray-400">UX/UI & PRODUCT DESIGNER.</span>
      </h1>
      <nav className="space-x-6 text-sm text-gray-400">
        <Link href="/" className="hover:text-white">Home</Link>
        <Link href="/about" className="hover:text-white">About</Link>
        <Link href="/other" className="hover:text-white">Other</Link>
        {/* <Link href="/contact" className="hover:text-white">Contact</Link> */}
      </nav>
    </header>
  );
}
