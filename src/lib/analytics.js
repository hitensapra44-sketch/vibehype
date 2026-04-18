import ReactGA from "react-ga4";

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

export const initGA = () => {
  if (!GA_ID) return;
  ReactGA.initialize(GA_ID);
};

export const logPageView = (path) => {
  if (!GA_ID) return;
  ReactGA.send({ hitType: "pageview", page: path });
};

export const logEvent = (category, action, label) => {
  if (!GA_ID) return;
  ReactGA.event({
    category,
    action,
    label,
  });
};
