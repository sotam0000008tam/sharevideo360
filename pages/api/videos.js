// pages/api/videos.js
export default async function handler(req, res) {
  try {
    const SHEET_ID = "1kqaz5DmptluTMeq6IZF4tRjY3roWYSgH4Na-G-UZp1k"; // Sheet ID của bạn
    const SHEET_NAME = "Form Responses 1"; // Tên sheet
    const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(SHEET_NAME)}`;

    const response = await fetch(url);
    const text = await response.text();

    // Google trả về dạng: "/*O_o*/\ngoogle.visualization.Query.setResponse({...});"
    const json = JSON.parse(
      text.substring(text.indexOf("{"), text.lastIndexOf("}") + 1)
    );

    const rows = json.table.rows.map((row) => ({
      title: row.c[0]?.v || "",
      description: row.c[1]?.v || "",
      platform: row.c[2]?.v || "",
      tags: row.c[3]?.v || "",
      video_url: row.c[4]?.v || "",
      createdAt: row.c[5]?.v || "",
    }));

    res.status(200).json(rows);
  } catch (err) {
    console.error("API /videos error:", err);
    res.status(500).json({ error: "Failed to fetch videos" });
  }
}
