import { useRouter } from "next/router";
import useSWR from "swr";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { toEmbedUrl, makeSlug, getThumbnail, belongsToCategory, slugify } from "../../lib/videoUtils";
import { videos as staticVideos } from "../../data/videos";
import Head from "next/head";
import VideoCard from "../../components/VideoCard";
import Link from "next/link";

const fetcher = (u) => fetch(u).then((r) => r.json());

export default function VideoDetail() {
  const router = useRouter();
  const { slug } = router.query;
  const { data } = useSWR("/api/videos", fetcher);
  const list = Array.isArray(data) && data.length > 0 ? [...data, ...staticVideos] : staticVideos;
  const video = list.find((v) => makeSlug(v) === slug);

  // Likes stored per-user in localStorage
  const [likes, setLikes] = useState(0);
  useEffect(() => {
    if (!slug) return;
    const saved = parseInt(localStorage.getItem(`likes_${slug}`) || "0", 10);
    setLikes(saved);
  }, [slug]);
  function handleLike() {
    const newLikes = likes + 1;
    setLikes(newLikes);
    localStorage.setItem(`likes_${slug}`, newLikes);
  }

  if (!video) {
    return (
      <Layout>
        <h1 className="text-xl font-bold">Video not found</h1>
      </Layout>
    );
  }

  // Related videos by category or tags
  const currentCategorySlug = video.category ? slugify(video.category) : null;
  function shareTags(a, b) {
    const atags = Array.isArray(a?.tags) ? a.tags : (a?.tags || "").split(/[\\s,]+/);
    const btags = Array.isArray(b?.tags) ? b.tags : (b?.tags || "").split(/[\\s,]+/);
    return atags.some((t) => {
      const tag = t.trim().toLowerCase();
      return tag && btags.some((t2) => t2.trim().toLowerCase() === tag);
    });
  }
  let related;
  if (currentCategorySlug) {
    related = list.filter((v) => v !== video && belongsToCategory(v, currentCategorySlug));
  } else {
    related = list.filter((v) => v !== video && shareTags(v, video));
  }
  related = related.slice(0, 6);

  // Build share URLs
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";
  const twitterShare = `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(video.title)}`;
  const facebookShare = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;

  const thumbnail = getThumbnail(video);
  const embedUrl = toEmbedUrl(video);

  return (
    <Layout>
      <Head>
        <title>{video.title} — ShareVideo360</title>
        <meta name="description" content={video.description || ""} />
        {/* Schema.org VideoObject for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "VideoObject",
              name: video.title,
              description: video.description || "",
              thumbnailUrl: thumbnail,
              uploadDate: video.timestamp,
              contentUrl: video.video_url,
              embedUrl: embedUrl,
            }),
          }}
        />
      </Head>

      <div className="max-w-4xl mx-auto">
        {/* Video player */}
        <div className="aspect-video mb-4">
          <iframe
            src={embedUrl}
            title={video.title}
            allowFullScreen
            loading="lazy"
            className="w-full h-full rounded-lg border"
          ></iframe>
        </div>

        {/* Title and description */}
        <h1 className="text-2xl font-bold mb-2">{video.title}</h1>
        <p className="text-gray-700 mb-4 whitespace-pre-line">{video.description}</p>

        {/* Likes and share buttons */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={handleLike}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            👍 Like ({likes})
          </button>
          <a href={facebookShare} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-sm">
            Share on Facebook
          </a>
          <a href={twitterShare} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-sm">
            Share on X/Twitter
          </a>
        </div>

        {/* Related videos */}
        {related.length > 0 && (
          <section>
            <h2 className="text-xl font-bold mb-3">Related Videos</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {related.map((v, i) => (
                <VideoCard key={i} video={v} />
              ))}
            </div>
          </section>
        )}
      </div>
    </Layout>
  );
}
