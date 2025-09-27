export default async function handler(req, res) {
  try {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbwyiPeTxUADkOGoLBNH1mFD97jPSkvNx7euPdBr-xCpLHyHqD2Dg5QajyOYsoWzQz1M/exec"
    );
    const data = await response.json();

    // Dữ liệu từ doGet trả về: { records: [...] }
    const recs = data.records || [];

    const videos = recs
      .filter((r) => r.video_url)  // bỏ dòng không có url
      .map((r) => ({
        title: r.title,
        description: r.description,
        platform: r.platform,
        tags: r.tags,
        video_url: r.video_url,
      }));

    res.status(200).json(videos);
  } catch (error) {
    console.error("Error fetch videos:", error);
    res.status(500).json({ error: "Failed to fetch videos" });
  }
}
