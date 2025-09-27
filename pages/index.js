import Head from "next/head";
import Layout from "@/components/Layout";
import VideoCard from "@/components/VideoCard";
import useSWR from "swr";

// fetcher để gọi API
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Home() {
  // gọi API /api/videos bằng SWR
  const { data, error } = useSWR("/api/videos", fetcher);

  if (error) return <div className="p-4 text-red-600">Failed to load videos.</div>;
  if (!data) return <div className="p-4">Loading...</div>;

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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {data.map((video, idx) => (
          <VideoCard key={idx} video={video} />
        ))}
      </div>
    </Layout>
  );
}
