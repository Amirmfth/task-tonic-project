import Layout from "@/components/layout/Layout";
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";

const client = new QueryClient();

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <QueryClientProvider client={client}>
        <Layout>
          <Component {...pageProps} />
          <ToastContainer />
        </Layout>
      </QueryClientProvider>
    </SessionProvider>
  );
}
