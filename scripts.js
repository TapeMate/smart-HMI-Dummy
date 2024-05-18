"use strict";

// eventlistener for active link styling
const navItems = document.querySelectorAll(".nav-link");

navItems.forEach((navItem) => {
  navItem.addEventListener("click", (e) => {
    navItems.forEach((item) => item.classList.remove("active"));
    navItem.classList.add("active");
  });
});

// toggle menu mobile open close
const toggleIcon = document.querySelector("#menu-mobile");
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
