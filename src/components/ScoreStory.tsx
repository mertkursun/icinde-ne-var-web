import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useTranslation } from "react-i18next";
import { Phone } from "./Phone";
import { ScoreRing, RING_CIRCUMFERENCE } from "./ScoreRing";
import "./ScoreStory.css";

interface Step {
  name: string;
  text: string;
}

const FINAL_SCORE = 89;
const STEP_COUNT = 4;
const SWAP_START = 0.6;
const SWAP_END = 0.72;
const FILL_START = 0.7;
const FILL_END = 0.95;

const OK = "#3bd98a";
const WARN = "#f5c242";

export function ScoreStory() {
  const { t } = useTranslation();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const steps = t("story.steps", { returnObjects: true }) as Step[];

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const [score, setScore] = useState(reduce ? FINAL_SCORE : 0);
  const [activeStep, setActiveStep] = useState(reduce ? STEP_COUNT - 1 : 0);

  const fill = useTransform(scrollYProgress, [FILL_START, FILL_END], [0, FINAL_SCORE / 100]);
  const dashOffset = useTransform(fill, (v) => RING_CIRCUMFERENCE * (1 - (reduce ? FINAL_SCORE / 100 : v)));
  const color = useTransform(scrollYProgress, [FILL_START, FILL_END], [OK, WARN]);
  const scanOpacity = useTransform(scrollYProgress, [SWAP_START, SWAP_END], [1, 0]);
  const ringOpacity = useTransform(scrollYProgress, [SWAP_START + 0.04, SWAP_END], [0, 1]);
  const scanY = useTransform(scrollYProgress, [0, SWAP_START], ["30%", "62%"]);

  useMotionValueEvent(fill, "change", (v) => setScore(Math.round(v * 100)));
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(STEP_COUNT - 1, Math.floor(v * STEP_COUNT));
    setActiveStep(idx);
  });

  const verdict = score < 40 ? t("story.verdict.safe") : t("story.verdict.caution");
  const showFinal = reduce === true;

  return (
    <section ref={ref} className={["story", showFinal && "story--static"].filter(Boolean).join(" ")}>
      <div className="story__sticky">
        <div className="container story__grid">
          <div className="story__copy">
            <h2 className="section-title">{t("story.title")}</h2>
            <ol className="story__steps">
              {steps.map((step, i) => {
                const isActive = showFinal || i === activeStep;
                return (
                  <li
                    key={step.name}
                    className={["story__step", isActive && "story__step--active"].filter(Boolean).join(" ")}
                    aria-current={isActive ? "step" : undefined}
                  >
                    <span className="story__num">{i + 1}</span>
                    <div>
                      <h3 className="story__name">{step.name}</h3>
                      <p className="story__text">{step.text}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="story__visual">
            <Phone src="/screens/analysis.png" alt="" className="story__phone">
              <motion.div className="story__ring" style={{ opacity: showFinal ? 1 : ringOpacity }}>
                <ScoreRing value={score} label={verdict} dashOffset={dashOffset} color={color} />
              </motion.div>
              <motion.img
                src="/screens/scan.png"
                alt=""
                className="story__overlay"
                style={{ opacity: showFinal ? 0 : scanOpacity }}
                aria-hidden="true"
              />
              {!showFinal && (
                <motion.span
                  className="story__scanline"
                  style={{ top: scanY, opacity: scanOpacity }}
                  aria-hidden="true"
                />
              )}
            </Phone>
          </div>
        </div>
      </div>
    </section>
  );
}
