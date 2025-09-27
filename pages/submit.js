// pages/submit.js
import Layout from "@/components/Layout";

export default function Submit() {
  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Submit a Video</h1>
      <p className="mb-6 text-gray-600">
        Share your favorite YouTube or Rumble video with us. We’ll review and publish it if appropriate.
      </p>

      <form
        action="/api/submit"
        method="POST"
        className="space-y-4 max-w-xl"
      >
        <div>
          <label className="block mb-1 font-medium">Video Platform</label>
          <select name="platform" className="border rounded w-full p-2" required>
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
    </Layout>
  );
}
