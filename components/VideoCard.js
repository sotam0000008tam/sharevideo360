export default function VideoCard({ video }) {
  return (
    <div className="border rounded-lg shadow p-4">
      <h2 className="text-xl font-semibold mb-2">{video.title}</h2>
      <p className="text-gray-600 mb-2">{video.description}</p>
      <iframe
        className="w-full aspect-video"
        src={video.video_url}
        title={video.title}
        frameBorder="0"
        allowFullScreen
      ></iframe>
      <p className="mt-2 text-sm text-gray-500">
        {video.platform} | {video.tags}
      </p>
    </div>
  );
}
