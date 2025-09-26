import Head from "next/head";
import Layout from "@/components/Layout";

export default function Terms() {
  return (
    <Layout>
      <Head>
        <title>Terms of Service — Video Gallery</title>
        <meta
          name="description"
          content="Read the Terms of Service for using Video Gallery. Understand acceptable use, disclaimers, and content ownership."
        />
      </Head>
      <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>

      <h2 className="text-xl font-semibold mt-6 mb-2">Acceptance of Terms</h2>
      <p className="mb-4">
        By accessing and using <strong>Video Gallery</strong>, you agree to be
        bound by these Terms of Service. If you do not agree, please discontinue
        use of the website.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Content Ownership</h2>
      <p className="mb-4">
        We embed videos from platforms such as YouTube and Rumble. All rights
        remain with the original creators. We do not host or own the videos, we
        only provide curation and commentary.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">User Submissions</h2>
      <p className="mb-4">
        When submitting content via our Submit page, you confirm that you have
        the right to share the material. We reserve the right to review, edit,
        or reject any submission at our discretion.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Limitations of Liability</h2>
      <p className="mb-4">
        We are not liable for any damages arising from use of the site or from
        reliance on content provided. The site is offered “as is” without
        warranties of any kind.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Changes to Terms</h2>
      <p>
        We may update these Terms from time to time. Continued use of the site
        after changes are posted constitutes acceptance of the updated Terms.
      </p>
    </Layout>
  );
}
