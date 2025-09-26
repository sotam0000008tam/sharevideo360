import Head from "next/head";
import Layout from "@/components/Layout";

export default function Contact() {
  return (
    <Layout>
      <Head>
        <title>Contact Us — Video Gallery</title>
        <meta
          name="description"
          content="Get in touch with the Video Gallery team for inquiries, feedback, or partnership opportunities."
        />
      </Head>
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <p className="mb-4">
        We value your feedback and are happy to hear from you. If you have
        questions, suggestions, or business inquiries, please reach out through
        one of the channels below:
      </p>
      <ul className="list-disc ml-6 mb-6 space-y-2">
        <li>Email: <a href="mailto:admin@example.com" className="text-blue-600">admin@example.com</a></li>
        <li>Form: Use our <a href="/submit" className="text-blue-600">Submit</a> page to suggest a video.</li>
        <li>Social Media: Coming soon — follow us for updates!</li>
      </ul>
      <p>
        We aim to respond to inquiries within 48 hours. Thank you for supporting
        Video Gallery!
      </p>
    </Layout>
  );
}
