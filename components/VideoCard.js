// components/VideoCard.js
export default function VideoCard({ video }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="aspect-w-16 aspect-h-9">
        <iframe
          src={video.video_url}
          title={video.title}
          allowFullScreen
          className="w-full h-64"
        />
      </div>
      <div className="p-4">
        <h2 className="font-bold text-lg mb-2">{video.title}</h2>
        <p className="text-gray-600 text-sm mb-2">{video.description}</p>
        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
          {video.platform}
        </span>
      </div>
    </div>
  );
}
