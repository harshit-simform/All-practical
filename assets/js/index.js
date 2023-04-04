const aboutSection = document.querySelector("#about");
const animatedElement = document.querySelectorAll(".bar");
const tabcontent = document.querySelectorAll(".tab-contents");
const sideMenu = document.getElementById("sideMenu");
const options = {
  rootMargin: "0px",
  threshold: 0.5,
};
const callback = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      animatedElement.forEach((element) => {
        const animateClass = element.previousElementSibling.innerText;
        element.children[0].classList.add(`${animateClass.toLowerCase()}`);
      });
    } else {
      animatedElement.forEach((element) => {
        const animateClass = element.previousElementSibling.innerText;
        element.children[0].classList.remove(`${animateClass.toLowerCase()}`);
      });
    }
  });
};
const observer = new IntersectionObserver(callback, options);

observer.observe(aboutSection);

const toggleTabs = document.querySelector(".tab-titles");
toggleTabs.addEventListener("click", (e) => {
  console.log(e.target);
  const removeClass = toggleTabs.children;
  const targetElement = e.target;
  console.log(targetElement.children.length);
  if (e.target.children.length === 0) {
    for (let element of removeClass) {
      element.classList.remove("active-link");
    }
    tabcontent.forEach((element) => {
      element.classList.remove("active-tab");
    });
    document
      .getElementById(`${e.target.innerText.toLowerCase()}`)
      .classList.add("active-tab");
    e.target.classList.add("active-link");
  } else {
    return;
  }
});

var swiper = new Swiper(".slide-content", {
  slidesPerView: 3,
  spaceBetween: 25,
  loop: true,
  centerSlide: "true",
  fade: "true",
  grabCursor: "true",
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    dynamicBullets: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    520: {
      slidesPerView: 2,
    },
    950: {
      slidesPerView: 3,
    },
  },
});
function toggleMenu(operation) {
  if (operation === "open") {
    sideMenu.style.right = "0px";
  } else {
    sideMenu.style.right = "-150px";
  }
}
