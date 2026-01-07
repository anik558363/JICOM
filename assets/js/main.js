const heroSwiper = new Swiper(".heroSwiper", {
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



function initAccordion(root) {
  const items = root.querySelectorAll(".acc-item");

  function closeAll(exceptBtn = null) {
    items.forEach((item) => {
      const btn = item.querySelector(".acc-btn");
      const panel = item.querySelector(".acc-panel");
      if (btn === exceptBtn) return;

      btn.setAttribute("aria-expanded", "false");
      panel.hidden = true;
    });
  }

  items.forEach((item) => {
    const btn = item.querySelector(".acc-btn");
    const panel = item.querySelector(".acc-panel");

    // initial state
    const expanded = btn.getAttribute("aria-expanded") === "true";
    panel.hidden = !expanded;

    btn.addEventListener("click", () => {
      const isOpen = btn.getAttribute("aria-expanded") === "true";

      // one open at a time (like screenshot)
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

document.querySelectorAll("[data-accordion]").forEach(initAccordion);



const pills = document.querySelectorAll('.filter-pill');
const items = document.querySelectorAll('.ship-item');

pills.forEach(pill => {
  pill.addEventListener('click', () => {
    pills.forEach(p => p.classList.remove('active'));
    pill.classList.add('active');

    const filter = pill.getAttribute('data-filter');

    items.forEach(item => {
      const tags = (item.getAttribute('data-tags') || '').split(' ');
      const show = (filter === 'all') || tags.includes(filter);
      item.style.display = show ? '' : 'none';
    });
  });
});
