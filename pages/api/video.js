export default async function handler(req, res) {
  try {
    const SHEET_ID = "1FAIpQLSddiNFexdyZA0ZSi6e9rqAIfwzL7ozFSv-wrP0euVlJp0bNvg"; // Thay bằng Google Sheet ID thật
    const SHEET_NAME = "Form Responses 1"; // Tên sheet, mặc định là Form Responses 1
    const API_KEY = process.env.AIzaSyAvEfDKZG8tNJ1r3-SAxuQWdTnPZpeTs20; // Tạo API Key trong Google Cloud Console

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(
      SHEET_NAME
    )}?key=${API_KEY}`;

    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch Google Sheets data");

    const data = await response.json();
    const rows = data.values;

    if (!rows || rows.length < 2) {
      return res.status(200).json([]);
    }

    // Dòng đầu tiên là header, nên bỏ qua
    const headers = rows[0];
    const videos = rows.slice(1).map((row, index) => {
      const entry = {};
      headers.forEach((key, i) => {
        entry[key.toLowerCase().replace(/\s+/g, "_")] = row[i] || "";
      });
      return {
        id: index + 1,
        title: entry.title,
        description: entry.description,
        platform: entry.platform,
        tags: entry.tags,
        video_url: entry.video_url,
        slug: entry.title ? entry.title.toLowerCase().replace(/\s+/g, "-") : `video-${index + 1}`,
      };
    });

    res.status(200).json(videos);
  } catch (error) {
    console.error("Error fetching videos:", error);
    res.status(500).json({ error: error.message });
  }
}
