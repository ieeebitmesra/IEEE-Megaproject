"use strict";
const slides = document.querySelectorAll(".intro-img");
const length = slides.length;
console.log(length);
const initial = function () {
  slides.forEach((el, i) => {
    el.dataset.slide = `${i}`;
    el.style.transform = `translateX(${el.dataset.slide * 100}%)`;
  });
};
const slider = function () {
  slides.forEach((el, i) => {
    el.style.transform = `translateX(${(el.dataset.slide - 1) * 100}%)`;
    el.dataset.slide = `${el.dataset.slide - 1}`;
  });
  if (slides[0].dataset.slide == -3) initial();
};
initial();
let slideTo;
slideTo = setInterval(slider, 5000);

///////////////////////////////
const signupModal = document.querySelector("#signup");
const signuplink = document.getElementById("sign-up-link");
const overlay = document.querySelector(".overlay");
const cross = document.querySelectorAll(".cross-modal");
const reset_Modal = document.querySelector("#reset");

/////////////////////////////
//admin variables
const adminModal = document.querySelector("#admin");
const adminlink = document.querySelector("#admin-up-link");
//////////
overlay.addEventListener("click", function () {
  /*if (signupModal.classList.contains('hidden'))*/
  signupModal.classList.add("hidden");
  overlay.classList.add("hidden");
  adminModal.classList.add("hidden");
  reset_Modal.classList.add("hidden");
  slideTo = setInterval(slider, 5000);
});
signuplink.addEventListener("click", signupform);
function signupform() {
  /*if (
    !signupModal.classList.contains('hidden') &&
    !container.classList.contains('overlay')
  )*/
  clearInterval(slideTo);
  console.log("removing overlay and hidden class");
  signupModal.classList.remove("hidden");
  overlay.classList.remove("hidden");
}

const signup = document.querySelector(".first");
signup.addEventListener("click", signupform);

cross.forEach((el) => {
  el.addEventListener("click", function () {
    slideTo = setInterval(slider, 5000);
    signupModal.classList.add("hidden");
    adminModal.classList.add("hidden");
    overlay.classList.add("hidden");
    reset_Modal.classList.add("hidden");
  });
});

//  admin group
adminlink.addEventListener("click", adminupform);

function adminupform() {
  adminModal.classList.remove("hidden");
  clearInterval(slideTo);
  overlay.classList.remove("hidden");
}
const adminup = document.querySelector(".first");

////////////////////////////////////
document.querySelector(".forgot-pwd").addEventListener("click", (e) => {
  e.preventDefault();
  reset_Modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
});
