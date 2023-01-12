// next imports
import Head from "next/head";

// bootstrap imports
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// components imports
import Header from "./Header";

interface LayoutProps {
  title?: string;
  children?: React.ReactElement<any>;
}

const Layout = ({ title, children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title && `${title} - `}Rick And Morty Next.js App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>{children}</main>
    </>
  );
};

export default Layout;
