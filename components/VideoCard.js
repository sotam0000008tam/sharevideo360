// components/VideoCard.js
export default function VideoCard({ video }) {
  // Kiểm tra có video_url hợp lệ không
  if (!video.video_url) {
    return null; // bỏ qua render video hỏng
  }

  let embedUrl = video.video_url;

  if (video.platform === "YouTube" && video.video_url.includes("watch?v=")) {
    embedUrl = video.video_url.replace("watch?v=", "embed/");
  }

  return (
    <div className="border rounded-lg shadow-md p-4 bg-white">
      <h2 className="font-bold text-lg mb-2">{video.title}</h2>
      <iframe
        src={embedUrl}
        title={video.title}
        className="w-full aspect-video mb-3"
        frameBorder="0"
        allowFullScreen
      ></iframe>
      <p className="text-sm text-gray-600 mb-2">{video.description}</p>
      <p className="text-xs text-gray-400">Tags: {video.tags}</p>
    </div>
  );
}
