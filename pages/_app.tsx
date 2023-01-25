import { useMemo } from "react";
import { useRouter } from "next/router";

import type { AppProps } from "next/app";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/global.scss";

// i18n imports
import { IntlProvider } from "react-intl";
import English from "./../localization/en.json";
import Czech from "./../localization/cz.json";

const App = ({ Component, pageProps }: AppProps) => {
  const { locale } = useRouter();

  const messages = useMemo(() => {
    switch (locale) {
      case "en-US":
        return English;
      case "cs-CZ":
        return Czech;
      default:
        return English;
    }
  }, [locale]);

  return (
    <IntlProvider messages={messages} locale={locale!} defaultLocale="en-US">
      <Component {...pageProps} />
    </IntlProvider>
  );
};

export default App;
