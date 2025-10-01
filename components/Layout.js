// components/Layout.js
import Link from "next/link";
import { CATEGORY_LIST } from "../lib/videoUtils";
import SearchBar from "./SearchBar";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header: logo, navigation and search bar */}
      <header className="bg-gray-900 text-white">
        <div className="container mx-auto px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between">
          {/* Site logo */}
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold">
              ShareVideo360
            </Link>
          </div>
          {/* Primary navigation */}
          <nav className="flex items-center gap-6 text-sm mt-3 md:mt-0">
            <Link href="/">Home</Link>
            {/* Dropdown for categories */}
            <div className="relative group">
              <span className="cursor-pointer select-none flex items-center">
                Browse <span className="ml-1">▾</span>
              </span>
              <div className="absolute left-0 z-10 mt-2 hidden group-hover:block bg-gray-800 rounded-md shadow-lg min-w-[150px]">
                {CATEGORY_LIST &&
                  CATEGORY_LIST.map((c) => (
                    <Link
                      key={c.slug}
                      href={`/category/${c.slug}`}
                      className="block px-4 py-2 text-sm text-white hover:bg-gray-700 whitespace-nowrap"
                    >
                      {c.label}
                    </Link>
                  ))}
              </div>
            </div>
            <Link href="/submit">Submit</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
          </nav>
          {/* Search bar */}
          <div className="mt-3 md:mt-0">
            <SearchBar />
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-6 py-6">{children}</main>

      {/* Footer: multi‑column layout with categories, links and copy */}
      <footer className="bg-gray-900 text-gray-300 py-8">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-white font-semibold mb-2">About</h3>
            <p className="text-sm leading-relaxed">
              ShareVideo360 is a community‑curated collection of the best
              videos from YouTube and Rumble. Explore, save and share your
              favourites across entertainment, education and more.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2">Categories</h3>
            <ul className="text-sm space-y-1">
              {CATEGORY_LIST &&
                CATEGORY_LIST.map((c) => (
                  <li key={c.slug}>
                    <Link href={`/category/${c.slug}`} className="hover:underline">
                      {c.label}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-2">Useful Links</h3>
            <ul className="text-sm space-y-1">
              <li>
                <Link href="/about" className="hover:underline">About</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:underline">Contact</Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:underline">Privacy</Link>
              </li>
              <li>
                <Link href="/terms" className="hover:underline">Terms</Link>
              </li>
              <li>
                <Link href="/submit" className="hover:underline">Submit</Link>
              </li>
            </ul>
            <div className="mt-4 text-xs">
              © {new Date().getFullYear()} ShareVideo360
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
