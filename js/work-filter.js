/* ==========================================================================
   Work index: category filters + text search over the project cards.
   Cards carry data-category="website intranet ..." in the HTML, so the
   page is complete without JavaScript; this script only narrows it.
   ========================================================================== */
(() => {
  const grid = document.querySelector("[data-work-grid]");
  if (!grid) return;

  const cards = [...grid.querySelectorAll(".work-card")];
  const chips = [...document.querySelectorAll("[data-filter]")];
  const search = document.getElementById("work-search");
  const status = document.getElementById("work-status");
  const empty = document.getElementById("work-empty");
  const reset = document.getElementById("work-reset");

  let active = "all";

  // Show counts on each chip
  chips.forEach((chip) => {
    const key = chip.dataset.filter;
    const n = key === "all" ? cards.length : cards.filter((c) => c.dataset.category.split(" ").includes(key)).length;
    const count = document.createElement("span");
    count.className = "chip-count";
    count.textContent = n;
    count.setAttribute("aria-hidden", "true");
    chip.append(count);
    chip.setAttribute("aria-label", `${chip.firstChild.textContent.trim()}, ${n} projects`);
  });

  const update = () => {
    const q = (search?.value || "").trim().toLowerCase();
    let shown = 0;
    cards.forEach((card) => {
      const inCat = active === "all" || card.dataset.category.split(" ").includes(active);
      const inText = !q || card.textContent.toLowerCase().includes(q);
      const visible = inCat && inText;
      card.hidden = !visible;
      if (visible) shown += 1;
    });

    const label = chips.find((c) => c.dataset.filter === active)?.firstChild.textContent.trim() || "All";
    status.textContent = `Showing ${shown} of ${cards.length} projects` +
      (active !== "all" ? ` in ${label}` : "") + (q ? ` matching “${search.value.trim()}”` : "");
    empty.hidden = shown !== 0;
  };

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      active = chip.dataset.filter;
      chips.forEach((c) => c.setAttribute("aria-pressed", String(c === chip)));
      update();
      try { history.replaceState(null, "", active === "all" ? location.pathname : `#${active}`); } catch (e) { /* ignore */ }
    });
  });

  search?.addEventListener("input", update);
  search?.form?.addEventListener("submit", (e) => e.preventDefault());

  reset?.addEventListener("click", () => {
    active = "all";
    if (search) search.value = "";
    chips.forEach((c) => c.setAttribute("aria-pressed", String(c.dataset.filter === "all")));
    update();
    search?.focus();
  });

  // Open a category from the URL, e.g. work.html#intranet
  const applyHash = () => {
    const fromHash = location.hash.slice(1);
    const match = chips.find((c) => c.dataset.filter === fromHash);
    if (!match) return;
    active = fromHash;
    chips.forEach((c) => c.setAttribute("aria-pressed", String(c === match)));
  };
  applyHash();
  update();
  window.addEventListener("hashchange", () => { applyHash(); update(); });
})();
