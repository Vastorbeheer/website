/* Licht/donker-knop. Zonder eigen keuze volgt de site de instelling van het apparaat. */
(function () {
  var root = document.documentElement;
  function systeemDonker() {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  function huidig() {
    return root.getAttribute("data-theme") || (systeemDonker() ? "dark" : "light");
  }
  function zetLabel(knop) {
    var nl = root.lang === "nl";
    var naarDonker = huidig() === "light";
    knop.setAttribute("aria-label", nl
      ? (naarDonker ? "Donkere weergave" : "Lichte weergave")
      : (naarDonker ? "Dark mode" : "Light mode"));
    knop.setAttribute("aria-pressed", huidig() === "dark" ? "true" : "false");
  }
  document.addEventListener("DOMContentLoaded", function () {
    var knop = document.querySelector(".thema-knop");
    if (!knop) return;
    zetLabel(knop);
    knop.addEventListener("click", function () {
      var nieuw = huidig() === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", nieuw);
      try { localStorage.setItem("vastor-thema", nieuw); } catch (e) {}
      zetLabel(knop);
    });
  });
})();
