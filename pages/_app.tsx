import "@/styles/globals.css";
import type { AppProps } from "next/app";
import AppWrapper from "@/components/appWrapper";

export default function App({ Component, pageProps }: AppProps) {
  if (Component.authPage === true) {
    return <Component {...pageProps} />;
  } else {
    return (
      <AppWrapper>
        <Component {...pageProps} />
      </AppWrapper>
    );
  }
}
