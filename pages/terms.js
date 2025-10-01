import Head from "next/head";
import Layout from "../components/Layout";

export default function Terms() {
  return (
    <Layout>
      <Head>
        <title>Terms of Service — ShareVideo360</title>
        <meta
          name="description"
          content="Read the Terms of Service for ShareVideo360. Understand how to use the site, your responsibilities and our limitations."
        />
      </Head>
      <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
      <h2 className="text-xl font-semibold mt-6 mb-2">1. Acceptance of Terms</h2>
      <p className="mb-4 leading-relaxed">
        By accessing or using ShareVideo360 you agree to these Terms of
        Service and to our <a href="/privacy" className="text-blue-600">Privacy Policy</a>.
        If you do not agree to these terms, please do not use our
        website. We may update the Terms periodically and will post the
        revised version here. Your continued use of the site after
        changes means you accept the updated terms.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">2. Content Ownership and Use</h2>
      <p className="mb-4 leading-relaxed">
        ShareVideo360 is a curator of existing online content. We embed
        videos from YouTube, Rumble and other platforms under their
        respective terms of use. We do not claim ownership over the
        videos we embed; all intellectual property rights remain with
        the original creators. We provide summaries and commentary for
        informational purposes only. You may watch the videos on our
        site but any other use is subject to the terms of the source
        platform.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">3. User Submissions</h2>
      <p className="mb-4 leading-relaxed">
        You may submit videos via our submission form. By doing so you
        represent that you have the right to share the link and that the
        content is lawful and does not infringe on any rights. We
        reserve the right to review, edit, publish or decline submissions
        at our sole discretion. Submitted descriptions and
        commentary may be edited for clarity and length. You grant
        ShareVideo360 a non‑exclusive licence to display and distribute
        your submission in connection with the site.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">4. Acceptable Use</h2>
      <p className="mb-4 leading-relaxed">
        You agree to use ShareVideo360 only for lawful purposes. You
        will not attempt to hack, scrape or overload our servers, post
        spam or malicious content, or otherwise interfere with the
        operation of the site. You agree not to violate the rights of
        others or encourage conduct that is harmful, abusive, defamatory
        or unlawful. We may suspend or terminate access for any user
        violating these rules.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">5. Disclaimers and Limitation of Liability</h2>
      <p className="mb-4 leading-relaxed">
        ShareVideo360 is provided “as is” without warranties of any
        kind. We make no guarantees about the accuracy, completeness or
        timeliness of the information provided. To the fullest extent
        permitted by law, we are not liable for any direct, indirect,
        incidental or consequential damages arising from your use of
        the site or any content contained herein. Your sole remedy is
        to stop using the site.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">6. Indemnification</h2>
      <p className="mb-4 leading-relaxed">
        You agree to indemnify and hold harmless ShareVideo360 and its
        owners, employees and partners from any claim or demand made by
        any third party arising out of your use of the site, your
        violation of these Terms or your infringement of any rights.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">7. Governing Law</h2>
      <p className="leading-relaxed">
        These Terms are governed by the laws of the jurisdiction in
        which the site operator is established, without regard to
        conflict of law provisions. If any part of these Terms is
        deemed invalid, the remainder will remain in effect.
      </p>
    </Layout>
  );
}
