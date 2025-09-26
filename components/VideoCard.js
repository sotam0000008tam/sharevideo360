export default function VideoCard({ video }) {
  return (
    <div className="border rounded-lg p-4 shadow">
      <h2 className="text-xl font-semibold">{video.title}</h2>
      <p className="text-gray-600">{video.description}</p>

      <iframe
        className="w-full h-64 mt-3"
        src={
          video.platform === "YouTube"
            ? video.video_url.replace("watch?v=", "embed/")
            : video.video_url
        }
        frameBorder="0"
        allowFullScreen
      ></iframe>

      <div className="mt-2 text-sm text-blue-600">Tags: {video.tags}</div>
    </div>
  );
}
