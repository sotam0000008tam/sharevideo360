import Head from "next/head";
import Layout from "@/components/Layout";
import VideoCard from "@/components/VideoCard";
import { videos } from "@/data/videos";

export async function getStaticPaths() {
  const allTags = [...new Set(videos.flatMap(v => v.tags || []))];
  return { paths: allTags.map(t => ({ params: { tag: t } })), fallback: false };
}

export async function getStaticProps({ params }) {
  const tag = params.tag;
  const list = videos.filter(v => v.tags?.includes(tag));
  return { props: { tag, list } };
}

export default function TagPage({ tag, list }) {
  return (
    <Layout>
      <Head>
        <title>Videos tagged "{tag}" — Video Gallery</title>
      </Head>
      <h1 className="text-3xl font-bold mb-6">Tag: {tag}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {list.map(v => <VideoCard key={v.slug} video={v} />)}
      </div>
    </Layout>
  );
}
