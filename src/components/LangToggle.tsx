import { useTranslation } from "react-i18next";
import { SUPPORTED_LANGS, type Lang } from "../i18n";
import "./LangToggle.css";

export function LangToggle() {
  const { i18n, t } = useTranslation();
  const current = (i18n.resolvedLanguage ?? "tr") as Lang;

  return (
    <div className="lang" role="group" aria-label={t("nav.langLabel")}>
      {SUPPORTED_LANGS.map((lang) => (
        <button
          key={lang}
          type="button"
          className="lang__btn"
          aria-pressed={current === lang}
          onClick={() => void i18n.changeLanguage(lang)}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
