export default function VideoCard({ video }) {
  // Tạo embed URL an toàn
  function getEmbedUrl(video) {
    if (video.platform === "YouTube") {
      // nếu chứa "watch?v="
      if (video.video_url.includes("watch?v=")) {
        return video.video_url.replace("watch?v=", "embed/");
      }
      // nếu đã là embed
      return video.video_url;
    }
    // Rumble hoặc các platform khác: giữ nguyên
    return video.video_url;
  }

  const embedUrl = getEmbedUrl(video);

  return (
    <div className="border rounded-lg shadow p-4 bg-white">
      <h2 className="font-bold text-lg mb-2">{video.title || "No title"}</h2>
      {embedUrl ? (
        <iframe
          src={embedUrl}
          title={video.title}
          className="w-full aspect-video mb-2"
          allowFullScreen
        />
      ) : (
        <div className="w-full aspect-video bg-gray-200 flex items-center justify-center">
          No video URL
        </div>
      )}
      <p className="text-sm text-gray-600 mb-2">{video.description || ""}</p>
      <p className="text-xs text-gray-400">Tags: {video.tags || ""}</p>
    </div>
  );
}
