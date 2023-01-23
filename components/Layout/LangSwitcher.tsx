import Link from "next/link";
import { useRouter } from "next/router";

const LangSwitcher = () => {
  const { asPath, locale } = useRouter();
  const label = locale === "cs-CZ" ? "English, please" : "Česky, prosím";
  const localeToSet = locale === "cs-CZ" ? "en-US" : "cs-CZ";

  return (
    <Link className="btn" href={asPath} locale={localeToSet}>
      {label}
    </Link>
  );
};

export default LangSwitcher;
