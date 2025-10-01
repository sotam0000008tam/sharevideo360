// pages/category/[slug].js
import { useRouter } from "next/router";
import useSWR from "swr";
import Layout from "../../components/Layout";
import VideoCard from "../../components/VideoCard";
import { CATEGORY_LIST, belongsToCategory } from "../../lib/videoUtils";
import { videos as staticVideos } from "../../data/videos";

const fetcher = (u) => fetch(u).then((r) => r.json());

export default function CategoryPage() {
  const router = useRouter();
  const { slug } = router.query;

  const category = CATEGORY_LIST.find((c) => c.slug === slug);

  const { data, error } = useSWR("/api/videos", fetcher);
  // Combine live data with the local static dataset.  If the API call
  // fails or returns an empty list we fall back entirely to the
  // static sample videos.  When the API succeeds we merge its
  // results with our static samples to ensure each category
  // remains represented even if the remote sheet is sparsely
  // populated.
  const list = Array.isArray(data) && data.length > 0
    ? [...data, ...staticVideos]
    : staticVideos;

  // Filter videos by category slug using the helper function.  This
  // handles both explicit `category` fields and heuristic matching
  // based on tags.
  const filtered = list.filter((v) => belongsToCategory(v, slug));

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-4">
        {category ? category.label : "Category"}
      </h1>
      {error && <p className="text-red-600">Failed to load videos.</p>}
      {filtered.length === 0 ? (
        <p className="text-gray-500">No videos found in this category yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filtered.map((video, idx) => (
            <VideoCard key={idx} video={video} />
          ))}
        </div>
      )}
    </Layout>
  );
}
