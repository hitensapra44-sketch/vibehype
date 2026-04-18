import ReactGA from "react-ga4";

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
let isInitialized = false;

export const initGA = () => {
  if (isInitialized) return;
  
  if (!GA_ID) {
    console.error("GA4: MEASUREMENT_ID is missing. Check your .env file.");
    return;
  }

  try {
    ReactGA.initialize(GA_ID);
    isInitialized = true;
    console.log("GA4: Initialized successfully with ID:", GA_ID);
  } catch (error) {
    console.error("GA4: Initialization failed", error);
  }
};

export const logPageView = (path) => {
  if (!isInitialized) return;
  
  try {
    ReactGA.send({ hitType: "pageview", page: path });
    console.log(`GA4: Page view tracked for ${path}`);
  } catch (error) {
    console.warn("GA4: Failed to track page view", error);
  }
};

export const logEvent = (category, action, label) => {
  if (!isInitialized) return;
  
  try {
    ReactGA.event({
      category,
      action,
      label,
    });
    console.log(`GA4: Event tracked - ${category} | ${action} | ${label}`);
  } catch (error) {
    console.warn("GA4: Failed to track event", error);
  }
};
