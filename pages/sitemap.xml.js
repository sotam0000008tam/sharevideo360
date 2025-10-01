import { videos } from "../data/videos";

function generateSiteMap() {
  const baseUrl = "https://sharevideo360.com"; // đổi thành domain thật sau khi deploy

  // Trang tĩnh
  let urls = [
    "",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
    "/submit",
  ].map(
    (path) => `
      <url>
        <loc>${baseUrl}${path}</loc>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
      </url>
    `
  );

  // Trang video động
  const videoUrls = videos.map((video) => `
    <url>
      <loc>${baseUrl}/videos/${video.slug}</loc>
      <changefreq>weekly</changefreq>
      <priority>0.9</priority>
    </url>
  `);

  // Trang tag động
  const uniqueTags = Array.from(new Set(videos.flatMap((v) => v.tags || [])));
  const tagUrls = uniqueTags.map((tag) => `
    <url>
      <loc>${baseUrl}/tag/${encodeURIComponent(tag.toLowerCase())}</loc>
      <changefreq>weekly</changefreq>
      <priority>0.7</priority>
    </url>
  `);

  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls.join("")}
    ${videoUrls.join("")}
    ${tagUrls.join("")}
  </urlset>`;
}

export async function getServerSideProps({ res }) {
  const sitemap = generateSiteMap();

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default function Sitemap() {
  return null;
}
