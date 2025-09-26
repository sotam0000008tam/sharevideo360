// pages/tag/[tag].js
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import VideoCard from "@/components/VideoCard";
import { videos } from "@/data/videos";

export default function TagPage() {
  const router = useRouter();
  const { tag } = router.query;

  // lọc video có tag và có video_url hợp lệ
  const filtered = videos.filter(
    (v) =>
      v.tags &&
      v.video_url && // chỉ lấy video có URL
      v.tags.toLowerCase().includes(tag?.toLowerCase())
  );

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
