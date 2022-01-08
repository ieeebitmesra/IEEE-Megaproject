import Head from "next/head";
import { useEffect } from "react";

import Footer from "../components/Footer/Footer";
import Home from "../components/Home/Home";

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

export default function Index() {
  useScript("/scripts/intersection.js");
  return (
    <>
      <Head>
        <title>hevently</title>
        <meta
          name="description"
          content="Hevently is website where you can book your venue for different types of events like wedding , birthdays , social gathering , corporate events , etc."
        />
      </Head>
      <Home />
      <Footer />
    </>
  );
}
