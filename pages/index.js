import useSWR from "swr";
import Link from "next/link";
import Layout from "../components/Layout";
import VideoCard from "../components/VideoCard";
import { videos as staticVideos } from "../data/videos";
import { CATEGORY_LIST, belongsToCategory } from "../lib/videoUtils";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Home() {
  const { data } = useSWR("/api/videos", fetcher);

  // Kết hợp dữ liệu động với dữ liệu mẫu
  const allVideos =
    Array.isArray(data) && data.length > 0 ? [...data, ...staticVideos] : staticVideos;

  return (
    <Layout>
      {CATEGORY_LIST.map((cat) => {
        const categoryVideos = allVideos.filter((v) =>
          belongsToCategory(v, cat.slug)
        );
        const videosToShow = categoryVideos.slice(0, 6);
        return (
          <section key={cat.slug} className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-semibold">{cat.label}</h2>
              {categoryVideos.length > videosToShow.length && (
                <Link href={`/category/${cat.slug}`} legacyBehavior>
                  <a className="text-blue-600 text-sm hover:underline">
                    View all
                  </a>
                </Link>
              )}
            </div>
            {videosToShow.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                {videosToShow.map((video, idx) => (
                  <VideoCard key={idx} video={video} />
                ))}
              </div>
            ) : (
              <p>No videos in this category yet.</p>
            )}
          </section>
        );
      })}
    </Layout>
  );
}
