import { useState } from "react";
import Layout from "../components/Layout";

export default function Submit() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    platform: "YouTube",
    tags: "",
    category: "",
    video_url: "",
  });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch("/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const json = await res.json();
    setStatus(json.result === "success" ? "Video submitted!" : "Error submitting");
    if (json.result === "success") {
      setForm({ title: "", description: "", platform: "YouTube", tags: "", category: "", video_url: "" });
    }
  }

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Submit a Video</h1>

      {/* Hướng dẫn gửi video */}
      <div className="mb-6 p-4 bg-gray-100 border rounded-md">
        <h2 className="text-xl font-semibold mb-2">Guidelines for submitting</h2>
        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
          <li>Only submit high-quality videos that are under 10 minutes and appropriate for all ages.</li>
          <li>Provide a clear title and at least one descriptive tag.</li>
          <li>Do not submit videos that violate copyright or require a paid account to view.</li>
          <li>Add a short description (200–300 words) summarizing the content and explaining why you think this video is great.</li>
        </ul>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          placeholder="Title"
          className="w-full px-3 py-2 border rounded"
          required
          value={form.title}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Description (your unique summary/opinion)"
          className="w-full px-3 py-2 border rounded"
          required
          rows={4}
          value={form.description}
          onChange={handleChange}
        />
        <select
          name="platform"
          className="w-full px-3 py-2 border rounded"
          value={form.platform}
          onChange={handleChange}
        >
          <option value="YouTube">YouTube</option>
          <option value="Rumble">Rumble</option>
        </select>
        <input
          name="tags"
          placeholder="Tags (comma separated)"
          className="w-full px-3 py-2 border rounded"
          value={form.tags}
          onChange={handleChange}
        />
        <input
          name="category"
          placeholder="Category (e.g. gaming, finance...)"
          className="w-full px-3 py-2 border rounded"
          value={form.category}
          onChange={handleChange}
        />
        <input
          name="video_url"
          placeholder="Video URL"
          className="w-full px-3 py-2 border rounded"
          required
          value={form.video_url}
          onChange={handleChange}
        />
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Submit
        </button>
      </form>
      {status && <p className="mt-4 text-sm">{status}</p>}
    </Layout>
  );
}
