import Link from 'next/link';
import Head from 'next/head';
import Layout from '../components/Layout';

/**
 * Custom 404 page.  Google AdSense recommends that your site shows a
 * friendly error page when a visitor navigates to a non‑existent
 * address.  This helps with user experience and reduces bounce rate.
 */
export default function NotFoundPage() {
  return (
    <Layout>
      <Head>
        <title>404 — Page Not Found | ShareVideo360</title>
        <meta name="robots" content="noindex" />
      </Head>
      <div className="py-16 text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="mb-6 text-gray-700">Sorry, we couldn’t find that page.</p>
        <Link href="/" className="text-blue-600 hover:underline">
          ← Back to Home
        </Link>
      </div>
    </Layout>
  );
}