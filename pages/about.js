import Head from "next/head";
import Layout from "@/components/Layout";

export default function About() {
  return (
    <Layout>
      <Head>
        <title>About Us — Video Gallery</title>
        <meta
          name="description"
          content="Learn more about Video Gallery — our mission is to curate and share quality video content from YouTube and Rumble with added value for viewers."
        />
      </Head>
      <h1 className="text-3xl font-bold mb-4">About Us</h1>
      <p className="mb-4 leading-relaxed">
        Welcome to <strong>Video Gallery</strong> — a platform created to
        highlight and organize engaging video content from YouTube and Rumble.
        Our mission is to curate trending and valuable videos, add unique
        commentary, and provide visitors with a smooth browsing experience.
      </p>
      <p className="mb-4 leading-relaxed">
        We believe that video is one of the most powerful ways to learn,
        entertain, and connect. By offering a carefully organized collection,
        we help users discover interesting content without the noise.
      </p>
      <p className="leading-relaxed">
        <strong>Disclaimer:</strong> All embedded videos remain the property of
        their original creators. We do not claim ownership; we only embed and
        add context to enrich the viewing experience.
      </p>
    </Layout>
  );
}
