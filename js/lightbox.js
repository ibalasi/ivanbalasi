/* ==========================================================================
   Lightbox for design pieces and photographs.
   Any <button data-lightbox="group"> containing an <img> opens it.
   Uses the native <dialog> element for focus handling and Esc to close.
   ========================================================================== */
(() => {
  const triggers = [...document.querySelectorAll("[data-lightbox]")];
  if (!triggers.length) return;

  const dialog = document.createElement("dialog");
  dialog.className = "lightbox";
  dialog.setAttribute("aria-label", "Image viewer");
  dialog.innerHTML = `
    <div class="lightbox-top">
      <span class="lb-count" aria-live="polite"></span>
      <button type="button" class="icon-btn" data-lb="close" aria-label="Close viewer">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>
      </button>
    </div>
    <figure><img alt=""></figure>
    <div class="lightbox-bottom">
      <p class="lb-caption"></p>
      <div class="lb-nav">
        <button type="button" class="icon-btn" data-lb="prev" aria-label="Previous image">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>
        </button>
        <button type="button" class="icon-btn" data-lb="next" aria-label="Next image">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>
        </button>
      </div>
    </div>`;
  document.body.append(dialog);

  const img = dialog.querySelector("img");
  const caption = dialog.querySelector(".lb-caption");
  const count = dialog.querySelector(".lb-count");
  let group = [];
  let index = 0;
  let opener = null;

  // Only images that actually loaded are viewable
  // Viewable if the thumbnail loaded, or if a separate full-size image is set
  const available = (name) =>
    triggers.filter((t) => t.dataset.lightbox === name &&
      (t.dataset.full || !t.querySelector(".media")?.classList.contains("is-missing")));

  // Load the first image that works: local full size, live full size, then the thumbnail
  const loadInto = (sources) => {
    const [first, ...rest] = sources;
    if (!first) {
      img.removeAttribute("src");
      caption.append(document.createTextNode(" · Full-size image not added yet"));
      return;
    }
    img.onerror = () => loadInto(rest);
    img.onload = () => {
      dialog.classList.toggle("is-tall", img.naturalHeight / img.naturalWidth > 1.3);
    };
    img.src = first;
  };

  const show = (i) => {
    index = (i + group.length) % group.length;
    const t = group[index];
    const source = t.querySelector("img");
    // Tall full-page screenshots open at a readable width and scroll (set on load)
    dialog.classList.remove("is-tall");
    dialog.querySelector("figure").scrollTop = 0;
    const thumb = source.naturalWidth ? (source.currentSrc || source.src) : null;
    img.alt = source.alt;
    const title = t.dataset.title || source.alt;
    const link = t.dataset.link;
    caption.textContent = "";
    caption.append(document.createTextNode(title));
    if (link) {
      const a = document.createElement("a");
      a.href = link;
      a.target = "_blank";
      a.rel = "noopener";
      a.textContent = " · View project ↗";
      caption.append(a);
    }
    count.textContent = `${index + 1} / ${group.length}`;
    loadInto([t.dataset.full, t.dataset.fullFallback, thumb].filter(Boolean));
    const single = group.length < 2;
    dialog.querySelectorAll("[data-lb='prev'], [data-lb='next']").forEach((b) => { b.hidden = single; });
  };

  triggers.forEach((t) => {
    t.addEventListener("click", () => {
      group = available(t.dataset.lightbox);
      const i = group.indexOf(t);
      if (i === -1) return; // image missing: nothing to enlarge
      opener = t;
      show(i);
      dialog.showModal();
    });
  });

  dialog.addEventListener("click", (e) => {
    const action = e.target.closest("[data-lb]")?.dataset.lb;
    if (action === "close") dialog.close();
    if (action === "prev") show(index - 1);
    if (action === "next") show(index + 1);
    if (e.target === dialog || e.target.tagName === "FIGURE") dialog.close();
  });

  dialog.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") show(index - 1);
    if (e.key === "ArrowRight") show(index + 1);
  });

  dialog.addEventListener("close", () => {
    img.onerror = null;
    img.removeAttribute("src");
    opener?.focus();
  });
})();
