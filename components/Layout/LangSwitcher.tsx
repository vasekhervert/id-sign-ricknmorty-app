import { LOCALES } from "../../localization/locales";

interface LangProps {
  locale: string;
  onLanguageChange(value: string): void;
}

const LangSwitcher = ({ locale, onLanguageChange }: LangProps) => {
  const label = locale === "cs-CZ" ? "English" : "Česky";
  const languageToSet = locale === "cs-CZ" ? LOCALES.ENGLISH : LOCALES.CZECH;

  return (
    <button className="btn" onClick={() => onLanguageChange(languageToSet)}>
      {label}
    </button>
  );
};

export default LangSwitcher;
