// pages/api/videos.js

export default async function handler(req, res) {
  try {
    const sheetId = "1FAIpQLSddiNFexdyZA0ZSi6e9rqAIfwzL7ozFSv-wrP0euVlJp0bNvg"; // 👉 Thay bằng Google Sheet ID thật
    const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json`;

    const response = await fetch(url);
    const text = await response.text();

    // Google Sheets trả về JSON có wrapper, cần parse thủ công
    const json = JSON.parse(text.substr(47).slice(0, -2));
    const rows = json.table.rows;

    const videos = rows
      .map((row) => ({
        title: row.c[0]?.v || "",
        description: row.c[1]?.v || "",
        platform: row.c[2]?.v || "",
        tags: row.c[3]?.v || "",
        video_url: row.c[4]?.v || "",
        submittedAt: row.c[5]?.v || "",
      }))
      // chỉ giữ lại video có cả title và video_url
      .filter((v) => v.title && v.video_url);

    res.status(200).json(videos);
  } catch (err) {
    console.error("❌ Error fetching Google Sheet:", err);
    res.status(500).json({ error: "Failed to fetch videos" });
  }
}
