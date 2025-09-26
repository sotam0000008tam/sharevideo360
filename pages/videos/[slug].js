import Head from "next/head";
import Link from "next/link";
import Layout from "@/components/Layout";
import VideoPlayer from "@/components/VideoPlayer";
import { videos } from "@/data/videos";

export async function getStaticPaths() {
  return {
    paths: videos.map(v => ({ params: { slug: v.slug } })),
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const video = videos.find(v => v.slug === params.slug);
  return { props: { video } };
}

export default function VideoDetail({ video }) {
  return (
    <Layout>
      <Head>
        <title>{video.title} — Video Gallery</title>
        <meta name="description" content={video.description?.slice(0, 150)} />
        <meta property="og:image" content={video.thumbnail} />
      </Head>
      <article className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          <h1 className="text-3xl font-bold">{video.title}</h1>
          <VideoPlayer platform={video.platform} id={video.id} title={video.title} />
          <div>
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="leading-relaxed">{video.description}</p>
          </div>
        </div>
        <aside className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {video.tags?.map(tag => (
                <Link key={tag} href={`/tag/${encodeURIComponent(tag)}`} className="badge hover:bg-gray-300">
                  {tag}
                </Link>
              ))}
            </div>
          </div>
          <div className="text-sm text-gray-500">
            <p><strong>Source:</strong> {video.platform}</p>
          </div>
        </aside>
      </article>
    </Layout>
  );
}
