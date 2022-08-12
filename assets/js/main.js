/*----------------------- navigation menu -----------------------*/

(() => {
  const hamburgerBtn = document.querySelector(".hamburger-btn"),
    navMenu = document.querySelector(".nav-menu"),
    closeNavBtn = navMenu.querySelector(".close-nav-menu");

  hamburgerBtn.addEventListener("click", showNavMenu);
  closeNavBtn.addEventListener("click", hideNavMenu);

  function showNavMenu() {
    navMenu.classList.add("open");
    bodyScrollingToggle();
  }

  function hideNavMenu() {
    navMenu.classList.remove("open");
    fadeOutEffect();
    bodyScrollingToggle();
  }

  function fadeOutEffect() {
    document.querySelector(".fade-out-effect").classList.add("active");
    setTimeout(() => {
      document.querySelector(".fade-out-effect").classList.remove("active");
    }, 370);
  }

  // attach an event handler to document
  document.addEventListener("click", (event) => {
    // console.log(event.target.hash);
    if (event.target.classList.contains("link-item")) {
      // make sure event.target.hash has a value before overridding default behavior
      if (event.target.hash !== "") {
        // prevent defaut anchor click behavior
        event.preventDefault();
        const hash = event.target.hash;

        // deactive existing active section
        document.querySelector(".section.active").classList.add("hide");
        document.querySelector(".section.active").classList.remove("active");

        // activate new section
        document.querySelector(hash).classList.add("active");
        document.querySelector(hash).classList.remove("hide");

        // deactivate existing active navigation menu 'link-item'
        navMenu
          .querySelector(".active")
          .classList.add("outer-shadow", "hover-in-shadow");
        navMenu
          .querySelector(".active")
          .classList.remove("active", "inner-shadow");

        //if clicked 'link-item' is contained withing the navigation menu
        if (navMenu.classList.contains("open")) {
          // activate new navigation menu 'link-item'
          event.target.classList.add("active", "inner-shadow");
          event.target.classList.remove("outer-shadow", "hover-in-shadow");

          // hide mnavigation menu
          hideNavMenu();
        } else {
          let navItems = navMenu.querySelectorAll(".link-item");
          navItems.forEach((item) => {
            if (hash === item.hash) {
              // activate new navigation menu 'link-item'
              item.classList.add("active", "inner-shadow");
              item.classList.remove("outer-shadow", "hover-in-shadow");
            }
          });
          fadeOutEffect();
        }

        // add hash (#) to URL
        window.location.hash = hash;
      }
    }
  });
})();

/*----------------------- about section tabs -----------------------*/

(() => {
  const aboutSection = document.querySelector(".about-section");
  const tabsContainer = document.querySelector(".about-tabs");

  tabsContainer.addEventListener("click", (e) => {
    if (
      e.target.classList.contains("tab-item") &&
      !e.target.classList.contains("active")
    ) {
      const target = e.target.getAttribute("data-target");
      //  deactivate existing active 'tab-item'
      tabsContainer
        .querySelector(".active")
        .classList.remove("outer-shadow", "active");
      // activate new 'tab-item'
      e.target.classList.add("outer-shadow", "active");
      // deactivate existing active 'tab-content'
      aboutSection
        .querySelector(".tab-content.active")
        .classList.remove("active");
      // activate new 'tab-content'
      aboutSection.querySelector(target).classList.add("active");
    }
  });
})();

/*----------------------- stop scrolling-y -----------------------*/

function bodyScrollingToggle() {
  document.body.classList.toggle("hidden-scrolling");
}

/*----------------------- portfolio filter and popup -----------------------*/

(() => {
  const filterCointainer = document.querySelector(".portfolio-filter"),
    portfolioItemsContainer = document.querySelector(".portfolio-items"),
    portfolioItems = document.querySelectorAll(".portfolio-item"),
    popup = document.querySelector(".portfolio-popup"),
    prevBtn = popup.querySelector(".pp-prev"),
    nextBtn = popup.querySelector(".pp-next"),
    closeBtn = popup.querySelector(".pp-close"),
    projectDetailsContainer = popup.querySelector(".pp-details"),
    projectDetailsBtn = document.querySelector(".pp-project-details-btn");
  let itemIndex, slideIndex, screenshots;

  // filter portfolio items
  filterCointainer.addEventListener("click", (e) => {
    if (
      e.target.classList.contains("filter-item") &&
      !e.target.classList.contains("active")
    ) {
      // deactivate existing active 'filter-item'
      filterCointainer
        .querySelector(".active")
        .classList.remove("outer-shadow", "active");

      // activate new 'filter-item'
      e.target.classList.add("outer-shadow", "active");

      // get filter value
      const target = e.target.getAttribute("data-target");

      // filter portfolio items
      portfolioItems.forEach((item) => {
        if (target === item.getAttribute("data-category") || target === "all") {
          item.classList.remove("hide");
          item.classList.add("show");
        } else {
          item.classList.remove("show");
          item.classList.add("hide");
        }
      });
    }
  });

  portfolioItemsContainer.addEventListener("click", (e) => {
    if (e.target.closest(".portfolio-item-inner")) {
      const portfolioItem = e.target.closest(
        ".portfolio-item-inner"
      ).parentElement;

      // get portfolio item index
      itemIndex = Array.from(portfolioItem.parentElement.children).indexOf(
        portfolioItem
      );

      screenshots = portfolioItems[itemIndex]
        .querySelector(".portfolio-item-img img")
        .getAttribute("data-screenshots");

      // convert screenshots string to array
      screenshots = screenshots.split(",");
      if (screenshots.length === 1) {
        prevBtn.style.display = "none";
        nextBtn.style.display = "none";
      } else {
        prevBtn.style.display = "block";
        nextBtn.style.display = "block";
      }

      slideIndex = 0;
      popupToggle();
      popupSlidesShow();
      popupDetails();
    }
  });

  // show popup
  function popupToggle() {
    popup.classList.toggle("open");
    bodyScrollingToggle();
  }

  // close popup
  closeBtn.addEventListener("click", () => {
    popupToggle();

    // reset details popup
    if (projectDetailsContainer.classList.contains("active")) {
      popupDetailsToggle();
    }
  });

  function popupSlidesShow() {
    const imgSrc = screenshots[slideIndex];
    const popupImg = popup.querySelector(".pp-img");

    // active loader until the popupImg loaded
    popup.querySelector(".pp-loader").classList.add("active");
    popupImg.src = imgSrc;
    popupImg.onload = () => {
      // deactivate loader after the poupImg loaded
      popup.querySelector(".pp-loader").classList.remove("active");
    };

    const popupCounter = popup.querySelector(".pp-counter");
    popupCounter.innerHTML = `${slideIndex + 1} of ${screenshots.length}`;
  }

  // next slide
  nextBtn.addEventListener("click", () => {
    if (slideIndex === screenshots.length - 1) {
      slideIndex = 0;
    } else {
      slideIndex++;
    }
    popupSlidesShow();
  });

  // prev slide
  prevBtn.addEventListener("click", () => {
    if (slideIndex === 0) {
      slideIndex = screenshots.length - 1;
    } else {
      slideIndex--;
    }
    popupSlidesShow();
    console.log("slideIndex:" + slideIndex);
  });

  function popupDetails() {
    // if portfolio-item-details not exists
    if (!portfolioItems[itemIndex].querySelector(".portfolio-item-details")) {
      projectDetailsBtn.style.display = "none";
      return;
    }
    projectDetailsBtn.style.display = "block";

    // get project details
    const details = portfolioItems[itemIndex].querySelector(
      ".portfolio-item-details"
    ).innerHTML;

    // set project details
    popup.querySelector(".pp-project-details").innerHTML = details;

    // get the project title
    const title = portfolioItems[itemIndex].querySelector(
      ".portfolio-item-title"
    ).innerHTML;

    // set the project title
    popup.querySelector(".pp-title h2").innerHTML = title;

    // get the project category
    const category = portfolioItems[itemIndex].getAttribute("data-category");

    // set the project category
    popup.querySelector(".pp-project-category").innerHTML = category
      .split("-")
      .join(" ");
  }

  // show project details
  projectDetailsBtn.addEventListener("click", () => {
    return popupDetailsToggle();
  });

  function popupDetailsToggle() {
    if (projectDetailsContainer.classList.contains("active")) {
      // change btn icon
      projectDetailsBtn.querySelector("i").classList.remove("fa-minus");
      projectDetailsBtn.querySelector("i").classList.add("fa-plus");

      // remove active class from project details container
      projectDetailsContainer.classList.remove("active");

      // height of project details container
      projectDetailsContainer.style.maxHeight = 0 + "px";
    } else {
      // change btn icon
      projectDetailsBtn.querySelector("i").classList.remove("fa-plus");
      projectDetailsBtn.querySelector("i").classList.add("fa-minus");

      // add active class to project details container
      projectDetailsContainer.classList.add("active");

      // height of project details container
      projectDetailsContainer.style.maxHeight =
        projectDetailsContainer.scrollHeight + "px";

      // popup.scrollTo(0,projectDetailsContainer.offsetTop);
    }
  }
})();

/*----------------------- testimonial slider -----------------------*/

(() => {
  const sliderContainer = document.querySelector(".testi-slider-container"),
    slides = sliderContainer.querySelectorAll(".testi-item"),
    slideWidth = sliderContainer.offsetWidth,
    prevBtn = document.querySelector(".testi-slider-nav .prev"),
    nextBtn = document.querySelector(".testi-slider-nav .next"),
    activeSlide = sliderContainer.querySelector(".testi-item.active");
  let slideIndex = Array.from(activeSlide.parentElement.children).indexOf(
    activeSlide
  );

  // set width of all slides
  slides.forEach((slide) => {
    slide.style.width = slideWidth + "px";
  });

  // set width of sliderContainer
  sliderContainer.style.width = slideWidth * slides.length + "px";

  // next slide
  nextBtn.addEventListener("click", () => {
    if (slideIndex === slides.length - 1) {
      slideIndex = 0;
    } else {
      slideIndex++;
    }
    slider();
  });

  // prev slide
  prevBtn.addEventListener("click", () => {
    if (slideIndex === 0) {
      slideIndex = slides.length - 1;
    } else {
      slideIndex--;
    }
    slider();
  });

  // active slider - translate sliderContainer
  function slider() {
    // deactive existing active slide
    sliderContainer
      .querySelector(".testi-item.active")
      .classList.remove("active");

    // active next slide
    slides[slideIndex].classList.add("active");

    // translate sliderContainer
    sliderContainer.style.transform =
      "translateX(" + -slideIndex * slideWidth + "px)";
  }
  slider();
})();

/*----------------------- hide all sections except active -----------------------*/

(() => {
  const sections = document.querySelectorAll(".section");
  sections.forEach((section) => {
    if (!section.classList.contains("active")) {
      section.classList.add("hide");
    }
  });
})();

/*----------------------- theme ligth and darck mode -----------------------*/

const dayNigth = document.querySelector(".day-night");

dayNigth.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
  updateIcon();
});

function themeMode() {
  // checking if theme key exists
  if (localStorage.getItem("theme") !== null) {
    if (localStorage.getItem("theme") === "light") {
      document.body.classList.remove("dark");
    } else {
      document.body.classList.add("dark");
    }
  }
  updateIcon();
}
themeMode();

function updateIcon() {
  // dayNigth.querySelector("i").classList.add("fa-sun");
  if (document.body.classList.contains("dark")) {
    dayNigth.querySelector("i").classList.remove("fa-moon");
    dayNigth.querySelector("i").classList.add("fa-sun");
  } else {
    dayNigth.querySelector("i").classList.remove("fa-sun");
    dayNigth.querySelector("i").classList.add("fa-moon");
  }
}

/*----------------------- preloader -----------------------*/

window.addEventListener("load", () => {
  // preloader
  document.querySelector(".preloader").classList.add("fade-out");
  setTimeout(() => {
    document.querySelector(".preloader").style.display = "none";
  });
});

/*----------------------- clear form -----------------------*/
let btnClear = document.querySelector(".btnClear");
let inputs = document.querySelectorAll(".input-control");
console.log(inputs);

btnClear.addEventListener("click", () => {
  setTimeout(() => {
    inputs.forEach((input) => {
      input.value = "";
    });
  }, 300);
});


(() => {
  const form = document.forms["contact_form"]["Name"].value;
  console.log(form);
})();
