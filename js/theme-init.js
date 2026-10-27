/* Runs in <head> before first paint so a saved light/dark choice doesn't flash. */
(() => {
  try {
    const mode = localStorage.getItem("theme");
    if (mode === "light" || mode === "dark") document.documentElement.setAttribute("data-theme", mode);
  } catch (e) { /* storage unavailable: follow system setting */ }
})();

/* Classic / Bold look, also before first paint. */
(() => {
  let look = null;
  try { look = localStorage.getItem("look"); } catch (e) { /* ignore */ }
  if (location.hash === "#bold") look = "bold";
  if (location.hash === "#classic") look = "classic";
  document.documentElement.setAttribute("data-look", look === "bold" ? "bold" : "classic");
})();
