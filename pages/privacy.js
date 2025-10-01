import Head from "next/head";
import Layout from "../components/Layout";

export default function Privacy() {
  return (
    <Layout>
      <Head>
        <title>Privacy Policy — ShareVideo360</title>
        <meta
          name="description"
          content="Understand how ShareVideo360 collects, uses and safeguards your personal information. We value your privacy and commit to transparent data practices."
        />
      </Head>
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="mb-4 leading-relaxed">
        At <strong>ShareVideo360</strong> we respect your privacy. This
        policy describes what information we collect when you visit our
        website, how we use it and the choices you have. By using our
        services, you consent to the data practices described here.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">Information We Collect</h2>
      <p className="mb-4 leading-relaxed">
        • <strong>Usage data:</strong> We collect basic analytics such as
        pages visited, referrer URLs and time spent on each page to
        understand how our website is used. This data is aggregated and
        does not personally identify you.  
        • <strong>Voluntary submissions:</strong> When you send us a
        message or submit a video, we record the information you provide
        — such as your name, email address, description and selected
        category — so that we can process your request and respond.  
        • <strong>Advertising identifiers:</strong> Our site may display
        ads served through Google AdSense or similar partners. These
        networks use cookies and similar technologies to personalise
        advertisements. You can learn more and opt out of personalised
        advertising at{' '}
        <a
          href="https://policies.google.com/technologies/ads"
          target="_blank"
          className="text-blue-600"
          rel="noopener"
        >
          Google Ads Policies
        </a>
        .
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">How We Use Information</h2>
      <p className="mb-4 leading-relaxed">
        • To maintain and improve our website by analysing usage trends
        and fixing issues.  
        • To publish user‑submitted videos and communicate with you
        regarding your submissions.  
        • To personalise and deliver advertising that helps fund
        ShareVideo360.  
        • To comply with legal requirements and protect our users
        against fraud or abuse.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">Third‑Party Content and Services</h2>
      <p className="mb-4 leading-relaxed">
        ShareVideo360 embeds videos from YouTube, Rumble and other
        platforms. These services may collect your IP address, cookie
        identifiers and usage data when you interact with embedded
        content. We do not control their privacy practices and
        encourage you to review their policies. We also use third‑party
        analytics and advertising providers (such as Google) which may
        set cookies on your device. We do not share your personally
        identifiable information with advertisers.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">Data Retention and Security</h2>
      <p className="mb-4 leading-relaxed">
        We store information for as long as necessary to fulfil the
        purposes described in this policy. We employ reasonable
        technical and organisational measures to protect your data
        against unauthorised access, alteration or disclosure. However,
        no system is completely secure; please exercise caution when
        sharing sensitive information online.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">Your Rights and Choices</h2>
      <p className="mb-4 leading-relaxed">
        You may request access to, correction of, or deletion of your
        personal information by contacting us at{' '}
        <a href="mailto:admin@example.com" className="text-blue-600">
          admin@example.com
        </a>
        . You can also configure your browser to block cookies or set
        preferences with advertising partners to limit tracking. Please
        note that blocking cookies may affect your experience on our
        site.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">Changes to This Policy</h2>
      <p className="leading-relaxed">
        We may update this Privacy Policy from time to time to reflect
        changes in law or our services. We will post the revised policy
        on this page and, if the changes are significant, provide
        additional notice. Your continued use of ShareVideo360 after
        updates constitutes your acceptance of the revised policy.
      </p>
    </Layout>
  );
}
