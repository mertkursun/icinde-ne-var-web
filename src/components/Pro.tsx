import { Check, Crown } from "lucide-react";
import { useTranslation } from "react-i18next";
import { StoreButton } from "./StoreButton";
import "./Pro.css";

export function Pro() {
  const { t } = useTranslation();
  const freeItems = t("pro.free.items", { returnObjects: true }) as string[];
  const proItems = t("pro.pro.items", { returnObjects: true }) as string[];

  return (
    <section className="pro">
      <div className="container">
        <div className="pro__head">
          <h2 className="section-title">{t("pro.title")}</h2>
          <p className="lead">{t("pro.lead")}</p>
        </div>

        <div className="pro__plans">
          <div className="plan">
            <h3 className="plan__name">{t("pro.free.name")}</h3>
            <ul className="plan__list">
              {freeItems.map((item) => (
                <li key={item}>
                  <Check size={16} strokeWidth={2.5} />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="plan plan--pro">
            <h3 className="plan__name">
              <Crown size={20} />
              {t("pro.pro.name")}
            </h3>
            <ul className="plan__list">
              {proItems.map((item) => (
                <li key={item}>
                  <Check size={16} strokeWidth={2.5} />
                  {item}
                </li>
              ))}
            </ul>
            <div className="plan__cta">
              <StoreButton variant="teal" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
