// pages/api/submit.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { title, description, platform, tags, video_url } = req.body;

    const SCRIPT_URL =
      "https://script.google.com/macros/s/AKfycbwyiPeTxUADkOGoLBNH1mFD97jPSkvNx7euPdBr-xCpLHyHqD2Dg5QajyOYsoWzQz1M/exec";

    const response = await fetch(SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify({ title, description, platform, tags, video_url }),
      headers: { "Content-Type": "application/json" },
    });

    const json = await response.json();
    res.status(200).json(json);

  } catch (err) {
    console.error("API /submit error:", err);
    res.status(500).json({ error: "Submit failed" });
  }
}
