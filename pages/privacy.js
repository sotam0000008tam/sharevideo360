import Head from "next/head";
import Layout from "@/components/Layout";

export default function Privacy() {
  return (
    <Layout>
      <Head>
        <title>Privacy Policy — Video Gallery</title>
        <meta
          name="description"
          content="Read the Video Gallery Privacy Policy to understand how we collect, use, and protect your personal information."
        />
      </Head>
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="mb-4">
        At <strong>Video Gallery</strong>, your privacy is important to us. This
        Privacy Policy outlines what information we collect, how we use it, and
        how we protect your data.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Information We Collect</h2>
      <p className="mb-4">
        - Basic analytics data (page views, traffic sources).  
        - Information submitted voluntarily through forms (e.g., submit page,
        contact page).  
        - Third-party cookies from advertising partners such as Google AdSense.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">How We Use Information</h2>
      <p className="mb-4">
        - To improve website content and user experience.  
        - To display personalized ads via Google AdSense.  
        - To respond to user inquiries and submissions.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Third-Party Services</h2>
      <p className="mb-4">
        We use Google AdSense to serve ads. Google may use cookies or web
        beacons to collect information in the course of ad serving. You can
        learn more and opt-out at{" "}
        <a
          href="https://policies.google.com/technologies/ads"
          target="_blank"
          className="text-blue-600"
        >
          Google Ads Policies
        </a>
        .
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Your Rights</h2>
      <p className="mb-4">
        You may request access, correction, or deletion of your personal data by
        contacting us at{" "}
        <a href="mailto:admin@example.com" className="text-blue-600">
          admin@example.com
        </a>
        .
      </p>
    </Layout>
  );
}
