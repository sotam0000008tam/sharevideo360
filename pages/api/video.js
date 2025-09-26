// pages/api/videos.js
import { videos as localVideos } from "@/data/videos";

export default async function handler(req, res) {
  try {
    const SHEET_ID = "1FAIpQLSddiNFexdyZA0ZSi6e9rqAIfwzL7ozFSv-wrP0euVlJp0bNvg"; // thay thật
    const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv`;

    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch sheet");

    const csv = await response.text();
    const rows = csv.split("\n").slice(1);
    const sheetVideos = rows
      .map((r) => {
        const cols = r.split(",");
        if (!cols[0]) return null;
        return {
          platform: cols[0],
          video_url: cols[1],
          title: cols[2],
          description: cols[3],
          tags: cols[4]?.split(";").map((t) => t.trim()) || [],
          slug: cols[2]?.toLowerCase().replace(/\s+/g, "-"),
        };
      })
      .filter(Boolean);

    res.status(200).json(sheetVideos);
  } catch (err) {
    console.error("Error fetching Google Sheet:", err.message);
    res.status(200).json(localVideos); // fallback nếu lỗi
  }
}
