// next imports
import Head from "next/head";

// components imports
import Header from "./Header";

interface LayoutProps {
  title?: string;
  children?: React.ReactElement<any> | React.ReactElement<any>[];
}

const Layout = ({ title, children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>Rick And Morty Next.js App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>{children}</main>
    </>
  );
};

export default Layout;
