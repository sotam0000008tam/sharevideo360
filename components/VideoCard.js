import Link from "next/link";
import { makeSlug, toEmbedUrl } from "../lib/videoUtils";

/**
 * Hiển thị thẻ video với iFrame preview (ảnh bìa tự động).
 * Lớp phủ (overlay) đảm bảo khi click sẽ mở trang chi tiết, không phát video tại trang chủ.
 */
export default function VideoCard({ video }) {
  const slug = makeSlug(video);

  return (
    <div className="relative border rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow">
      {/* iFrame hiển thị ảnh bìa và nút play */}
      <iframe
        src={toEmbedUrl(video)}
        title={video.title}
        loading="lazy"
        className="w-full aspect-video pointer-events-none"
        allowFullScreen={false}
      />
      {/* Lớp phủ: click chuyển đến trang chi tiết */}
      <Link href={`/videos/${slug}`} legacyBehavior>
        <a className="absolute inset-0" aria-label={video.title}></a>
      </Link>
      {/* Tiêu đề & mô tả ngắn */}
      <div className="p-3 bg-white">
        <h3 className="font-semibold text-sm line-clamp-2">{video.title}</h3>
        <p className="text-xs text-gray-600 line-clamp-3">{video.description}</p>
      </div>
    </div>
  );
}
