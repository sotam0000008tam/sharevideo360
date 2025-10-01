import Head from "next/head";
import Layout from "../components/Layout";

export default function Contact() {
  return (
    <Layout>
      <Head>
        <title>Contact — ShareVideo360</title>
        <meta
          name="description"
          content="Get in touch with the ShareVideo360 team. Share suggestions, report issues or explore partnership opportunities — we love hearing from our community."
        />
      </Head>
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <p className="mb-4 leading-relaxed">
        ShareVideo360 exists because of the contributions and feedback
        from people like you. Whether you’ve discovered a remarkable
        video, noticed an error on the site, or simply want to say
        hello, we welcome your messages. Below are some ways to reach
        us. We read every note and try our best to respond within two
        business days.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">Submit a Video</h2>
      <p className="mb-4">
        Have you watched something that belongs in our collection? Use
        the <a href="/submit" className="text-blue-600">Submit</a> page
        to tell us about it. Please include a short description and
        choose the category that fits best. Our editors review all
        submissions to ensure they meet our quality standards.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">General Inquiries</h2>
      <p className="mb-4">
        For questions, feedback or business proposals, please email us at
        <a href="mailto:admin@example.com" className="text-blue-600">admin@example.com</a>.
        We appreciate hearing how you use the site and what features you’d
        like to see next.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">Social Media</h2>
      <p className="mb-4">
        We’re building a presence on social media to share new picks and
        insights. Stay tuned for links — coming soon!
      </p>
      <p className="leading-relaxed">
        Thank you for being part of the ShareVideo360 community. Your
        participation helps make this resource better every day.
      </p>
    </Layout>
  );
}
