(function () {
  const targets = document.querySelectorAll("[data-glow]");

  function setVars(el, ev) {
    const rect = el.getBoundingClientRect();
    const x = ((ev.clientX - rect.left) / rect.width) * 100;
    const y = ((ev.clientY - rect.top) / rect.height) * 100;

    el.style.setProperty("--mx", x.toFixed(2) + "%");
    el.style.setProperty("--my", y.toFixed(2) + "%");
  }

  targets.forEach((el) => {
    el.addEventListener("mousemove", (ev) => setVars(el, ev));
    el.addEventListener("mouseenter", (ev) => setVars(el, ev));
  });
})();