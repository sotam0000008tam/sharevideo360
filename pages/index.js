// pages/index.js
import useSWR from "swr";
import Layout from "../components/Layout";
import VideoCard from "../components/VideoCard";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Home() {
  const { data, error } = useSWR("/api/videos", fetcher);

  if (error) return <Layout><div>⚠️ Lỗi khi tải video</div></Layout>;
  if (!data) return <Layout><div>⏳ Đang tải...</div></Layout>;

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">🎥 Video Gallery</h1>
      {data.length === 0 ? (
        <p>Chưa có video nào.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.map((video, idx) => (
            <VideoCard key={idx} video={video} />
          ))}
        </div>
      )}
    </Layout>
  );
}
