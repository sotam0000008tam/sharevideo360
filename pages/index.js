import Head from "next/head";
import Layout from "@/components/Layout";
import VideoCard from "@/components/VideoCard";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Home() {
  const { data, error } = useSWR("/api/videos", fetcher);

  if (error) {
    return (
      <Layout>
        <div className="p-4 text-red-600">❌ Failed to load videos.</div>
      </Layout>
    );
  }

  if (!data) {
    return (
      <Layout>
        <div className="p-4">⏳ Loading...</div>
      </Layout>
    );
  }

  if (!Array.isArray(data)) {
    return (
      <Layout>
        <div className="p-4 text-red-600">⚠️ API trả về sai định dạng.</div>
        <pre className="bg-gray-100 p-2 rounded">{JSON.stringify(data, null, 2)}</pre>
      </Layout>
    );
  }

  return (
    <Layout>
      <Head>
        <title>Video Gallery — Home</title>
      </Head>

      <h1 className="text-3xl font-bold mb-6">Latest Videos</h1>

      {data.length === 0 ? (
        <div className="p-4 text-gray-600">⚠️ Chưa có video nào.</div>
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
