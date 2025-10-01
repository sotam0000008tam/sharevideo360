// pages/tag/[tag].js
import { useRouter } from "next/router";
import useSWR from "swr";
import Layout from "../../components/Layout";
import VideoCard from "../../components/VideoCard";
import { videos as staticVideos } from "../../data/videos";

// Simple fetcher for SWR.  We disable caching by always performing a fresh
// request on each page load.  This ensures newly submitted videos show
// up without requiring a rebuild.
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function TagPage() {
  const router = useRouter();
  const { tag } = router.query;
  // Fetch the live list of videos from the API.  If the API fails or
  // returns an empty list we fall back to the static dataset from
  // `data/videos.js`.  This provides a reasonable default while still
  // allowing dynamic content when available.
  const { data, error } = useSWR("/api/videos", fetcher);
  const list = Array.isArray(data) && data.length > 0 ? data : staticVideos;

  // Filter videos: keep only those with tags and a valid URL that
  // include the current tag (case insensitive).  Handle tags being
  // either a string or an array.  If tag is undefined we return an
  // empty array to avoid showing all videos when the slug is not set.
  const filtered =
    tag && typeof tag === "string"
      ? list.filter((v) => {
          const tagsString = Array.isArray(v?.tags)
            ? v.tags.join(" ")
            : v?.tags || "";
          return (
            tagsString &&
            v.video_url &&
            tagsString.toLowerCase().includes(tag.toLowerCase())
          );
        })
      : [];

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">Tag: {tag}</h1>
      {filtered.length === 0 ? (
        <p className="text-gray-500">No videos found for this tag.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filtered.map((v, i) => (
            <VideoCard key={i} video={v} />
          ))}
        </div>
      )}
    </Layout>
  );
}
