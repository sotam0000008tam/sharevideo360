// pages/api/videos.js
export default async function handler(req, res) {
  try {
    // Use the same Apps Script that handles submissions for reading
    // data.  When accessed with a GET request this script executes
    // the doGet() function, which returns a JSON object with a
    // `records` array containing all video rows.  This ensures the
    // API provides up‑to‑date data from your Google Sheet.
    const API_URL =
      "https://script.google.com/macros/s/AKfycbzymweXopfLxhW-9F9BE-Na6GCmbZfRmUYWJ86TXEqyENE10SxSMFe-CBK3UG8c9Oko/exec";

    const r = await fetch(API_URL, { cache: "no-store" });
    const json = await r.json();
    const list = Array.isArray(json) ? json : (json.records || []);

    // Chuẩn hóa dữ liệu tối thiểu
    const cleaned = list
      .filter((v) => v?.title && v?.video_url)
      .map((v) => ({
        title: v.title,
        description: v.description || "",
        platform: v.platform || "",
        tags: v.tags || "",
        category: v.category || "",
        video_url: v.video_url,
        timestamp: v.timestamp || "",
      }));

    res.status(200).json(cleaned);
  } catch (e) {
    console.error("API /videos error:", e);
    res.status(200).json([]); // tránh làm hỏng FE
  }
}
