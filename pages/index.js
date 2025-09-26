import Head from "next/head";
import Layout from "@/components/Layout";
import VideoCard from "@/components/VideoCard";
import { useEffect, useState } from "react";

export default function Home() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch("/api/videos")
      .then((res) => res.json())
      .then((data) => setVideos(data));
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {videos.map((v, i) => (
          <VideoCard key={i} video={v} />
        ))}
      </div>
    </Layout>
  );
}
