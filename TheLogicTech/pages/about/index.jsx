import { useEffect } from "react";
import Head from "next/head";

import About from "../../components/About/About";
import Footer from "../../components/Footer/Footer";

const useScript = (url) => {
  useEffect(() => {
    const script = document.createElement("script");

    script.src = url;
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [url]);
};

function AboutPage() {
  useScript("/scripts/intersection.js");
  return (
    <div>
      <Head>
        <title>hevently | About</title>
        <meta
          name="description"
          content="browse you to about hevently and hevently team "
        />
      </Head>
      <About />
      <Footer />
    </div>
  );
}

export default AboutPage;
