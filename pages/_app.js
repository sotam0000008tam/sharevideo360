import Script from "next/script";
import "../styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      {/* Replace ca-pub-XXXXXXXX with your AdSense publisher ID AFTER approval */}
      <Script
        id="adsense-script"
        async
        strategy="afterInteractive"
        crossOrigin="anonymous"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXX"
      />
      <Component {...pageProps} />
    </>
  );
}
