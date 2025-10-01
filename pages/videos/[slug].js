// pages/videos/[slug].js
import { useRouter } from "next/router";
import useSWR from "swr";
import Layout from "../../components/Layout";
import { toEmbedUrl, makeSlug, belongsToCategory, getThumbnail, slugify } from "../../lib/videoUtils";
import { videos as staticVideos } from "../../data/videos";
import Head from "next/head";
import VideoCard from "../../components/VideoCard";

const fetcher = (u) => fetch(u).then((r) => r.json());

export default function VideoDetail() {
  const router = useRouter();
  const { slug } = router.query;

  // Fetch the dynamic list of videos.  We'll merge this list with
  // the local static dataset to ensure that videos defined locally
  // can still be displayed if they are not returned by the API.
  const { data, error } = useSWR("/api/videos", fetcher);

  if (error) return <Layout>Error loading video.</Layout>;

  // Combine the API-provided list (if any) with the static dataset.
  const list = Array.isArray(data) && data.length > 0
    ? [...data, ...staticVideos]
    : staticVideos;

  // Find the video by slug within the combined list.  Using the
  // combined list ensures that videos from the static dataset are
  // available even if the API call fails or does not include them.
  const video = list.find((v) => makeSlug(v) === slug);

  if (!video) {
    return (
      <Layout>
        <h1 className="text-xl font-bold">Video not found</h1>
      </Layout>
    );
  }

  // Embed URL
  const embedUrl = toEmbedUrl(video);

  // Compute a thumbnail for social sharing.  If a YouTube thumbnail is
  // available it will be used; otherwise a placeholder is returned.
  const thumbnail = getThumbnail(video);

  // Determine related videos.  If the current video has an explicit
  // category, we use that to find other videos in the same category.
  // Otherwise we fall back to tag matching.  Tag matching is case
  // insensitive and works whether tags are a comma‐separated string or
  // an array.
  const currentCategorySlug = video?.category
    ? slugify(video.category)
    : null;
  function shareTags(a, b) {
    const atags = Array.isArray(a?.tags)
      ? a.tags
      : (a?.tags || "").split(/[,\s]+/);
    const btags = Array.isArray(b?.tags)
      ? b.tags
      : (b?.tags || "").split(/[,\s]+/);
    return atags.some((t) => {
      const tag = t.trim().toLowerCase();
      return tag && btags.some((t2) => t2.trim().toLowerCase() === tag);
    });
  }
  let related;
  if (currentCategorySlug) {
    related = list.filter(
      (v) => v !== video && belongsToCategory(v, currentCategorySlug)
    );
  } else {
    related = list.filter((v) => v !== video && shareTags(v, video));
  }
  related = related.slice(0, 6);

  return (
    <Layout>
      {/* Dynamic head tags for SEO and social media.  These help Google
          understand the content of your page and can improve AdSense
          approval. */}
      <Head>
        <title>{video.title} — ShareVideo360</title>
        <meta name="description" content={video.description || ''} />
        <meta property="og:title" content={video.title} />
        <meta property="og:description" content={video.description || ''} />
        {thumbnail && <meta property="og:image" content={thumbnail} />}
        <meta property="og:type" content="video.other" />
      </Head>
      <div className="max-w-4xl mx-auto">
        {/* Video Player */}
        <div className="aspect-video mb-4">
          <iframe
            src={embedUrl}
            title={video.title}
            allowFullScreen
            className="w-full h-full rounded-lg border"
          ></iframe>
        </div>

        {/* Title + Description */}
        <h1 className="text-2xl font-bold mb-2">{video.title}</h1>
        <p className="text-gray-700 mb-6 whitespace-pre-line">
          {video.description}
        </p>

        {/* Related Videos */}
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
