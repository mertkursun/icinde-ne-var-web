import { useTranslation } from "react-i18next";
import { LangToggle } from "./LangToggle";
import { StoreButton } from "./StoreButton";
import "./Nav.css";

export function Nav() {
  const { t } = useTranslation();

  return (
    <header className="nav">
      <div className="container nav__inner">
        <a href="#/" className="nav__brand">
          <img src="/logo.svg" alt="" width="28" height="28" />
          <span>{t("hero.title")}</span>
        </a>
        <div className="nav__actions">
          <LangToggle />
          <span className="nav__store nav__store--full">
            <StoreButton />
          </span>
          <span className="nav__store nav__store--compact">
            <StoreButton compact />
          </span>
        </div>
      </div>
    </header>
  );
}
