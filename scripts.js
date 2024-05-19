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
const toggleItemsIcon = document.querySelector("#toggle-items");
const navItemContainer = document.querySelector(".nav-items");

toggleItemsIcon.addEventListener("click", (e) => {
  if (navItemContainer.classList.contains("close")) {
    navItemContainer.classList.remove("close");
    navItemContainer.classList.add("open");
  } else {
    navItemContainer.classList.remove("open");
    navItemContainer.classList.add("close");
  }
});

// add expand / collapse all function to mobile menu icon
const toggleOptionsIcon = document.querySelector("#toggle-options");

toggleOptionsIcon.addEventListener("click", (e) => {
  console.log("click");
});

// make mobile product menu expand and collapse
const toggleHeader = document.querySelectorAll(".toggle");
const toggleSubHeader = document.querySelectorAll(".toggle-sub");
const menuItems = document.querySelectorAll(".menu-item");

// event handler function for main header
const toggleContent = (e) => {
  const header = e.currentTarget;
  let sibling = header.nextElementSibling;
  while (sibling && sibling.classList.contains("toggle-sub")) {
    if (sibling.classList.contains("collapse")) {
      sibling.classList.remove("collapse");
      sibling.classList.add("expand");
    } else {
      sibling.classList.remove("expand");
      sibling.classList.add("collapse");
    }
    sibling = sibling.nextElementSibling;
  }
};

// event handler function for sub header
const toggleSubContent = (e) => {
  const subHeader = e.currentTarget;
  const children = subHeader.querySelectorAll("li");
  children.forEach((child) => {
    if (child.classList.contains("collapse")) {
      child.classList.remove("collapse");
      child.classList.add("expand");
    } else {
      child.classList.remove("expand");
      child.classList.add("collapse");
    }
  });
};

// media query check to add / remove event listener
const toggleEventListener = () => {
  if (window.matchMedia("(max-width: 550px)").matches) {
    toggleHeader.forEach((header) => {
      header.addEventListener("click", toggleContent);
    });
    toggleSubHeader.forEach((subHeader) => {
      subHeader.addEventListener("click", toggleSubContent);
    });
  } else {
    toggleHeader.forEach((header) => {
      header.removeEventListener("click", toggleContent);
    });
    toggleSubHeader.forEach((subHeader) => {
      subHeader.removeEventListener("click", toggleSubContent);
    });
  }
};

// initial check to add event listener
toggleEventListener();

// media query check to prevent navbar items stay hidden when moving back to desktop view
// also executes the event listener add / remove functino
// maybe refactor to more generic name and build?
const mediaQueryCheck = (e) => {
  if (e.matches) {
    navItemContainer.classList.remove("open");
    navItemContainer.classList.add("close");
  } else {
    navItemContainer.classList.add("open");
    navItemContainer.classList.remove("close");
  }

  toggleEventListener();
};

// media query object and listener
const mediaQuery = window.matchMedia("(max-width: 550px)");
mediaQuery.addEventListener("change", mediaQueryCheck);

// initial check
mediaQueryCheck(mediaQuery);
