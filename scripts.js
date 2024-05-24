"use strict";

// STATIC DOM OBJECTS:
let navItems = document.querySelectorAll(".nav-link");
const toggleItemsIcon = document.querySelector("#toggle-items");
let navItemContainer = document.querySelector(".nav-items");
const toggleOptionsIcon = document.querySelector("#toggle-options");

// DYNAMIC DOM OBJECTS:
// important to use let; initial assignment to assure functions still working
let toggleHeader = document.querySelectorAll(".toggle");
let toggleSubHeader = document.querySelectorAll(".toggle-sub");
let menuItems = document.querySelectorAll(".menu-item");
let iconsMain = document.querySelectorAll(".icon-main");
let iconsSecondary = document.querySelectorAll(".icon-secondary");

// HELPER FUNCTIONS:
// helper function for toggle class
const toggleClasses = (elements, removeClass, addClass) => {
  elements.forEach((element) => {
    if (removeClass) {
      element.classList.remove(removeClass);
    }
    if (addClass) {
      element.classList.add(addClass);
    }
  });
};

// helper function minimizeOption
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
    // check viewport if in mobile view, close link container again on select link
    // also adds open close icon graphic to navbar element
    if (window.matchMedia("(max-width: 550px)").matches) {
      toggleClasses([navItemContainer], "open", "close");
      toggleClasses([toggleItemsIcon], "items-open", "items-closed");
    }
  });
});

// toggle menu mobile open close
toggleItemsIcon.addEventListener("click", () => {
  // needs "[ ]" to pack single Node into Array to fit helper function
  toggleClasses([navItemContainer], "close", "open");
  toggleClasses([toggleItemsIcon], "items-closed", "items-open");
});

// add expand / collapse all items function to mobile menu icon
toggleOptionsIcon.addEventListener("click", (e) => {
  if (toggleOptionsIcon.classList.contains("options-closed")) {
    toggleClasses([toggleOptionsIcon], "options-closed", "options-open");
    closeAllOptions();
  } else if (toggleOptionsIcon.classList.contains("options-open")) {
    toggleClasses([toggleOptionsIcon], "options-open", "options-closed");
    openAllOptions();
  }
});

const openAllOptions = () => {
  toggleClasses(toggleSubHeader, "expand", "collapse");
  toggleClasses(menuItems, "expand", "collapse");
  toggleClasses(iconsMain, "toggle-open", "toggle-closed");
  toggleClasses(iconsSecondary, "toggle-open", "toggle-closed");
};

const closeAllOptions = () => {
  toggleClasses(toggleSubHeader, "collapse", "expand");
  toggleClasses(menuItems, "collapse", "expand");
  toggleClasses(iconsMain, "toggle-closed", "toggle-open");
  toggleClasses(iconsSecondary, "toggle-closed", "toggle-open");
};

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
  icon.classList.toggle("toggle-closed");
  icon.classList.toggle("toggle-open");
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

// option minimized function to control initial mobile view with all options collapsed
const setOptionsMinimized = (bool) => {
  if (toggleOptionsIcon.classList.contains("options-open")) {
    toggleOptionsIcon.classList.remove("options-open");
    toggleOptionsIcon.classList.add("options-closed");
  }
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

// #######################################
// FETCH JSON DATA & RENDER MOBILE MENU
// #######################################

const productsMenu = document.querySelector("#products");

fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    const keysArr = Object.keys(data);
    let subHeaderCount = 1;
    let itemCount = 1;

    let subHeaderRenderCount = 1;
    let itemRenderCount = 1;

    for (let i = 0; i < keysArr.length; i++) {
      const subHeadersArr = data[keysArr[i]].subHeaders;
      const itemsArr = data[keysArr[i]].items;

      // header
      const container = document.createElement("div");
      container.classList.add("container");
      productsMenu.appendChild(container);

      const toggleHeader = document.createElement("h3");
      toggleHeader.classList.add("toggle");
      container.appendChild(toggleHeader);

      const iconMain = document.createElement("img");
      iconMain.classList.add("icon-main", "toggle-closed");
      iconMain.src = "assets/toggle-option-blue.svg";
      iconMain.alt = "option";
      toggleHeader.appendChild(iconMain);

      const header = document.createElement("span");
      header.id = `header${i + 1}`;
      header.textContent = data[keysArr[i]].header;
      toggleHeader.appendChild(header);

      // subHeader
      subHeadersArr.forEach((subHeader, index) => {
        const toggleSubHeader = document.createElement("ul");
        toggleSubHeader.classList.add("toggle-sub");
        container.appendChild(toggleSubHeader);

        const div = document.createElement("div");
        toggleSubHeader.appendChild(div);

        const iconSecondary = document.createElement("img");
        iconSecondary.classList.add("icon-secondary", "toggle-closed");
        iconSecondary.src = "assets/toggle-option-black.svg";
        iconSecondary.alt = "option";
        div.appendChild(iconSecondary);

        const subHeaderElement = document.createElement("span");
        subHeaderElement.id = `sub-header${subHeaderRenderCount}`;
        div.appendChild(subHeaderElement);
        subHeaderRenderCount++;
        subHeaderElement.textContent = subHeader;

        // items
        itemsArr[index].forEach((item) => {
          const listItem = document.createElement("li");
          listItem.classList.add("menu-item");
          listItem.id = `item${itemRenderCount}`;
          listItem.textContent = item;
          toggleSubHeader.appendChild(listItem);
          itemRenderCount++;
        });
      });
    }

    // Reassign dynamic DOM Objects to asure animations still work
    toggleHeader = document.querySelectorAll(".toggle");
    toggleSubHeader = document.querySelectorAll(".toggle-sub");
    menuItems = document.querySelectorAll(".menu-item");
    iconsMain = document.querySelectorAll(".icon-main");
    iconsSecondary = document.querySelectorAll(".icon-secondary");

    // Reattach the event listener
    toggleEventListener();
  })
  .catch((error) => console.error("Error fetching data:", error));
