import Link from "next/link";
import Image from "next/image";

export default function VideoCard({ video }) {
  return (
    <Link href={`/videos/${video.slug}`} className="block card overflow-hidden">
      <div className="relative w-full aspect-video">
        <Image src={video.thumbnail} alt={video.title} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover" />
      </div>
      <div className="p-4">
        <h3 className="font-semibold line-clamp-2">{video.title}</h3>
        <div className="mt-2 flex flex-wrap gap-2">
          {video.tags?.slice(0,3).map(tag => (
            <span key={tag} className="badge">{tag}</span>
          ))}
        </div>
      </div>
    </Link>
  );
}
