import { useState } from "react";
import Layout from "@/components/Layout";

export default function Submit() {
  const [formData, setFormData] = useState({
    platform: "",
    video_url: "",
    title: "",
    description: "",
    tags: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://script.google.com/macros/s/AKfycbyd3h92I3nyoN1yqSpdseMiBFpvkpEHpMyuF5fOsVGK1Ic-tZseE7G0Pn1lUWZ5lS3M/exec", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("✅ Video submitted successfully!");
        setFormData({
          platform: "",
          video_url: "",
          title: "",
          description: "",
          tags: "",
        });
      } else {
        alert("❌ Failed to submit video. Try again.");
      }
    } catch (error) {
      alert("⚠️ Error: " + error.message);
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
        <div>
          <label className="block mb-1 font-medium">Video Platform</label>
          <select
            name="platform"
            value={formData.platform}
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
          <label className="block mb-1 font-medium">Video URL or ID</label>
          <input
            type="text"
            name="video_url"
            value={formData.video_url}
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
            value={formData.title}
            onChange={handleChange}
            className="border rounded w-full p-2"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            className="border rounded w-full p-2"
            required
          ></textarea>
        </div>

        <div>
          <label className="block mb-1 font-medium">Tags (comma separated)</label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
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
    </Layout>
  );
}
