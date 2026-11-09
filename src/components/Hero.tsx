import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Phone } from "./Phone";
import { StoreButton } from "./StoreButton";
import "./Hero.css";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const { t } = useTranslation();
  const reduce = useReducedMotion();

  const rise = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay, ease: EASE },
  });

  return (
    <section id="top" className="hero">
      <div className="container hero__inner">
        <div className="hero__copy">
          <motion.h1 className="hero__title" {...rise(0.05)}>
            {t("hero.title")}
          </motion.h1>
          <motion.p className="lead" {...rise(0.2)}>
            {t("hero.lead")}
          </motion.p>
          <motion.div className="hero__cta" {...rise(0.32)}>
            <StoreButton variant="teal" />
            <span className="hero__note">{t("hero.note")}</span>
          </motion.div>
        </div>

        <motion.div
          className="hero__phone"
          initial={reduce ? false : { opacity: 0, y: 80, rotate: -2 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 1.2, delay: 0.15, ease: EASE }}
        >
          <Phone src="/screens/scan.png" alt={t("hero.scanHint")} loading="eager">
            {!reduce && <span className="hero__scanline" aria-hidden="true" />}
          </Phone>
        </motion.div>
      </div>
      <div className="hero__glow" aria-hidden="true" />
    </section>
  );
}
