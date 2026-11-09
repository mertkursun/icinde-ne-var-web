import { ArrowLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import { routeHref, type LegalRoute } from "../hooks/useHashRoute";
import "./LegalPage.css";

interface LegalSection {
  title: string;
  body: string[];
}

interface LegalPageProps {
  kind: LegalRoute;
}

export function LegalPage({ kind }: LegalPageProps) {
  const { t } = useTranslation();
  const sections = t(`legal.${kind}.sections`, { returnObjects: true }) as LegalSection[];

  return (
    <article className="legal">
      <div className="container legal__inner">
        <a href={routeHref("home")} className="legal__back">
          <ArrowLeft size={16} />
          {t("legal.back")}
        </a>
        <header className="legal__head">
          <h1 className="legal__title">{t(`legal.${kind}.title`)}</h1>
          <p className="legal__meta">{t("legal.updated", { date: t("legal.updatedDate") })}</p>
          <p className="lead">{t(`legal.${kind}.intro`)}</p>
        </header>

        <div className="legal__body">
          {sections.map((section, i) => (
            <section key={section.title} className="legal__section">
              <h2 className="legal__h2">
                <span className="legal__num">{i + 1}.</span> {section.title}
              </h2>
              {section.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}
        </div>

        <footer className="legal__contact">
          <p>
            {t("legal.contactLine")}{" "}
            <a href={`mailto:${t("legal.contactEmail")}`}>{t("legal.contactEmail")}</a>
          </p>
        </footer>
      </div>
    </article>
  );
}
