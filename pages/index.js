import Head from "next/head";
import Layout from "@/components/Layout";
import VideoCard from "@/components/VideoCard";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

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

      {error && <p className="text-red-500">⚠️ Failed to load videos</p>}
      {!data && <p>⏳ Loading...</p>}

      {data && data.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data.map((v, idx) => (
            <VideoCard key={idx} video={v} />
          ))}
        </div>
      ) : (
        data && <p>No videos yet.</p>
      )}
    </Layout>
  );
}
