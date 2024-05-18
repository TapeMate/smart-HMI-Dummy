"use strict";

const navItems = document.querySelectorAll(".nav-link");
console.log(navItems);

navItems.forEach((navItem) => {
  navItem.addEventListener("click", (e) => {
    navItems.forEach((item) => item.classList.remove("active"));
    navItem.classList.add("active");
  });
});
