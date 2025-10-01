import { useState } from "react";
import { useRouter } from "next/router";

/**
 * A simple search bar that allows users to quickly find videos by
 * title or tag.  When the user submits a query the browser
 * navigates to the tag page for that keyword.  This component
 * improves user experience and SEO by exposing search keywords in
 * the URL.
 */
export default function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    const q = query.trim();
    if (q) {
      // Lowercase the query for consistency and encode for the URL
      router.push(`/tag/${encodeURIComponent(q.toLowerCase())}`);
      setQuery("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center space-x-2">
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search videos..."
        className="px-3 py-1 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
        aria-label="Search videos"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-1 rounded-md hover:bg-blue-700"
      >
        Search
      </button>
    </form>
  );
}