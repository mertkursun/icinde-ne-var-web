import { motion, type MotionValue } from "framer-motion";
import "./ScoreRing.css";

const SIZE = 100;
const STROKE = 9;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

interface ScoreRingProps {
  value: number;
  label: string;
  dashOffset: MotionValue<number>;
  color: MotionValue<string>;
}

export const RING_CIRCUMFERENCE = CIRCUMFERENCE;

export function ScoreRing({ value, label, dashOffset, color }: ScoreRingProps) {
  return (
    <div className="ring" role="img" aria-label={`${label} ${value}`}>
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="ring__svg" aria-hidden="true">
        <circle cx={SIZE / 2} cy={SIZE / 2} r={RADIUS + STROKE / 2} fill="#0f1f1d" />
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          stroke="rgba(255,255,255,0.18)"
          strokeWidth={STROKE}
          fill="none"
        />
        <motion.circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={RADIUS}
          stroke="#ffffff"
          strokeWidth={STROKE}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={CIRCUMFERENCE}
          style={{ strokeDashoffset: dashOffset, rotate: -90, transformOrigin: "50% 50%" }}
        />
      </svg>
      <div className="ring__text">
        <motion.span className="ring__value" style={{ color }}>
          {value}
        </motion.span>
        <motion.span className="ring__label" style={{ color }}>
          {label}
        </motion.span>
      </div>
    </div>
  );
}
