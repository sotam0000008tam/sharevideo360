// pages/api/videos.js

export default async function handler(req, res) {
  try {
    const sheetId = "1FAIpQLSddiNFexdyZA0ZSi6e9rqAIfwzL7ozFSv-wrP0euVlJp0bNvg"; // 👉 thay bằng ID Google Sheet thật
    const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json`;

    const response = await fetch(url);
    const text = await response.text();

    // Parse dữ liệu JSON Google Sheets trả về
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
      .filter((v) => v.title); // bỏ dòng trống

    res.status(200).json(videos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch videos" });
  }
}
