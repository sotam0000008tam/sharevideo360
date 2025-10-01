// pages/index.js
import Head from "next/head";
import useSWR from "swr";
import Layout from "../components/Layout";
import VideoCard from "../components/VideoCard";
import { CATEGORY_LIST, belongsToCategory } from "../lib/videoUtils";
import { videos as staticVideos } from "../data/videos";

const fetcher = (u) => fetch(u).then((r) => r.json());

export default function Home() {
  const { data, error } = useSWR("/api/videos", fetcher);
  // Merge static and dynamic videos.  We fall back to static data when the
  // remote API returns no results for certain categories.  This ensures
  // that all categories are displayed on the home page even if the
  // dynamic list is sparse.  Duplicate videos may appear if the API
  // returns items that are also in the static dataset.
  const combined = Array.isArray(data)
    ? [...data, ...staticVideos]
    : staticVideos;

  return (
    <Layout>
      <Head>
        <title>ShareVideo360 — Home</title>
        <meta
          name="description"
          content="A curated video portal with categorized content."
        />
      </Head>

      <h1 className="text-3xl font-bold mb-4">Latest Videos</h1>
      {error && <p className="text-red-600">Failed to load videos.</p>}
      {!data && <p>Loading...</p>}
      {/* Latest videos section.  Use the combined dataset so that the
          home page always shows content even if the live API has no
          entries.  We slice the first 12 items from the combined list
          to keep the grid compact. */}
      {combined && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {combined.slice(0, 12).map((v, i) => (
            <VideoCard key={i} video={v} />
          ))}
        </div>
      )}

      {combined &&
        CATEGORY_LIST.map((cat) => {
          const items = combined
            .filter((v) => belongsToCategory(v, cat.slug))
            .slice(0, 6);
          return (
            <section key={cat.slug} className="mb-10">
              <div className="flex items-baseline justify-between mb-2">
                <h2 className="text-2xl font-bold mb-2">{cat.label}</h2>
                <a
                  className="text-blue-600 text-sm"
                  href={`/category/${cat.slug}`}
                >
                  View all →
                </a>
              </div>
              {items.length === 0 ? (
                <p className="text-gray-500">No videos in this category yet.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {items.map((v, i) => (
                    <VideoCard key={`${cat.slug}-${i}`} video={v} />
                  ))}
                </div>
              )}
            </section>
          );
        })}
    </Layout>
  );
}
