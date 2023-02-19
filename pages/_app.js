import Head from "next/head";
import Script from "next/script";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <title>Charles Notes List</title>
        <meta charSet="UTF-8" />
        <meta name="description" content="Here memorize alot tech post, roadmap and skill." />
        <meta name="keywords" content="Charles Notes List, Tech, Tech posts, favorite, react, javascript, react-native, Docker." />
        <meta name="author" content="Charles_Sin" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Google */}
        <meta name="robots" content="all, max-image-preview:large" />
        <meta name="og:title" property="og:title" content="Here memorize alot tech post, roadmap and skill." />
        <meta name="og:type" property="og:type" content="article" />
        <meta name="og:url" property="og:url" content="https://charles-favorite.vercel.app" />
        <meta name="og:image" property="og:image" content="https://charles-favorite.vercel.app/screenshot.jpg" />

        <meta name="google-site-verification" content="eP82dEE--Mtf-ypVN9QO-B9kd-C5uLVNT_Ce_bdha24" />

        <link rel="canonical" href="https://charles-favorite.vercel.app" />
      </Head>
      <Script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`} />
      <Script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
