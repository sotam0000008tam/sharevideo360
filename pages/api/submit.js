export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const response = await fetch("https://script.google.com/macros/s/AKfycbwZ8h8uwOHsXoiqPdhh-Mw-2tFY6G0mIhhLwVF_SpNRl5331cDlOF6dmYsVVFbdiFbF/exec", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req.body),
      });

      if (!response.ok) throw new Error("Failed to submit to Google Sheets");

      return res.status(200).json({ message: "Submitted successfully" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
