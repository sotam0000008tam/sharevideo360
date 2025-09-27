// pages/api/videos.js
import Papa from "papaparse";

export default async function handler(req, res) {
  try {
    // ✅ CSV link mới của bạn
    const csvUrl =
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vTbaiQwCJAPsg2XVIAhkq9HgVRgwEd0mcPpfOn_VTq9_Dn71_S_ZzQ7b-xU9WMda3V9G_XEq8maApQK/pub?gid=812465050&single=true&output=csv";

    const response = await fetch(csvUrl);
    const csvText = await response.text();

    const parsed = Papa.parse(csvText, { header: true });
    const rows = parsed.data.filter((r) => r.Title); // bỏ dòng rỗng

    const videos = rows.map((r) => ({
      title: r.Title,
      description: r.Description,
      platform: r.Platform,
      tags: r.Tags,
      video_url: r["Video URL"],
      createdAt: r.Timestamp,
    }));

    res.status(200).json(videos);
  } catch (err) {
    console.error("API /videos error:", err);
    res.status(500).json({ error: "Failed to fetch videos" });
  }
}
