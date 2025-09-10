import { useEffect, useState } from "react";

export const ROUTES = {
  ONBOARD: "#/",
  LOGIN: "#/login",
  PROFILE: "#/profile",
  SWIPE: "#/swipe",
  EVENTS: "#/events",
  CHAT: "#/chat",
  BLOG: "#/blog",
  SETTINGS: "#/settings",
};

export function useHashRoute() {
  const getHash = () => window.location.hash || ROUTES.ONBOARD;
  const [hash, setHash] = useState(getHash());

  useEffect(() => {
    const onHashChange = () => setHash(getHash());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const navigate = (to) => {
    if (!to.startsWith("#")) {
      window.location.hash = `#/${to.replace(/^\/#?/, "")}`;
    } else {
      window.location.hash = to;
    }
  };

  return { route: hash, navigate };
} 