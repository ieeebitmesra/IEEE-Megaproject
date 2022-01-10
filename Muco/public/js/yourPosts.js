console.log("Hello");
const getfilteredPosts = async (filterElement) => {
  const url = `/api/v1/post/yourPost/${filterElement}`;
  const promise = await fetch(url);
  const res = await promise.json();
  //console.log(data);
  renderfilteredPosts(res.data);
};
const renderfilteredPosts = (data) => {
  const user = data.user;
  // console.log("hey", user);
  user.yourPosts.forEach((el) => {
    const html = `<div class="usr_post__box post-1 " data-postid=${el._id}>
        <div class="post__header post__header__post-1">
          <img
            src="/img/homepage/user-3.svg"
            class="tl-users-pf tl-user-pf__post-1"
          />
          <div class="tl-users-info tl-user-info__post-1">
            <div class="tl-users-name tl-user-name__post-1">
              ${user.name}
            </div>
            <div class="tl-users-loc tl-user-loc__post-1">
              ${user.city}
            </div>
          </div>
        </div>
        <!--Post header-->
      
        <div class="post__status post-1--status">${el.status}</div>
        <p class="post__text-field post-1--text-field">
         ${el.discription}
        </p>
      
        <div class="post__imgs--div post--1__img--div">
          <img src="/img/users/${el.images[0]}" class="post__img post--1__img--1" />
          <div class="post__img-counter post--1__img--counter">+${el.images.length}</div>
        </div>
      
        <div class="post__foot post-1--foot">
        <button id="show_view_review_model" class="post__view your_post_view_more_1 post-1--view view_review_modal">View
        Review</button>
      <button id="show_give_review_model" class="post__review">Review</button>
        </div>
      </div>
      `;
    const postBox = document.createElement("div");
    postBox.innerHTML = html;
    postcontainer.append(postBox);
  });
};
const youPostButton = document.querySelector(".nav__user-posts");
const postcontainer = document.querySelector(".usr_posts-container");
let filterElement = "Pending";
youPostButton.addEventListener("click", () => {
  const allPosts = document.querySelector(".usr_posts-container").children;
  // console.log("hey", allPosts);
  [...allPosts].forEach((el) => el.remove());
  const pendingButton = document.querySelector(".usr_pending-post");
  pendingButton.classList.add("active-cat-button");
  getfilteredPosts(filterElement);
});

const filteroptions = document.querySelector(".usr_post-cat");
filteroptions.addEventListener("click", (e) => {
  if (e.target.classList.contains("usr_post-cat-button")) {
    const allPosts = document.querySelector(".usr_posts-container").children;
    // console.log("hey", allPosts);
    [...allPosts].forEach((el) => el.remove());
    filterElement = e.target.dataset.status;
    getfilteredPosts(filterElement);
  }
});

const YourPostContainer = document.querySelector(".usr_posts-container");
YourPostContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("view_review_modal")) {
    console.log(e.target.closest(".usr_post__box"));
    const postId = e.target.closest(".usr_post__box").dataset.postid;
    const url = `/api/v1/post/${postId}/review/getReview`;
    getReview(url); ///////////////////This is in common function////////////////////
    ////showReviewModal();
  }
  if (e.target.classList.contains("post__review")) {
    const postId = e.target.closest(".usr_post__box").dataset.postid;
    post_review(postId);
  }
  if (
    e.target.classList.contains("post__img") ||
    e.target.classList.contains("post__img-counter")
  ) {
    const image_container = e.target.closest(".usr_post__box");
    const postId = image_container.dataset.postid;
    const url = `/api/v1/post/getOnepost/${postId}`;
    getAllImage(url);
  }

  if (e.target.classList.contains("icon_yourPost")) {
    usr_post_cat.classList.toggle("show_icon_Filter");
  }
});
///////////////////////////Filter/////////////////////////////////
