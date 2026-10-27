/* ==========================================================================
   Click-to-load video. The Vimeo player (and its scripts and cookies) only
   loads after the visitor presses play, which keeps the page fast.
   Markup: <div class="video-player" data-vimeo="ID" data-hash="h" data-title="...">
   ========================================================================== */
(() => {
  document.querySelectorAll("[data-vimeo]").forEach((box) => {
    const btn = box.querySelector(".video-poster");
    if (!btn) return;
    btn.addEventListener("click", () => {
      const params = new URLSearchParams({ autoplay: "1", dnt: "1", title: "0", byline: "0", portrait: "0" });
      if (box.dataset.hash) params.set("h", box.dataset.hash);
      const iframe = document.createElement("iframe");
      iframe.src = `https://player.vimeo.com/video/${box.dataset.vimeo}?${params}`;
      iframe.title = box.dataset.title || "Video";
      iframe.allow = "autoplay; fullscreen; picture-in-picture";
      iframe.allowFullscreen = true;
      btn.replaceWith(iframe);
      iframe.focus();
    });
  });
})();
