import { useTranslation } from "react-i18next";

const APP_STORE_URL = "#app-store";

interface StoreButtonProps {
  variant?: "light" | "teal";
  compact?: boolean;
}

function AppleMark() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.37 12.63c.02 2.7 2.37 3.6 2.4 3.61-.02.06-.38 1.29-1.24 2.56-.75 1.1-1.52 2.19-2.74 2.21-1.2.02-1.58-.71-2.95-.71-1.37 0-1.8.69-2.93.73-1.18.05-2.07-1.19-2.83-2.28-1.54-2.23-2.72-6.3-1.14-9.05.79-1.37 2.19-2.23 3.72-2.25 1.16-.02 2.25.78 2.95.78.7 0 2.03-.96 3.43-.82.58.02 2.22.24 3.27 1.77-.08.05-1.95 1.14-1.94 3.45ZM14.1 5.75c.62-.75 1.04-1.8.93-2.84-.9.04-1.98.6-2.62 1.35-.58.67-1.08 1.73-.95 2.75 1 .08 2.02-.51 2.64-1.26Z" />
    </svg>
  );
}

export function StoreButton({ variant = "light", compact = false }: StoreButtonProps) {
  const { t } = useTranslation();
  const label = t("nav.download");

  return (
    <a
      href={APP_STORE_URL}
      className={["store-button", variant === "teal" && "store-button--teal"].filter(Boolean).join(" ")}
      aria-label={label}
    >
      <AppleMark />
      {!compact && <span>{label}</span>}
    </a>
  );
}
