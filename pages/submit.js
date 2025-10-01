import { useState } from "react";
import Layout from "../components/Layout";
import { CATEGORY_LIST } from "../lib/videoUtils";

export default function Submit() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    platform: "",
    tags: "",
    video_url: "",
    category: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Submitting...");

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (data.result === "success") {
        setStatus("✅ Submitted successfully!");
        setForm({
          title: "",
          description: "",
          platform: "",
          tags: "",
          video_url: "",
          category: "",
        });
      } else {
        setStatus("❌ Submission failed.");
      }
    } catch (err) {
      setStatus("⚠️ Error: " + err.message);
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Submit a Video</h1>
      <p className="mb-6 text-gray-600">
        Share your favorite YouTube or Rumble video with us. We’ll review and
        publish it if appropriate.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
        {/* Category selector */}
        <div>
          <label className="block mb-1 font-medium">Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="border rounded w-full p-2"
            required
          >
            <option value="">Select</option>
            {CATEGORY_LIST.map((cat) => (
              <option key={cat.slug} value={cat.slug}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Video Platform</label>
          <select
            name="platform"
            value={form.platform}
            onChange={handleChange}
            className="border rounded w-full p-2"
            required
          >
            <option value="">Select</option>
            <option value="YouTube">YouTube</option>
            <option value="Rumble">Rumble</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Video URL</label>
          <input
            type="text"
            name="video_url"
            value={form.video_url}
            onChange={handleChange}
            className="border rounded w-full p-2"
            placeholder="https://youtube.com/watch?v=..."
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="border rounded w-full p-2"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="4"
            className="border rounded w-full p-2"
            required
          ></textarea>
        </div>

        <div>
          <label className="block mb-1 font-medium">Tags (comma separated)</label>
          <input
            type="text"
            name="tags"
            value={form.tags}
            onChange={handleChange}
            className="border rounded w-full p-2"
            placeholder="Music, Pop, Trending"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>

      {status && <p className="mt-4">{status}</p>}
    </Layout>
  );
}
