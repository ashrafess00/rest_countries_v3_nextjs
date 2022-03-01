import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../Components/Navbar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
      {console.log("hello app")}
    </>
  );
}

export default MyApp;