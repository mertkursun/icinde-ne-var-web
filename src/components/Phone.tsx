import type { ReactNode } from "react";
import "./Phone.css";

interface PhoneProps {
  src: string;
  alt: string;
  className?: string;
  children?: ReactNode;
  loading?: "eager" | "lazy";
}

export function Phone({ src, alt, className, children, loading = "lazy" }: PhoneProps) {
  return (
    <div className={["phone-wrap", className].filter(Boolean).join(" ")}>
      <div className="phone">
        <div className="phone__screen">
          <img src={src} alt={alt} loading={loading} decoding="async" />
          {children}
          <span className="phone__island" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
