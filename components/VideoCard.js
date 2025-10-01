// components/VideoCard.js
import Link from "next/link";
import { makeSlug, getThumbnail } from "../lib/videoUtils";

export default function VideoCard({ video }) {
  // Build a slug for the video to generate a stable URL.  We encode
  // the slug to avoid issues with special characters.
  const slug = makeSlug(video);

  // Normalise tags: the API returns tags as a string but the static
  // dataset uses an array.  Convert everything into a comma‐separated
  // string for display purposes.  If no tags are provided simply
  // return undefined so the tag element isn’t rendered.
  const tagsString = Array.isArray(video?.tags)
    ? video.tags.join(", ")
    : video?.tags || "";

  return (
    <Link href={`/videos/${encodeURIComponent(slug)}`}>
      <div className="border rounded-xl overflow-hidden shadow hover:shadow-lg transition bg-white cursor-pointer">
        {/* Video thumbnail placeholder.  We use a simple gradient for the
            background and overlay a play icon and the platform name. */}
        <div className="relative w-full aspect-video bg-gray-200">
          {/* Thumbnail image.  We use object-cover to maintain aspect ratio. */}
          <img
            src={getThumbnail(video)}
            alt={video.title}
            className="w-full h-full object-cover"
          />
          {/* Play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-black/60 rounded-full flex items-center justify-center">
              {/* Screen reader text to describe the purpose of this button */}
              <span className="sr-only">Play {video.title}</span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                aria-hidden="true"
                focusable="false"
                fill="currentColor"
                className="text-white"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
          {/* Platform label */}
          <div className="absolute top-2 left-2 text-xs bg-black/70 text-white px-2 py-0.5 rounded">
            {video.platform || "Video"}
          </div>
        </div>

        {/* Video meta: title, description and tags */}
        <div className="p-3">
          <h3 className="font-semibold text-base line-clamp-2">{video.title}</h3>
          <p
            className="text-sm text-gray-600 mt-1"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {video.description}
          </p>
          {tagsString && (
            <div className="mt-2 text-xs text-gray-500 truncate">
              {tagsString
                .split(",")
                .map((t) => t.trim())
                .filter(Boolean)
                .map((t) => `#${t}`)
                .join(" ")}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
