"use strict";

const getLikedPosts = async (url) => {
  const promise = await fetch(url);
  const res = await promise.json();
  // console.log(res);
  renderLikedPosts(res.data);
};
const renderLikedPosts = (data) => {
  // console.log("hello", data.user.likedPosts);
  data.user.likedPosts.forEach((el) => {
    const user = el.user;
    console.log(el);
    let like_dislike_image;
    let className = "";
    if (el.likedBy.includes(user._id)) {
      like_dislike_image = "/img/homepage/like-1.svg";
      className = "liked";
    } else {
      like_dislike_image = "/img/homepage/like-0.svg";
    }
    const postElement = document.createElement("div");
    const html = `<div class="post__box like-post-box post-1" data-postid=${
      el._id
    } >
    <div class="post__header post__header__post-1">
      <img
        src=${user.profile || "/img/homepage/user-3.svg"}
        class="tl-users-pf tl-user-pf__post-1"
      />
      <div class="tl-users-info tl-user-info__post-1">
        <div class="tl-users-name tl-user-name__post-1">${user.name}</div>
        <div class="tl-users-loc tl-user-loc__post-1">${user.city}</div>
      </div>
    </div>
    <!--Post header-->

    <div class="post__status post-1--status">${el.status}</div>
    <p class="post__text-field post-1--text-field">
     ${el.discription}
    </p>

    <div class="post__imgs--div post--1__img--div">
      <img src="/img/users/${el.images[0]}" class="post__img post--1__img--1" />
      <div class="post__img-counter post--1__img--counter">+3</div>
    </div>

    <div class="post__foot post-1--foot">
      <button class="post__view post-1--view">View More</button>
      <button class="post__like ${className}">
        <img
          src=${like_dislike_image}
          class="post__like-img post__like-img-0"
        />
        <div class="post__like-counter">
          <span class="post__like-count">${el.likes}</span> Likes
        </div>
      </button>
    </div>
  </div>`;
    const post = document.createElement("div");
    post.innerHTML = html;
    likedContainer.append(post);
  });
  activateLikeButton();
};
const likedContainer = document.querySelector(".usr_liked_container");
document.querySelector(".nav__liked-posts").addEventListener("click", () => {
  [...likedContainer.children].forEach((el) => el.remove());
  const url = "/api/v1/post/getLikedPosts";
  getLikedPosts(url);
});
likedContainer.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("post__img") ||
    e.target.classList.contains("post__img-counter")
  ) {
    const image_container = e.target.closest(".post__box");
    const postId = image_container.dataset.postid;
    const url = `/api/v1/post/getOnepost/${postId}`;
    getAllImage(url);
  }
  if (e.target.classList.contains("post__view")) {
    const postId = e.target.closest(".post__box").dataset.postid;
    const urL = `/postDetail/${postId}`;
    location.assign(urL);
  }
});
