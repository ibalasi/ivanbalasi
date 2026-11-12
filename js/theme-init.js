/* Runs in <head> before first paint so a saved light/dark choice doesn't flash. */
(() => {
  try {
    const mode = localStorage.getItem("theme");
    if (mode === "light" || mode === "dark") document.documentElement.setAttribute("data-theme", mode);
  } catch (e) { /* storage unavailable: follow system setting */ }
})();

/* Classic / Creative / Yellow ("bumble") look, also before first paint.
   #classic, #bold, #yellow or #bumble in the URL forces (and saves) a look. */
(() => {
  const looks = ["classic", "bold", "bumble"];
  let look = null;
  try { look = localStorage.getItem("look-v2"); } catch (e) { /* ignore */ }
  let forced = location.hash.slice(1);
  if (forced === "yellow") forced = "bumble";
  if (looks.indexOf(forced) > -1) {
    look = forced;
    try { localStorage.setItem("look-v2", look); } catch (e) { /* ignore */ }
  }
  document.documentElement.setAttribute("data-look", looks.indexOf(look) > -1 ? look : "bumble");
  /* The Bumble look lives in its own stylesheet; its rules only apply when data-look="bumble". */
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "css/bumble.css";
  document.head.appendChild(link);
})();
