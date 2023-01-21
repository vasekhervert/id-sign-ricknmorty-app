// next imports
import Head from "next/head";

// react imports
import { useState } from "react";

// components imports
import Header from "./Header";

// other imports
import { IntlProvider } from "react-intl";
import { messages } from "../../localization/messages";
import { LOCALES } from "../../localization/locales";

interface LayoutProps {
  children?: React.ReactElement<any> | React.ReactElement<any>[];
}

const locale = LOCALES.CZECH;

const Layout = ({ children }: LayoutProps) => {
  const [locale, setLocale] = useState<string>(LOCALES.ENGLISH);
  return (
    <IntlProvider
      messages={messages[locale]}
      locale={locale}
      defaultLocale={LOCALES.ENGLISH}
    >
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
