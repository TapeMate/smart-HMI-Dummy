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
  if (toggleOptionsIcon.classList.contains("options-closed")) {
    toggleClasses([toggleOptionsIcon], "options-closed", "options-open");
    closeAllOptions();
  } else if (toggleOptionsIcon.classList.contains("options-open")) {
    toggleClasses([toggleOptionsIcon], "options-open", "options-closed");

    openAllOptions();
  }
});

const openAllOptions = () => {
  toggleSubHeader.forEach((subHeader) => {
    subHeader.classList.remove("expand");
    subHeader.classList.add("collapse");
  });
  menuItems.forEach((item) => {
    item.classList.remove("expand");
    item.classList.add("collapse");
  });
  iconsMain.forEach((icon) => {
    icon.classList.remove("toggle-open");
    icon.classList.add("toggle-closed");
  });
  iconsSecondary.forEach((icon) => {
    icon.classList.remove("toggle-open");
    icon.classList.add("toggle-closed");
  });
};

const closeAllOptions = () => {
  toggleSubHeader.forEach((subHeader) => {
    subHeader.classList.remove("collapse");
    subHeader.classList.add("expand");
  });
  menuItems.forEach((item) => {
    item.classList.remove("collapse");
    item.classList.add("expand");
  });
  iconsMain.forEach((icon) => {
    icon.classList.remove("toggle-closed");
    icon.classList.add("toggle-open");
  });
  iconsSecondary.forEach((icon) => {
    icon.classList.remove("toggle-closed");
    icon.classList.add("toggle-open");
  });
};

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
    const keysArr = Object.keys(data);
    let subHeaderCount = 1;
    let itemCount = 1;

    // header
    for (let i = 0; i < keysArr.length; i++) {
      const subHeadersArr = data[keysArr[i]].subHeaders;
      const itemsArr = data[keysArr[i]].items;
      // header
      document.querySelector(`#header${i + 1}`).textContent =
        data[keysArr[i]].header;
      // subHeader
      subHeadersArr.forEach((subHeader) => {
        document.querySelector(`#sub-header${subHeaderCount}`).textContent =
          subHeader;
        subHeaderCount++;
      });
      // items
      itemsArr.forEach((array) => {
        array.forEach((item) => {
          document.querySelector(`#item${itemCount}`).textContent = item;
          itemCount++;
        });
      });
    }
  })
  .catch((error) => console.error("Error fetching data:", error));
