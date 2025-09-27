// pages/api/videos.js
export default async function handler(req, res) {
  try {
    // Link JSON từ Google Sheets (Publish to web → đổi pubhtml thành gviz/tq)
    const SHEET_URL =
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vTbaiQwCJAPsg2XVIAhkq9HgVRgwEd0mcPpfOn_VTq9_Dn71_S_ZzQ7b-xU9WMda3V9G_XEq8maApQK/gviz/tq?tqx=out:json&sheet=Form%20Responses%201";

    // Lấy dữ liệu từ Google Sheets
    const response = await fetch(SHEET_URL);
    const text = await response.text();

    // Xử lý JSON (Google trả về dạng đặc biệt)
    const json = JSON.parse(text.replace(/^[^\{]+/, "").replace(/\);?$/, ""));

    const rows = json.table.rows;

    // Map thành video objects
    const videos = rows.map((row) => ({
      title: row.c[0]?.v || "",
      description: row.c[1]?.v || "",
      platform: row.c[2]?.v || "",
      tags: row.c[3]?.v || "",
      video_url: row.c[4]?.v || "",
      createdAt: row.c[5]?.v || "",
    }));

    res.status(200).json(videos);
  } catch (err) {
    console.error("API /videos error:", err);
    res.status(500).json({ error: "Failed to fetch videos" });
  }
}
