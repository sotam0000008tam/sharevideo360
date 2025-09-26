import Link from "next/link";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <nav className="container py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            Video Gallery
          </Link>
          <div className="flex gap-4 text-sm">
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link
              href="/submit"
              className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
            >
              Submit
            </Link>
          </div>
        </nav>
      </header>

      <main className="flex-1 container py-6">{children}</main>

      <footer className="border-t">
        <div className="container py-6 text-sm text-gray-500">
          © {new Date().getFullYear()} Video Gallery — Built with Next.js
        </div>
      </footer>
    </div>
  );
}
