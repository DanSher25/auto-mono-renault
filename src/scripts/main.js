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

  // const initHeroSlider = () => {
  //   const slider = document.querySelector(".hero-slider__body");
  //   if (!slider) return;

  //   const progressBar = slider.querySelector(".hero-slider__progress-bar");

  //   const swiper = new Swiper(slider, {
  //     modules: [Navigation, Pagination, EffectFade, Autoplay],

  //     slidesPerView: 1,
  //     loop: true,
  //     speed: 350,

  //     effect: "fade",
  //     fadeEffect: {
  //       crossFade: true,
  //     },

  //     // allowTouchMove: false,

  //     navigation: {
  //       nextEl: slider.querySelector(".hero-slider__nav--next"),
  //       prevEl: slider.querySelector(".hero-slider__nav--prev"),
  //     },

  //     pagination: {
  //       el: slider.querySelector(".hero-slider__pagination"),
  //       clickable: true,
  //     },

  //     autoplay: {
  //       delay: 5000,
  //       disableOnInteraction: false,
  //     },

  //     on: {
  //       autoplayTimeLeft(swiper, timeLeft, percentage) {
  //         if (progressBar) {
  //           progressBar.style.width = (1 - percentage) * 100 + "%";
  //         }
  //       },
  //     },
  //   });

  //   slider.addEventListener("mouseenter", () => {
  //     swiper.autoplay.stop();

  //     if (progressBar) {
  //       progressBar.style.opacity = "0";
  //     }
  //   });

  //   slider.addEventListener("mouseleave", () => {
  //     if (progressBar) {
  //       progressBar.style.width = "0%";
  //       progressBar.style.opacity = "1";
  //     }

  //     swiper.autoplay.start();
  //   });
  // };

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

  initPhoneMask();
  initFlipDown();
  initTabs();
  initFilters();
  // initHeroSlider();
});
