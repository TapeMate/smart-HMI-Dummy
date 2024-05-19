"use strict";

// DOM Objects:
const navItems = document.querySelectorAll(".nav-link");
const toggleItemsIcon = document.querySelector("#toggle-items");
const navItemContainer = document.querySelector(".nav-items");
const toggleOptionsIcon = document.querySelector("#toggle-options");
const toggleHeader = document.querySelectorAll(".toggle");
const toggleSubHeader = document.querySelectorAll(".toggle-sub");
const menuItems = document.querySelectorAll(".menu-item");
const iconsMain = document.querySelectorAll(".icon-main");
const iconsSecondary = document.querySelectorAll(".icon-secondary");

// toggleClasses helper function
const toggleClasses = (elements, ...classNames) => {
  elements.forEach((element) => {
    classNames.forEach((className) => {
      element.classList.toggle(className);
    });
  });
};

// eventlistener for active link styling due to css gets overwritten via hover effect
navItems.forEach((navItem) => {
  navItem.addEventListener("click", (e) => {
    navItems.forEach((item) => item.classList.remove("active"));
    navItem.classList.add("active");
    // check viewport if in mobile view, if so close link container again on select
    if (window.matchMedia("(max-width: 550px)").matches) {
      navItemContainer.classList.remove("open");
      navItemContainer.classList.add("close");
    }
  });
});

// toggle menu mobile open close
toggleItemsIcon.addEventListener("click", () => {
  toggleClasses([navItemContainer], "close", "open");
  //   navItemContainer.classList.toggle("close");
  //   navItemContainer.classList.toggle("open");
});

// add expand / collapse all items function to mobile menu icon
toggleOptionsIcon.addEventListener("click", (e) => {
  toggleSubHeader.forEach((subHeader) => {
    subHeader.classList.toggle("expand");
    subHeader.classList.toggle("collapse");
  });
  menuItems.forEach((item) => {
    item.classList.toggle("expand");
    item.classList.toggle("collapse");
  });
  iconsMain.forEach((icon) => {
    icon.classList.toggle("toggle-closed");
    icon.classList.toggle("toggle-open");
  });
  iconsSecondary.forEach((icon) => {
    icon.classList.toggle("toggle-closed");
    icon.classList.toggle("toggle-open");
  });
});

// make mobile product menu expand and collapse
const toggleMenu = (e) => {
  const header = e.currentTarget;
  const icon = header.querySelector("img");
  let sibling = header.nextElementSibling;
  while (sibling && sibling.classList.contains("toggle-sub")) {
    sibling.classList.toggle("collapse");
    sibling.classList.toggle("expand");
    sibling = sibling.nextElementSibling;
  }
  // rotate toggle icon
  icon.classList.toggle("toggle-closed");
  icon.classList.toggle("toggle-open");
};

// event handler function for sub header
const toggleSubMenu = (e) => {
  const subHeader = e.currentTarget;
  const icon = subHeader.querySelector("img");
  const children = subHeader.querySelectorAll("li");
  children.forEach((child) => {
    child.classList.toggle("collapse");
    child.classList.toggle("expand");
  });
  // rotate toggle icon
  icon.classList.toggle("toggle-open");
  icon.classList.toggle("toggle-closed");
};

// media query check to add / remove event listener
const toggleEventListener = () => {
  if (window.matchMedia("(max-width: 550px)").matches) {
    toggleHeader.forEach((header) => {
      header.addEventListener("click", toggleMenu);
    });
    toggleSubHeader.forEach((subHeader) => {
      subHeader.addEventListener("click", toggleSubMenu);
    });
    setOptionsMinimized(true);
  } else {
    toggleHeader.forEach((header) => {
      header.removeEventListener("click", toggleMenu);
    });
    toggleSubHeader.forEach((subHeader) => {
      subHeader.removeEventListener("click", toggleSubMenu);
    });
    setOptionsMinimized(false);
  }
};

// option minimized function to controll initial mobile view with all options collapsed
const setOptionsMinimized = (bool) => {
  if (bool === true) {
    toggleSubHeader.forEach((subHeader) => {
      subHeader.classList.remove("expand");
      subHeader.classList.add("collapse");
    });
    menuItems.forEach((item) => {
      item.classList.remove("expand");
      item.classList.add("collapse");
    });
  } else if (bool === false) {
    toggleSubHeader.forEach((subHeader) => {
      subHeader.classList.remove("collapse");
      subHeader.classList.add("expand");
    });
    menuItems.forEach((item) => {
      item.classList.remove("collapse");
      item.classList.add("expand");
    });
  }
};

// initial check to add event listener
toggleEventListener();

// media query check to prevent navbar items stay hidden when moving back to desktop view
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
