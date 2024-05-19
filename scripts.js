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

// helper function for toggle class
const toggleClasses = (elements, ...classNames) => {
  elements.forEach((element) => {
    classNames.forEach((className) => {
      element.classList.toggle(className);
    });
  });
};

// minimizeOption helper function
const isOptionsMinimized = (elements, firstClass, secondClass, bool) => {
  if (bool) {
    elements.forEach((element) => {
      element.classList.remove(firstClass);
      element.classList.add(secondClass);
    });
  } else if (!bool) {
    elements.forEach((element) => {
      element.classList.remove(secondClass);
      element.classList.add(firstClass);
    });
  }
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
  // needs "[ ]" to pack single Node into Array to fit helper function
  toggleClasses([navItemContainer], "close", "open");
});

// add expand / collapse all items function to mobile menu icon
toggleOptionsIcon.addEventListener("click", (e) => {
  toggleClasses(toggleSubHeader, "expand", "collapse");
  toggleClasses(menuItems, "expand", "collapse");
  toggleClasses(iconsMain, "toggle-closed", "toggle-open");
  toggleClasses(iconsSecondary, "toggle-closed", "toggle-open");
});

// make mobile product menu expand and collapse
const toggleMenu = (e) => {
  const header = e.currentTarget;
  const icon = header.querySelector("img");
  let sibling = header.nextElementSibling;
  while (sibling && sibling.classList.contains("toggle-sub")) {
    toggleClasses([sibling], "collapse", "expand");
    sibling = sibling.nextElementSibling;
  }
  // rotate toggle icon
  toggleClasses([icon], "toggle-closed", "toggle-open");
};

// event handler function for sub header
const toggleSubMenu = (e) => {
  const subHeader = e.currentTarget;
  const icon = subHeader.querySelector("img");
  const children = subHeader.querySelectorAll("li");
  toggleClasses(children, "collapse", "expand");
  // rotate toggle icon
  toggleClasses([icon], "toggle-closed", "toggle-open");
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
  isOptionsMinimized(toggleSubHeader, "expand", "collapse", bool);
  isOptionsMinimized(menuItems, "expand", "collapse", bool);
  isOptionsMinimized(iconsMain, "toggle-open", "toggle-closed", bool);
  isOptionsMinimized(iconsSecondary, "toggle-open", "toggle-closed", bool);
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

// ################
// FETCH JSON DATA
// ################

fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    // header
    document.querySelector("#header1").textContent = data.group1.header;
    document.querySelector("#header2").textContent = data.group2.header;
    document.querySelector("#header3").textContent = data.group3.header;
    // subHeader
    document.querySelector("#sub-header1").textContent =
      data.group1.secondary1.header;
    document.querySelector("#sub-header2").textContent =
      data.group1.secondary2.header;
    document.querySelector("#sub-header3").textContent =
      data.group1.secondary3.header;

    document.querySelector("#sub-header4").textContent =
      data.group2.secondary1.header;
    document.querySelector("#sub-header5").textContent =
      data.group2.secondary2.header;
    document.querySelector("#sub-header6").textContent =
      data.group2.secondary3.header;

    document.querySelector("#sub-header7").textContent =
      data.group3.secondary1.header;
    document.querySelector("#sub-header8").textContent =
      data.group3.secondary2.header;
    document.querySelector("#sub-header9").textContent =
      data.group3.secondary3.header;

    // items
    // group 1
    document.querySelector("#item01").textContent =
      data.group1.secondary1.item1;
    document.querySelector("#item02").textContent =
      data.group1.secondary1.item2;

    document.querySelector("#item03").textContent =
      data.group1.secondary2.item1;
    document.querySelector("#item04").textContent =
      data.group1.secondary2.item2;
    document.querySelector("#item05").textContent =
      data.group1.secondary2.item3;
    document.querySelector("#item06").textContent =
      data.group1.secondary2.item4;

    document.querySelector("#item07").textContent =
      data.group1.secondary3.item1;
    document.querySelector("#item08").textContent =
      data.group1.secondary3.item2;
    document.querySelector("#item09").textContent =
      data.group1.secondary3.item3;
    document.querySelector("#item10").textContent =
      data.group1.secondary3.item4;

    // group 2
    document.querySelector("#item11").textContent =
      data.group2.secondary1.item1;
    document.querySelector("#item12").textContent =
      data.group2.secondary1.item2;

    document.querySelector("#item13").textContent =
      data.group2.secondary2.item1;
    document.querySelector("#item14").textContent =
      data.group2.secondary2.item2;
    document.querySelector("#item15").textContent =
      data.group2.secondary2.item3;
    document.querySelector("#item16").textContent =
      data.group2.secondary2.item4;

    document.querySelector("#item17").textContent =
      data.group2.secondary3.item1;
    document.querySelector("#item18").textContent =
      data.group2.secondary3.item2;
    document.querySelector("#item19").textContent =
      data.group2.secondary3.item3;
    document.querySelector("#item20").textContent =
      data.group2.secondary3.item4;

    // group 3
    document.querySelector("#item21").textContent =
      data.group3.secondary1.item1;
    document.querySelector("#item22").textContent =
      data.group3.secondary1.item2;

    document.querySelector("#item23").textContent =
      data.group3.secondary2.item1;
    document.querySelector("#item24").textContent =
      data.group3.secondary2.item2;
    document.querySelector("#item25").textContent =
      data.group3.secondary2.item3;
    document.querySelector("#item26").textContent =
      data.group3.secondary2.item4;

    document.querySelector("#item27").textContent =
      data.group3.secondary3.item1;
    document.querySelector("#item28").textContent =
      data.group3.secondary3.item2;
    document.querySelector("#item29").textContent =
      data.group3.secondary3.item3;
    document.querySelector("#item30").textContent =
      data.group3.secondary3.item4;
  })
  .catch((error) => console.error("Error fetching data:", error));
