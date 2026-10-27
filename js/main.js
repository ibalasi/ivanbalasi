/* ==========================================================================
   Shared behaviour for every page: theme, mobile nav, image fallbacks,
   contact details, footer year.
   ========================================================================== */

/* Site settings — edit here, used across all pages. */
const SITE = {
  // Leave empty to hide the email row. Example: "hello@ivanbalasi.com"
  email: "",
};

/* ---------- Theme: system → light → dark ---------- */
function initTheme() {
  const root = document.documentElement;
  const btn = document.querySelector(".theme-toggle");
  const order = ["system", "light", "dark"];
  const labels = { system: "Theme: match system", light: "Theme: light", dark: "Theme: dark" };

  let mode = "system";
  try { mode = localStorage.getItem("theme") || "system"; } catch (e) { /* storage unavailable */ }

  const apply = (m) => {
    if (m === "system") root.removeAttribute("data-theme");
    else root.setAttribute("data-theme", m);
    if (btn) {
      btn.dataset.mode = m;
      btn.setAttribute("aria-label", `${labels[m]}. Change theme`);
      btn.title = labels[m];
    }
  };
  apply(mode);

  btn?.addEventListener("click", () => {
    mode = order[(order.indexOf(mode) + 1) % order.length];
    apply(mode);
    try { localStorage.setItem("theme", mode); } catch (e) { /* ignore */ }
  });
}

/* ---------- Mobile navigation ---------- */
function initNav() {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.getElementById("site-nav");
  if (!toggle || !nav) return;
  const mq = window.matchMedia("(max-width: 60rem)");

  const setOpen = (open) => {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    nav.classList.toggle("is-open", open);
    document.body.classList.toggle("nav-open", open);
    if (open) nav.querySelector("a")?.focus();
  };

  toggle.addEventListener("click", () => setOpen(toggle.getAttribute("aria-expanded") !== "true"));

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("is-open")) {
      setOpen(false);
      toggle.focus();
    }
  });

  nav.addEventListener("click", (e) => {
    if (e.target.closest("a")) setOpen(false);
  });

  // Keep focus inside the open menu (menu + toggle button)
  document.addEventListener("focusin", (e) => {
    if (!nav.classList.contains("is-open") || !mq.matches) return;
    if (!nav.contains(e.target) && e.target !== toggle) toggle.focus();
  });

  mq.addEventListener("change", () => setOpen(false));
}

/* ---------- Images: local file → live URL → labelled placeholder ---------- */
function initImages() {
  const handle = (img) => {
    const fallback = img.dataset.fallback;
    if (fallback && !img.dataset.triedFallback) {
      img.dataset.triedFallback = "1";
      img.src = fallback;
      return;
    }
    // Last resort: a saved full-size screenshot for the same project
    const full = img.closest("[data-full]")?.dataset.full;
    if (full && !img.dataset.triedFull) {
      img.dataset.triedFull = "1";
      img.src = full;
      return;
    }
    img.closest(".media")?.classList.add("is-missing");
  };

  document.querySelectorAll(".media img").forEach((img) => {
    img.addEventListener("error", () => handle(img));
    img.addEventListener("load", () => img.closest(".media")?.classList.remove("is-missing"));
    // Images that already failed before this script ran
    if (img.complete && img.naturalWidth === 0 && img.getAttribute("src")) handle(img);
  });
}

/* ---------- Contact: email row + copy button ---------- */
function initContact() {
  document.querySelectorAll("[data-email-row]").forEach((row) => {
    if (!SITE.email) { row.remove(); return; }
    const link = row.querySelector("a");
    const text = row.querySelector("[data-email-text]");
    if (link) link.href = `mailto:${SITE.email}`;
    if (text) text.textContent = SITE.email;
  });

  document.querySelectorAll("[data-copy-email]").forEach((btn) => {
    if (!SITE.email) { btn.remove(); return; }
    const status = document.getElementById(btn.getAttribute("aria-describedby"));
    btn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(SITE.email);
        if (status) status.textContent = "Email address copied.";
      } catch (e) {
        if (status) status.textContent = `Copy didn't work here. The address is ${SITE.email}`;
      }
    });
  });
}

function initYear() {
  document.querySelectorAll("[data-year]").forEach((el) => { el.textContent = new Date().getFullYear(); });
}

/* ---------- Classic / Bold look switch ---------- */
function initLook() {
  const root = document.documentElement;
  const tools = document.querySelector(".header-tools");
  if (!tools) return;
  const wrap = document.createElement("div");
  wrap.className = "look-switch";
  wrap.setAttribute("role", "group");
  wrap.setAttribute("aria-label", "Site style");
  wrap.innerHTML = '<button type="button" data-look="classic">Classic</button><button type="button" data-look="bold">Creative</button>';
  tools.prepend(wrap);
  const sync = () => wrap.querySelectorAll("button").forEach((b) =>
    b.setAttribute("aria-pressed", String(b.dataset.look === (root.dataset.look || "classic"))));
  wrap.addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (!b) return;
    root.dataset.look = b.dataset.look;
    try { localStorage.setItem("look", b.dataset.look); } catch (err) { /* ignore */ }
    sync();
  });
  sync();
}

initTheme();
initLook();
initNav();
initImages();
initContact();
initYear();
