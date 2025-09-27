import Layout from "@/components/Layout";
import { useState } from "react";

export default function Submit() {
  const [status, setStatus] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("Submitting...");

    const formData = {
      platform: e.target.platform.value,
      video_url: e.target.video_url.value,
      title: e.target.title.value,
      description: e.target.description.value,
      tags: e.target.tags.value,
    };

    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (res.ok) {
        setStatus("✅ Submitted successfully!");
        e.target.reset();
      } else {
        console.error(result);
        setStatus("⚠️ Error: " + (result.error || "Unknown"));
      }
    } catch (err) {
      console.error(err);
      setStatus("⚠️ Network error.");
    }
  }

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Submit a Video</h1>
      <p className="mb-6 text-gray-600">
        Share your favorite YouTube or Rumble video with us. We’ll review and publish it if appropriate.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
        <div>
          <label className="block mb-1 font-medium">Video Platform</label>
          <select name="platform" className="border rounded w-full p-2" required>
            <option value="">Select</option>
            <option value="YouTube">YouTube</option>
            <option value="Rumble">Rumble</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Video URL or ID</label>
          <input
            type="text"
            name="video_url"
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
            className="border rounded w-full p-2"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
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
