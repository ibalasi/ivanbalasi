/* ==========================================================================
   Podcast audio players. Native <audio> controls do the work; this only
   shows a clear note if an MP3 hasn't been added to the audio/ folder yet,
   and pauses other episodes when a new one starts.
   ========================================================================== */
(() => {
  const players = [...document.querySelectorAll("audio.audio")];
  players.forEach((audio) => {
    const note = audio.parentElement.querySelector(".audio-missing");
    audio.addEventListener("error", () => { if (note) note.hidden = false; });
    audio.addEventListener("play", () => {
      players.forEach((other) => { if (other !== audio) other.pause(); });
    });
  });
})();
