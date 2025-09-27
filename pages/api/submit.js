export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  try {
    // Gửi dữ liệu đến Google Apps Script webhook
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbwyiPeTxUADkOGoLBNH1mFD97jPSkvNx7euPdBr-xCpLHyHqD2Dg5QajyOYsoWzQz1M/exec",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req.body),
      }
    );
    const data = await response.json();

    if (data.result === "success") {
      return res.status(200).json({ message: "Submitted successfully!", row: data.row });
    } else {
      return res.status(500).json({ error: "Google Script error", details: data });
    }
  } catch (error) {
    console.error("Submit API error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
