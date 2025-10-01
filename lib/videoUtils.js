// lib/videoUtils.js

// Tạo slug từ text
export function slugify(str = "") {
  return (str || "")
    .toString()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // bỏ dấu
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80) || "video";
}

// Sinh ID ngắn từ URL + timestamp
export function shortIdFromUrl(url = "", ts = "") {
  const seed = (url + "|" + ts).replace(/[^a-zA-Z0-9]/g, "");
  return seed.slice(-6) || "vid";
}

// Slug hoàn chỉnh cho video
// Use the content ID from the URL whenever possible to create a stable slug.
// We try to extract the YouTube or Rumble ID first; if no ID can be
// extracted we fall back to a short hash of the URL itself.  The
// timestamp is intentionally ignored so that a video recorded at
// different times (for example in the sample dataset versus the
// dynamic sheet) yields the same slug.  This makes it easier to
// match videos between the home page and the detail page.
export function makeSlug(video) {
  const titleSlug = slugify(video?.title);
  const youTubeId = getYouTubeId(video?.video_url);
  const rumbleId = getRumbleId(video?.video_url);
  const uniqueId =
    youTubeId ||
    rumbleId ||
    // Use an empty timestamp so the ID is based solely on the URL.  If
    // two different videos share the same ID and title it may
    // collide, but this is unlikely and acceptable for our use case.
    shortIdFromUrl(video?.video_url || "", "");
  return `${titleSlug}-${uniqueId}`;
}

// Parse YouTube ID
export function getYouTubeId(url = "") {
  if (!url) return null;
  const m =
    url.match(/(?:v=|\/embed\/|youtu\.be\/)([A-Za-z0-9_-]{6,})/) ||
    url.match(/youtube\.com\/shorts\/([A-Za-z0-9_-]{6,})/);
  return m ? m[1] : null;
}

// Parse Rumble ID
export function getRumbleId(url = "") {
  if (!url) return null;
  const m = url.match(/rumble\.com\/(?:embed\/)?([A-Za-z0-9]+)\b/);
  return m ? m[1] : null;
}

// Convert URL sang embed URL
export function toEmbedUrl(video) {
  const u = video?.video_url || "";
  if (/youtu\.?be/.test(u)) {
    const id = getYouTubeId(u);
    return id ? `https://www.youtube.com/embed/${id}` : u;
  }
  if (/rumble\.com/.test(u)) {
    if (/\/embed\//.test(u)) return u;
    const id = getRumbleId(u);
    return id ? `https://rumble.com/embed/${id}` : u;
  }
  return u;
}

// Thumbnail cho video
export function getThumbnail(video) {
  const u = video?.video_url || "";
  const yt = getYouTubeId(u);
  if (yt) return `https://img.youtube.com/vi/${yt}/hqdefault.jpg`;
  // Rumble doesn't provide a reliable thumbnail API.  We fall back
  // to a local placeholder image located in the public directory.  You
  // can replace `default-thumbnail.png` with your own asset.
  return "/default-thumbnail.png";
}

// Danh sách category
export const CATEGORY_LIST = [
  { slug: "entertainment", label: "Entertainment" },
  { slug: "sports", label: "Sports" },
  { slug: "animation", label: "Animation" },
  { slug: "gaming", label: "Gaming" },
  { slug: "finance", label: "Finance" },
  { slug: "crypto", label: "Crypto" },
  { slug: "how-to", label: "How To" },
  { slug: "tips", label: "Tips" },
];

// Check xem video có thuộc category nào không
export function belongsToCategory(video, catSlug) {
  // If the video has an explicit category field, use it to match
  // directly against the provided catSlug.  We slugify the category
  // value to normalise spacing and case, then compare to the slug
  // provided for the category page.
  if (video?.category) {
    const videoSlug = slugify(video.category);
    if (videoSlug === catSlug) return true;
  }

  // Otherwise fall back to analysing the tags.  Normalise the tags
  // into a single lowercase string.  The API returns tags as a
  // comma-separated string while the static data uses an array.
  const tagsString = Array.isArray(video?.tags)
    ? video.tags.join(' ')
    : video?.tags || '';
  const tags = tagsString.toLowerCase();

  // Define keyword mappings for each category.  The Vietnamese
  // translations remain intact for more flexible matching.
  const map = {
    entertainment: ['entertainment', 'fun', 'giải trí'],
    sports: ['sports', 'bóng đá', 'the thao', 'sport'],
    animation: ['animation', 'cartoon', 'anime', 'hoat hinh'],
    gaming: ['gaming', 'game', 'esports'],
    finance: ['finance', 'tài chính', 'tai chinh', 'money', 'stock'],
    crypto: ['crypto', 'bitcoin', 'ethereum', 'btc', 'eth', 'web3'],
    'how-to': ['how to', 'how-to', 'tutorial', 'guide'],
    tips: ['tips', 'hack', 'trick', 'mẹo', 'meo'],
  };
  const keywords = map[catSlug] || [];
  return keywords.some((k) => tags.includes(k));
}
