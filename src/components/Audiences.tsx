import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, ShieldCheck, TriangleAlert } from "lucide-react";
import { useTranslation } from "react-i18next";
import "./Audiences.css";

const AUDIENCES = [
  { key: "baby", emoji: "👶", flags: true },
  { key: "pregnant", emoji: "🤰", flags: true },
  { key: "sensitive", emoji: "🖐️", flags: true },
  { key: "gluten", emoji: "🌾", flags: false },
  { key: "lactose", emoji: "🥛", flags: false },
  { key: "peanut", emoji: "🥜", flags: false },
  { key: "vegan", emoji: "🌿", flags: false },
  { key: "diabetes", emoji: "🩸", flags: false },
] as const;

type AudienceKey = (typeof AUDIENCES)[number]["key"];

const INITIAL_SELECTION: ReadonlySet<AudienceKey> = new Set<AudienceKey>(["baby"]);

export function Audiences() {
  const { t } = useTranslation();
  const reduce = useReducedMotion();
  const [selected, setSelected] = useState<ReadonlySet<AudienceKey>>(INITIAL_SELECTION);

  const toggle = (key: AudienceKey) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const isCaution = AUDIENCES.some((a) => a.flags && selected.has(a.key));
  const verdictKey = isCaution ? "caution" : "safe";

  return (
    <section className="aud">
      <div className="container aud__grid">
        <div className="aud__copy">
          <h2 className="section-title">{t("audiences.title")}</h2>
          <p className="lead">{t("audiences.lead")}</p>
        </div>

        <div className="aud__demo">
          <div className="aud__chips" role="group" aria-label={t("audiences.title")}>
            {AUDIENCES.map((a) => {
              const on = selected.has(a.key);
              return (
                <button
                  key={a.key}
                  type="button"
                  className={["chip", on && "chip--on"].filter(Boolean).join(" ")}
                  aria-pressed={on}
                  onClick={() => toggle(a.key)}
                >
                  <span className="chip__emoji" aria-hidden="true">
                    {a.emoji}
                  </span>
                  <span className="chip__label">{t(`audiences.items.${a.key}`)}</span>
                  <span className="chip__check" aria-hidden="true">
                    {on && <Check size={14} strokeWidth={3} />}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="aud__card">
            <div className="aud__product">
              <span className="aud__product-name">{t("audiences.demo.product")}</span>
              <span className="aud__product-cat">{t("audiences.demo.category")}</span>
            </div>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={verdictKey}
                className={`aud__verdict aud__verdict--${verdictKey}`}
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                {isCaution ? <TriangleAlert size={20} /> : <ShieldCheck size={20} />}
                <div>
                  <strong>{t(`story.verdict.${verdictKey}`)}</strong>
                  <p>{t(`audiences.demo.${verdictKey}`)}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          <p className="aud__note">{t("audiences.familyNote")}</p>
        </div>
      </div>
    </section>
  );
}
