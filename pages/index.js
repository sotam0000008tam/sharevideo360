import Head from "next/head";
import Layout from "@/components/Layout";
import VideoCard from "@/components/VideoCard";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function Home() {
  const { data, error } = useSWR("/api/videos", fetcher);

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

      {error && (
        <p className="text-red-600 mb-4">
          ⚠️ Lỗi khi tải dữ liệu, đang hiển thị nội dung dự phòng.
        </p>
      )}

      {!data ? (
        <p>Loading...</p>
      ) : data.length === 0 ? (
        <p className="text-gray-500">Chưa có video nào.</p>
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
