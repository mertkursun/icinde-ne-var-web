import { useTranslation } from "react-i18next";
import { routeHref } from "../hooks/useHashRoute";
import "./Footer.css";

const LINKS = [
  { key: "privacy", href: routeHref("privacy") },
  { key: "terms", href: routeHref("terms") },
  { key: "kvkk", href: routeHref("kvkk") },
  { key: "contact", href: "mailto:destek@icindenevar.online" },
] as const;

const CURRENT_YEAR = new Date().getFullYear();

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <img src="/logo.svg" alt="" width="36" height="36" />
          <div>
            <strong>{t("hero.title")}</strong>
            <span>{t("footer.tagline")}</span>
          </div>
        </div>
        <nav className="footer__links" aria-label="Footer">
          {LINKS.map((link) => (
            <a key={link.key} href={link.href}>
              {t(`footer.${link.key}`)}
            </a>
          ))}
        </nav>
        <p className="footer__copy">
          © {CURRENT_YEAR} {t("hero.title")} {t("footer.rights")}
        </p>
      </div>
    </footer>
  );
}
