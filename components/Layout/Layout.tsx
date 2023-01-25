// next imports
import Head from "next/head";

// components imports
import Header from "./Header";

// other imports

import Footer from "./Footer";

interface LayoutProps {
  children?: React.ReactElement<any> | React.ReactElement<any>[];
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>Rick And Morty Next.js App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
