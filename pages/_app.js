import "@/styles/globals.css";

//internal import
import { TrackingProvider } from "@/Context/Tracking";

export default function App({ Component, pageProps }) {
  return (
    <>
      <TrackingProvider>
        <Component {...pageProps} />;
      </TrackingProvider>
    </>
  );
}
