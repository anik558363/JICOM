/*
  JICOM - main.js (clean)
  Features:
  - Accordion (for elements using [data-accordion])
  - Ships filter pills (for .filter-pill + .ship-item)
  - Product details gallery (for [data-product-gallery])
*/

(function () {
  "use strict";

  // ---------------- Hero Slider (Swiper) ----------------
  function initHeroSlider() {
    if (!window.Swiper) return;
    const el = document.querySelector(".heroSwiper");
    if (!el) return;

    // eslint-disable-next-line no-new
    new Swiper(".heroSwiper", {
      loop: true,
      speed: 1200,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      effect: "fade",
    });
  }

  // ---------------- Accordion ----------------
  function initAccordion(root) {
    const items = root.querySelectorAll(".acc-item");
    if (!items.length) return;

    function closeAll(exceptBtn) {
      items.forEach((item) => {
        const btn = item.querySelector(".acc-btn");
        const panel = item.querySelector(".acc-panel");
        if (!btn || !panel) return;
        if (exceptBtn && btn === exceptBtn) return;
        btn.setAttribute("aria-expanded", "false");
        panel.hidden = true;
      });
    }

    items.forEach((item) => {
      const btn = item.querySelector(".acc-btn");
      const panel = item.querySelector(".acc-panel");
      if (!btn || !panel) return;

      // initial state
      const expanded = btn.getAttribute("aria-expanded") === "true";
      panel.hidden = !expanded;

      btn.addEventListener("click", () => {
        const isOpen = btn.getAttribute("aria-expanded") === "true";

        // one open at a time
        closeAll(btn);

        if (isOpen) {
          btn.setAttribute("aria-expanded", "false");
          panel.hidden = true;
        } else {
          btn.setAttribute("aria-expanded", "true");
          panel.hidden = false;
        }
      });
    });
  }

  // ---------------- Ships Filter Pills ----------------
  function initShipFilters() {
    const pills = document.querySelectorAll(".filter-pill");
    const items = document.querySelectorAll(".ship-item");
    if (!pills.length || !items.length) return;

    pills.forEach((pill) => {
      pill.addEventListener("click", () => {
        pills.forEach((p) => p.classList.remove("active"));
        pill.classList.add("active");

        const filter = pill.getAttribute("data-filter") || "all";

        items.forEach((item) => {
          const tags = (item.getAttribute("data-tags") || "").split(/\s+/).filter(Boolean);
          const show = filter === "all" || tags.includes(filter);
          item.style.display = show ? "" : "none";
        });
      });
    });
  }

  // ---------------- Product Details Gallery ----------------
  function initProductGallery() {
    const gallery = document.querySelector("[data-product-gallery]");
    if (!gallery) return;

    const mainImg = document.getElementById("pdMainImg");
    const thumbs = Array.from(gallery.querySelectorAll(".pg-thumb"));
    if (!mainImg || !thumbs.length) return;

    thumbs.forEach((btn) => {
      btn.addEventListener("click", () => {
        const full = btn.getAttribute("data-full");
        if (!full) return;

        thumbs.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        // small fade swap
        mainImg.style.opacity = "0.35";
        const tmp = new Image();
        tmp.onload = () => {
          mainImg.src = full;
          mainImg.style.opacity = "1";
        };
        tmp.src = full;
      });
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initHeroSlider();
    document.querySelectorAll("[data-accordion]").forEach(initAccordion);
    initShipFilters();
    initProductGallery();
  });
})();
