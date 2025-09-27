// pages/index.js
import Head from "next/head";
import useSWR from "swr";
import Layout from "@/components/Layout";
import VideoCard from "@/components/VideoCard";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Home() {
  const { data, error } = useSWR("/api/videos", fetcher);

  if (error) return <div>⚠️ Lỗi tải video.</div>;
  if (!data) return <div>Đang tải...</div>;

  return (
    <Layout>
      <Head>
        <title>Video Gallery — Home</title>
        <meta
          name="description"
          content="A curated gallery of embedded videos from YouTube and Rumble with original commentary."
        />
      </Head>
      <h1 className="text-3xl font-bold mb-6">Latest Videos</h1>

      {data.length === 0 ? (
        <p>⚠️ Chưa có video nào.</p>
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
