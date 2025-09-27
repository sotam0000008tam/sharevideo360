import Papa from "papaparse";

const CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vTbaiQwCJAPsg2XVIAhkq9HgVRgwEd0mcPpfOn_VTq9_Dn71_S_ZzQ7b-xU9WMda3V9G_XEq8maApQK/pub?gid=812465050&single=true&output=csv";

export default async function handler(req, res) {
  try {
    const response = await fetch(CSV_URL);
    const csv = await response.text();

    const parsed = Papa.parse(csv, { header: true, skipEmptyLines: true });
    const records = parsed.data.filter((row) => row.title && row.video_url);

    res.status(200).json(records);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch videos", details: err.message });
  }
}
