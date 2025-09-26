export default function VideoPlayer({ platform, id, title }) {
  const src = platform === "YouTube"
    ? `https://www.youtube.com/embed/${id}`
    : `https://rumble.com/embed/${id}/`;

  return (
    <div className="w-full aspect-video rounded-2xl overflow-hidden">
      <iframe
        src={src}
        title={title}
        width="100%"
        height="100%"
        className="w-full h-full"
        frameBorder="0"
        allowFullScreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      />
    </div>
  );
}
