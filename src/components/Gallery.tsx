import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Phone } from "./Phone";
import { useMediaQuery } from "../hooks/useMediaQuery";
import "./Gallery.css";

const ITEMS = [
  { key: "discover", screen: "/screens/discover.png" },
  { key: "history", screen: "/screens/history.png" },
  { key: "favorites", screen: "/screens/favorites.png" },
  { key: "stats", screen: "/screens/stats.png" },
  { key: "family", screen: "/screens/family.png" },
  { key: "alternatives", screen: "/screens/analysis.png" },
] as const;

const TRACK_END_PADDING = 64;

export function Gallery() {
  const { t } = useTranslation();
  const reduce = useReducedMotion();
  const isNarrow = useMediaQuery("(max-width: 900px)");
  const isPinned = !reduce && !isNarrow;

  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    if (!isPinned) return;
    const track = trackRef.current;
    if (!track) return;

    const measure = () => {
      const overflow = track.scrollWidth - window.innerWidth + TRACK_END_PADDING;
      setDistance(Math.max(0, overflow));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [isPinned]);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);

  return (
    <section
      ref={sectionRef}
      className={["gallery", isPinned && "gallery--pinned"].filter(Boolean).join(" ")}
      style={isPinned ? { height: `calc(100vh + ${distance}px)` } : undefined}
    >
      <div className="gallery__sticky">
        <div className="container">
          <h2 className="section-title gallery__title">{t("gallery.title")}</h2>
        </div>
        <motion.div ref={trackRef} className="gallery__track" style={isPinned ? { x } : undefined}>
          {ITEMS.map((item) => (
            <article key={item.key} className="gcard">
              <Phone src={item.screen} alt={t(`gallery.items.${item.key}.name`)} className="gcard__phone" />
              <h3 className="gcard__name">{t(`gallery.items.${item.key}.name`)}</h3>
              <p className="gcard__text">{t(`gallery.items.${item.key}.text`)}</p>
            </article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
