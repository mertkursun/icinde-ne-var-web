import { useEffect, useState } from "react";

export const LEGAL_ROUTES = ["privacy", "terms", "kvkk"] as const;
export type LegalRoute = (typeof LEGAL_ROUTES)[number];
export type Route = "home" | LegalRoute;

function isLegalRoute(value: string): value is LegalRoute {
  return (LEGAL_ROUTES as readonly string[]).includes(value);
}

function parseHash(hash: string): Route {
  const path = hash.replace(/^#\/?/, "");
  return isLegalRoute(path) ? path : "home";
}

export function routeHref(route: Route): string {
  return route === "home" ? "#/" : `#/${route}`;
}

export function useHashRoute(): Route {
  const [route, setRoute] = useState<Route>(() =>
    typeof window === "undefined" ? "home" : parseHash(window.location.hash),
  );

  useEffect(() => {
    const onHashChange = () => {
      setRoute(parseHash(window.location.hash));
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return route;
}
