import useSWR from "swr";
import Layout from "../components/Layout";
import VideoCard from "../components/VideoCard";
import { videos as staticVideos } from "../data/videos";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function Top() {
  const { data } = useSWR("/api/videos", fetcher);
  const allVideos =
    Array.isArray(data) && data.length > 0 ? [...data, ...staticVideos] : staticVideos;

  // Sắp xếp theo thời gian (mới nhất trước)
  const sorted = [...allVideos].sort((a, b) => {
    const tA = new Date(a.timestamp || 0).getTime();
    const tB = new Date(b.timestamp || 0).getTime();
    return tB - tA;
  });
  const top = sorted.slice(0, 10);

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Top Videos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {top.map((video, idx) => (
          <VideoCard key={idx} video={video} />
        ))}
      </div>
    </Layout>
  );
}
