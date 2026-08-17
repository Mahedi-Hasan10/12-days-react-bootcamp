(function () {
  const slides = [...document.querySelectorAll(".slide")];
  const counter = document.getElementById("counter");
  const bar = document.getElementById("bar");
  let i = Math.max(0, parseInt(location.hash.replace("#", ""), 10) - 1 || 0);

  function render() {
    slides.forEach((s, idx) => s.classList.toggle("active", idx === i));
    if (counter) counter.textContent = `${i + 1} / ${slides.length}`;
    if (bar) bar.style.width = `${((i + 1) / slides.length) * 100}%`;
    history.replaceState(null, "", `#${i + 1}`);
    slides[i].scrollTop = 0;
  }

  function go(n) {
    i = Math.min(slides.length - 1, Math.max(0, n));
    render();
  }

  document.getElementById("prev")?.addEventListener("click", () => go(i - 1));
  document.getElementById("next")?.addEventListener("click", () => go(i + 1));

  document.addEventListener("keydown", (e) => {
    if (["INPUT", "TEXTAREA"].includes(e.target.tagName)) return;
    if (["ArrowRight", "PageDown", " ", "Enter"].includes(e.key)) {
      e.preventDefault();
      go(i + 1);
    }
    if (["ArrowLeft", "PageUp", "Backspace"].includes(e.key)) {
      e.preventDefault();
      go(i - 1);
    }
    if (e.key === "n" || e.key === "N") document.body.classList.toggle("show-notes");
    if (e.key === "Home") go(0);
    if (e.key === "End") go(slides.length - 1);
  });

  render();
})();
