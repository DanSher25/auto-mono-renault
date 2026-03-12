import { Fancybox } from "@fancyapps/ui";
import IMask from "imask";
import FlipDown from "./vendor/flipDown.js";
import SlimSelect from "slim-select";
import Swiper from "swiper";
import { Navigation, EffectFade, Pagination, Autoplay } from "swiper/modules";

import "@fancyapps/ui/dist/fancybox.css";
import "swiper/css";
import "slim-select/styles";
import "swiper/css/navigation";
import "flipdown/dist/flipdown.css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

document.addEventListener("DOMContentLoaded", () => {
  const initPhoneMask = () => {
    const inputs = document.querySelectorAll('input[type="tel"]:not([data-mask-init])');
    if (!inputs.length) return;

    inputs.forEach((input) => {
      let mask = null;

      input.addEventListener("mouseenter", () => {
        if (mask) return;

        mask = IMask(input, {
          mask: "+{7} (000) 000-00-00",
          lazy: false,
        });

        input.dataset.maskInit = "true";
      });

      const form = input.closest("form");

      if (form) {
        form.addEventListener("submit", (e) => {
          if (!mask) return;

          if (mask.unmaskedValue.length !== 11) {
            e.preventDefault();
            input.setCustomValidity("Введите полный номер телефона");
            input.reportValidity();
          } else {
            input.setCustomValidity("");
          }
        });
      }
    });
  };

  const initTabsSlider = () => {
    const slider = document.querySelector(".credit__tabs");
    if (!slider) return;

    const swiper = new Swiper(slider, {
      slidesPerView: 7,
      spaceBetween: 15,
      breakpoints: {
        0: {
          slidesPerView: 4,
          spaceBetween: 10,
        },
        576: {
          slidesPerView: 5,
          spaceBetween: 10,
        },
        768: {
          slidesPerView: 7,
          spaceBetween: 15,
        },
      },
    });
  };

  const initFlipDown = () => {
    const el = document.getElementById("flipdown");

    if (!el) return;

    const endDate = new Date(el.dataset.end).getTime() / 1000;

    const flipdown = new FlipDown(endDate, {
      theme: "light",
    });

    flipdown.start();
  };

  Fancybox.bind("[data-fancybox], [data-fancybox-trigger]", {
    autoFocus: false,
    on: {
      done: () => {
        initPhoneMask();
      },
    },
  });

  const initTabs = ({
    containerSelector = "[data-tabs]",
    triggerSelector = "[data-tab-trigger]",
    contentSelector = "[data-tab-content]",
    activeClass = "is-active",
    defaultIndex = 0,
  } = {}) => {
    document.querySelectorAll(containerSelector).forEach((container) => {
      const triggers = Array.from(container.querySelectorAll(triggerSelector)).filter((el) => el.closest(containerSelector) === container);

      const contents = Array.from(container.querySelectorAll(contentSelector)).filter((el) => el.closest(containerSelector) === container);

      if (!triggers.length || !contents.length) return;

      setActive(defaultIndex);

      triggers.forEach((trigger, index) => {
        trigger.addEventListener("click", () => {
          setActive(index);
        });
      });

      function setActive(index) {
        triggers.forEach((trigger, i) => {
          trigger.classList.toggle(activeClass, i === index);
        });

        contents.forEach((content, i) => {
          content.classList.toggle(activeClass, i === index);
        });
      }
    });
  };

  const initFilters = () => {
    document.querySelectorAll(".js-select").forEach((select) => {
      new SlimSelect({
        select: select,
        settings: {
          search: true,
        },
      });
    });
  };

  const initMobileMenu = () => {
    const burger = document.querySelector(".mobile-header__burger");
    const menu = document.querySelector(".header__mobile-menu");
    const overlay = document.querySelector(".mobile-menu-overlay");

    if (!burger || !menu || !overlay) return;

    const openMenu = () => {
      burger.classList.add("active");
      menu.classList.add("active");
      overlay.classList.add("active");
      document.body.classList.add("locked");
    };

    const closeMenu = () => {
      burger.classList.remove("active");
      menu.classList.remove("active");
      overlay.classList.remove("active");
      document.body.classList.remove("locked");
    };

    burger.addEventListener("click", (e) => {
      e.stopPropagation();
      menu.classList.contains("active") ? closeMenu() : openMenu();
    });

    overlay.addEventListener("click", closeMenu);

    document.addEventListener("click", (e) => {
      if (!menu.contains(e.target) && !burger.contains(e.target)) {
        closeMenu();
      }
    });

    const links = menu.querySelectorAll(".mobile-menu__link");

    links.forEach((link) => {
      link.addEventListener("click", closeMenu);
    });
  };

  initPhoneMask();
  initFlipDown();
  initTabs();
  initFilters();
  initMobileMenu();
  initTabsSlider();
});
