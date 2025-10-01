import Head from "next/head";
import Layout from "../components/Layout";

export default function About() {
  return (
    <Layout>
      <Head>
        <title>About — ShareVideo360</title>
        <meta
          name="description"
          content="Learn why ShareVideo360 exists. We are a community‑driven hub that curates the very best videos across Entertainment, Sports, Animation, Gaming, Finance, Crypto, How‑To and Tips from YouTube and Rumble so you never have to sift through endless feeds again."
        />
      </Head>
      <h1 className="text-3xl font-bold mb-4">About ShareVideo360</h1>
      <p className="mb-4 leading-relaxed">
        In the age of streaming, there are more videos to watch than there
        are hours in the day. Platforms like YouTube and Rumble host
        billions of hours of content, but finding the few that truly
        entertain, educate or inspire can feel like searching for a needle
        in a haystack. <strong>ShareVideo360</strong> was created to solve
        this problem: we comb through the noise to find the gems worth
        sharing.
      </p>
      <p className="mb-4 leading-relaxed">
        Our team and community review videos across eight broad
        categories — Entertainment, Sports, Animation, Gaming, Finance,
        Crypto, How‑To and Tips. For each video we publish a short
        description and our own commentary to explain why it stands out.
        Whether it’s a breathtaking football goal, an in‑depth financial
        tutorial or a heart‑warming animation, we provide context so you
        can decide quickly if it interests you. We believe curation is an
        act of care: by summarizing and organising content, we help you
        reclaim your time.
      </p>
      <p className="mb-4 leading-relaxed">
        We see ShareVideo360 as more than a playlist. It’s a living
        library built by its users. Anyone can <a href="/submit" className="text-blue-600">submit
        a video</a> they found meaningful, and the community can vote
        and comment to surface the best submissions. This participatory
        approach ensures that the collection reflects diverse interests
        and perspectives. By saving and sharing videos you love, you’re
        helping others discover what makes them special.
      </p>
      <p className="mb-4 leading-relaxed">
        We also want to be transparent about what we are not. We do
        not host or own the videos on this site, and we do not claim
        copyright over them. All rights remain with the original
        creators. Videos are embedded from YouTube, Rumble and other
        permitted sources under their terms of use. Our role is to
        organise and provide context so audiences can easily find and
        discuss the best content available.
      </p>
      <p className="leading-relaxed">
        Thank you for visiting ShareVideo360. We hope you enjoy this
        curated journey through the world of online video. If you have
        suggestions or want to join our mission, feel free to reach out
        through our <a href="/contact" className="text-blue-600">Contact</a>
        page. Together we can build a trusted resource for thoughtful
        entertainment and learning.
      </p>
    </Layout>
  );
}
