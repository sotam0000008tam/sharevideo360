import { useEffect, useState } from "react";
import Head from "next/head";
import Layout from "@/components/Layout";
import VideoCard from "@/components/VideoCard";

export default function Home() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchVideos() {
      try {
        const res = await fetch("/api/videos");
        if (!res.ok) throw new Error("Failed to fetch videos");
        const data = await res.json();
        setVideos(data);
      } catch (error) {
        console.error("❌ Error loading videos:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchVideos();
  }, []);

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

      {loading ? (
        <p className="text-gray-500">Loading videos...</p>
      ) : videos.length === 0 ? (
        <p className="text-gray-500">No videos found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {videos.map((v, i) => (
            <VideoCard key={i} video={v} />
          ))}
        </div>
      )}
    </Layout>
  );
}
