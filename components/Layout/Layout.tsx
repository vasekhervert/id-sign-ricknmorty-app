// next imports
import Head from "next/head";

// components imports
import Header from "./Header";

// other imports
import { IntlProvider } from "react-intl";
import { messages } from "../../localization";

interface LayoutProps {
  children?: React.ReactElement<any> | React.ReactElement<any>[];
}

const lang = "en";

const Layout = ({ children }: LayoutProps) => {
  return (
    <IntlProvider messages={messages} locale="cs" defaultLocale="en">
      <Head>
        <title>Rick And Morty Next.js App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main>{children}</main>
    </IntlProvider>
  );
};

export default Layout;
