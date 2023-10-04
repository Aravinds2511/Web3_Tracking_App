import "@/styles/globals.css";

//internal import
import { TrackingProvider } from "@/Context/Tracking";
import { Footer, Navbar } from "@/Components";

export default function App({ Component, pageProps }) {
  return (
    <>
      <TrackingProvider>
        <Navbar />
        <Component {...pageProps} />;
      </TrackingProvider>
      <Footer />
    </>
  );
}
