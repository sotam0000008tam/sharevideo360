// pages/api/submit.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Gửi dữ liệu vào Google Apps Script Webhook
    const webhookUrl =
      "https://script.google.com/macros/s/AKfycbwyiPeTxUADkOGoLBNH1mFD97jPSkvNx7euPdBr-xCpLHyHqD2Dg5QajyOYsoWzQz1M/exec";

    const response = await fetch(webhookUrl, {
      method: "POST",
      body: JSON.stringify(req.body),
      headers: { "Content-Type": "application/json" },
    });

    const result = await response.json();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
