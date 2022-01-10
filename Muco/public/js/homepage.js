"use strict";

/* ****** Declaring variables *******/
const app_wrapper = document.querySelector(".app-wrapper");
const timeline = document.querySelector(".timeline");
const city_mng = document.querySelector(".city-mng");
const nav__profile = document.querySelector(".nav__profile");
const nav__options = document.querySelectorAll(".nav__options");
const nav__buttons = document.querySelectorAll(".nav__buttons");
const nav__city = document.querySelector(".nav__city");
const profile__modal = document.querySelector(".profile__modal");
const users_posts__modal = document.querySelector(".users_posts__modal");
const modals_wrapper = document.querySelector(".modals-wrapper");

const app_pane = document.querySelector(".app-pane");
const user_posts_pg = document.querySelector(".user_posts-pg");
const city_dropdown = document.querySelector(".nav__city-dropdown");
const liked_posts_pg = document.querySelector(".liked_posts-pg");

const nav__cities_list = document.querySelector(".nav_cities-list");
const activeDot = document.createElement("div");

const post_cat_but = document.querySelectorAll(".usr_post-cat-button");

const post_button = document.querySelector(".nav__post");

const post__modal = document.querySelector(".post__modal");
const new_post_text = document.querySelector("#new_post_text");
const up_new_post = document.querySelector("#up-new-post");
const add_address_map = document.querySelector(".add-address-map");
const address_add = document.querySelector(".address-add");
const create_post = document.querySelector(".create_post");
/* ****** Hoisting functions ********/

function hide(elm) {
  elm.classList.add("hidden");
}

function unhide(elm) {
  elm.classList.remove("hidden");
}

function hideModalsWrapper() {
  [...modals_wrapper.children].forEach((el) => {
    hide(el);
  });
  hide(modals_wrapper);
}

function hideRightPane(bool) {
  console.log(bool);
  if (bool) {
    [...app_wrapper.children].forEach((e) => {
      hide(e);
    });
    app_wrapper.firstElementChild.classList.remove("hidden");
  } else {
    hide(app_pane);
    document.querySelector(".likedPosts").classList.add("hidden");
    unhide(timeline);
    unhide(city_mng);
  }
}

function resetPost() {
  address_add.style.background = "royalblue";
  hide(add_address_map);
  create_post.reset();
}

function activeNav(e) {
  nav__buttons.forEach((nav_butt) => {
    if (nav_butt.classList.contains("active-nav"))
      nav_butt.classList.remove("active-nav");
  });
  e.classList.add("active-nav");
}

function addActiveDot(el) {
  el.appendChild(activeDot).classList.add("active-dot");
}

function goHome() {
  activeNav(document.querySelector(".nav__user-home"));
  hideModalsWrapper();
  hideRightPane(false);
}

function sendAlert(str) {
  const alertDiv = document.querySelector(".alert");
  alertDiv.children[0].textContent = str;
  alertDiv.classList.remove("hidden");
  setTimeout(() => {
    alertDiv.classList.add("hidden");
  }, 3000);
}

/* **** like button logic **** */

/* *********** */

/*  profile modal */

nav__profile.addEventListener("click", () => {
  unhide(modals_wrapper);
  unhide(profile__modal);
});

modals_wrapper.addEventListener("click", (e) => {
  if (
    e.target.parentNode.classList.contains("app-wrapper") ||
    e.target.classList.contains("cross-modal")
  ) {
    hideModalsWrapper();
    hide(profile__modal);
    ReviewModal.classList.add("hidden");
    resetPost();
    // replymodel_post.classList.remove("show_reply_model");
  }
});

/***** Post modal *****/

post_button.addEventListener("click", (e) => {
  unhide(modals_wrapper);
  unhide(post__modal);
});

/* ***** */

/* **** NAV BUTTONS **** */

nav__buttons.forEach((currElement) => {
  if (currElement.classList.contains("nav__user-home")) {
    currElement.addEventListener("click", (e) => {
      if (!city_dropdown.classList.contains("hidden")) hide(city_dropdown);
      goHome();
    });
    return;
  } else if (currElement.classList.contains("nav__city")) {
    return;
  }
  currElement.addEventListener("click", (e) => {
    [...app_wrapper.children].forEach((e) => {
      hide(e);
    });
    if (!city_dropdown.classList.contains("hidden")) hide(city_dropdown);
    nav__buttons.forEach((nav_butt) => {
      if (nav_butt.classList.contains("active-nav"))
        nav_butt.classList.remove("active-nav");
    });

    app_wrapper.firstElementChild.classList.remove("hidden");
    if (e.target.classList.contains("nav__user-posts")) {
      e.target.classList.add("active-nav");
      unhide(app_pane);
      user_posts_pg.classList.remove("hidden");
      document.querySelector(".likedPosts").classList.add("hidden");
    } else if (e.target.classList.contains("nav__liked-posts")) {
      e.target.classList.add("active-nav");
      unhide(app_pane);
      user_posts_pg.classList.add("hidden");
      //liked_posts_pg.classList.remove("hidden");
      const likedPosts = document.querySelector(".likedPosts");
      unhide(likedPosts);
    }
  });
});

/* ***** */

nav__city.addEventListener("click", () => {
  unhide(city_dropdown);
  activeNav(nav__city);
});

nav__cities_list.addEventListener("click", (e) => {
  if (e.target.classList.contains("select_nav_city")) {
    if (e.target.classList.contains("select-ranchi")) {
      hide(nav__cities_list.parentElement);
      addActiveDot(e.target);
    }
    if (e.target.classList.contains("select-mumbai")) {
      hide(nav__cities_list.parentElement);
      addActiveDot(e.target);
    }
    if (e.target.classList.contains("select-chennai")) {
      hide(nav__cities_list.parentElement);
      addActiveDot(e.target);
    }
    if (e.target.classList.contains("select-kolkata")) {
      hide(nav__cities_list.parentElement);
      addActiveDot(e.target);
    }
    if (e.target.classList.contains("select-bengaluru")) {
      hide(nav__cities_list.parentElement);
      addActiveDot(e.target);
    }
  }
});

[...post_cat_but].forEach((e) => {
  e.addEventListener("click", (ev) => {
    [...post_cat_but].forEach((el) => {
      if (el.classList.contains("active-cat-button"))
        el.classList.remove("active-cat-button");
    });
    e.classList.add("active-cat-button");
  });
});

post_button.addEventListener("click", () => {});

new_post_text.addEventListener("keyup", (ev) => {
  let textEntered = new_post_text.value;
  //console.log(textEntered.length);
  if (textEntered.length > 0 && textEntered.length < 350) {
    new_post_text.style.height = "auto";
    const sch = ev.target.scrollHeight;
    new_post_text.style.height = `${sch}px`;
  }
});

address_add.addEventListener("click", (ev) => {
  ev.preventDefault();
  if (add_address_map.classList.contains("hidden")) {
    unhide(add_address_map);
    address_add.style.background = "#eee";
  }
});

// document.getElementById('new-img-post-alt').addEventListener('click', (ev) => {
//   ev.preventDefault();
//   document.getElementById('new_post_imgs').click();
// });

// document.getElementById('new_post_imgs').addEventListener('click', (ev) => {
//   console.log('clcik');
//   // ev.preventDefault();
// });

up_new_post.addEventListener("click", (ev) => {
  ev.preventDefault();
});

/* ******* sendAlert function can send alert ***** */
//sendAlert("Hello"); //Delete hello alert

// /////////////////////

// menu bar show
const barShow = document.querySelector("#barShow");
const navMenuRight = document.querySelector("#navMenuRight");

const postsBox = document.querySelector(".posts");

barShow.addEventListener("click", barshowFunction);

function barshowFunction() {
  navMenuRight.classList.toggle("show_menu_bar");
  postsBox.classList.toggle("hidden");
}

////////////////////rating show///////////////////
const ratingShow = document.querySelector("#ratingShow");
const cityMsgMenuLeft = document.querySelector("#cityMsgMenuLeft");
ratingShow.addEventListener("click", ratingshowFunction);

function ratingshowFunction() {
  cityMsgMenuLeft.classList.toggle("show_rating_bar");
  postsBox.classList.toggle("hidden");
  navMenuRight.classList.toggle("hidden");
}
// your post
const icon_yourPost = document.querySelector("#icon_yourPost");
const usr_post_cat = document.querySelector(".usr_post-cat");
const usr_posts_container = document.querySelector("#usr_posts-container");

icon_yourPost.addEventListener("click", showYourPostIcon);
function showYourPostIcon() {
  usr_post_cat.classList.toggle("show_icon_Filter");
  usr_posts_container.classList.toggle("usr_posts-container_show");
}

const crossModel_yourPost = document.querySelector("#crossModel_yourPost");
crossModel_yourPost.addEventListener("click", hide_your_post);
const your_post_Main_container = document.querySelector(
  "#your_post_Main_container"
);

function hide_your_post() {
  your_post_Main_container.classList.remove("active-nav");
  hide(app_pane);
  document.querySelector(".likedPosts").classList.add("hidden");
  user_posts_pg.classList.add("hidden");
  document.querySelector(".nav__user-home").click();
}

////////////////////////////////Review//////////////////////
////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////

// ///////////////////////base HomePage js//////////////////////////////
// view review model

const ReviewModal = document.querySelector("#view_review_container_details");
const showReviewModal = function () {
  modals_wrapper.classList.remove("hidden");
  ReviewModal.classList.remove("hidden");
};

// // give review model///////////////////////homepage.js//////////////////////

//
///////////////////Home Button/////////////
document.querySelector(".nav__user-home").addEventListener("click", (e) => {
  console.log("hello");
  location.assign("/homepage");
});

///////////////////////////////////SLIDER//////////////
//////////////SLIDER///////////////////
/////////////////////////////////////
const img_container_details = document.querySelector("#img_container_details");

const icon_corss_main = document.querySelector("#icon_corss_main");

icon_corss_main.addEventListener("click", hide_img_model);

function hide_img_model() {
  img_container_details.classList.add("hidden");
  modals_wrapper.classList.add("hidden");
}

// /////////////////////////////////////////////////////////////////////////////////////////////

// slider img model

/////////////////////////////////////////////////////////////////////////////////////////
////////////////////Slider//////////////////////////////////////////
