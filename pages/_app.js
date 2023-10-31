import "@/styles/globals.css";

//internal import
import { TrackingProvider } from "@/Context/Tracking";
import { Footer, Navbar } from "@/Components";

export default function App({ Component, pageProps }) {
  return (
    <div className="bg-blue-300">
      <>
        <TrackingProvider>
          <Navbar />
          <Component {...pageProps} />;
        </TrackingProvider>
        <Footer />
      </>
    </div>
  );
}
