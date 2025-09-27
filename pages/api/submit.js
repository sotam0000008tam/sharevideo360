export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbwyiPeTxUADkOGoLBNH1mFD97jPSkvNx7euPdBr-xCpLHyHqD2Dg5QajyOYsoWzQz1M/exec",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(req.body),
        }
      );

      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Failed to submit video", details: error.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
