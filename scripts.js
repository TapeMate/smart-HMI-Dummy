"use strict";

// eventlistener for active link styling
const navItems = document.querySelectorAll(".nav-link");

navItems.forEach((navItem) => {
  navItem.addEventListener("click", (e) => {
    navItems.forEach((item) => item.classList.remove("active"));
    navItem.classList.add("active");

    // check viewport if in mobile view, if so close link container again after selection
    if (window.matchMedia("(max-width: 550px)").matches) {
      navItemContainer.classList.remove("open");
      navItemContainer.classList.add("close");
    }
  });
});

// toggle menu mobile open close
const toggleIcon = document.querySelector("#toggle-items");
const navItemContainer = document.querySelector(".nav-items");

toggleIcon.addEventListener("click", (e) => {
  if (navItemContainer.classList.contains("close")) {
    navItemContainer.classList.remove("close");
    navItemContainer.classList.add("open");
  } else {
    navItemContainer.classList.remove("open");
    navItemContainer.classList.add("close");
  }
});

// media query check to prevent navbar items stay hidden when moving back to desktop view
const mediaQueryCheck = (e) => {
  if (e.matches) {
    navItemContainer.classList.remove("open");
    navItemContainer.classList.add("close");
  } else {
    navItemContainer.classList.add("open");
    navItemContainer.classList.remove("close");
  }
};

// media query object and listener
const mediaQuery = window.matchMedia("(max-width: 550px)");
mediaQuery.addEventListener("change", mediaQueryCheck);

// initial check
mediaQueryCheck(mediaQuery);
