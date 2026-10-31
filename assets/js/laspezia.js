// La Spezia: tiny progressive enhancements. The page works fully without this file.
(function () {
  "use strict";
  var d = document;
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Mobile navigation toggle
  var btn = d.querySelector(".nav-toggle"), nav = d.getElementById("site-nav");
  if (btn && nav) {
    var set = function (open) {
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.setAttribute("aria-label", btn.getAttribute(open ? "data-label-close" : "data-label-open"));
      nav.classList.toggle("is-open", open);
    };
    btn.addEventListener("click", function () { set(btn.getAttribute("aria-expanded") !== "true"); });
    nav.addEventListener("click", function (e) { if (e.target.closest("a")) set(false); });
    d.addEventListener("keydown", function (e) { if (e.key === "Escape") { set(false); btn.focus(); } });
  }

  // Footer year
  var y = d.querySelector("[data-year]");
  if (y) y.textContent = new Date().getFullYear();

  // Highlight today's row ONLY once hours are confirmed (data/hours.yaml: confirmed: true)
  var card = d.querySelector(".card-hours");
  if (card && card.getAttribute("data-hours-confirmed") === "true") {
    var row = card.querySelector('[data-weekday="' + new Date().getDay() + '"]');
    if (row) row.classList.add("is-today");
  }

  // Scroll reveal. Content is visible by default; only sections still below the fold are
  // marked "is-pending" (hidden) by this script, so if it fails nothing stays invisible.
  var items = d.querySelectorAll(".reveal");
  if (!reduce && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px" });
    items.forEach(function (el) {
      if (el.getBoundingClientRect().top > window.innerHeight) { el.classList.add("is-pending"); io.observe(el); }
    });
  }
})();
