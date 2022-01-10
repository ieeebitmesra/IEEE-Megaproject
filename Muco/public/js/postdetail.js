// post details /////////////////////////////

const menu_post_details = document.querySelector("#menu_post_details");
const menu_bar_PostDetails = document.querySelector("#menu_bar_PostDetails");
const post_details = document.querySelector("#post_details");
/////////////////////////Delete Post//////////////////
const DeletePost = async (url) => {
  const promise = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const res = await promise.json();
  if (res.status == "success") {
    AlertBoxAppend(res.message);
    window.setTimeout(() => {
      location.assign("/homepage");
    }, 3000);
  }
  if (res.status == "fail" || res.status == "error") {
    AlertBoxAppend(res.message);
  }
};
//////////////////////////////////////////////////////////
///////////////////Show Menu options //////////////////////
menu_post_details.addEventListener("click", showMenubar_details);
function showMenubar_details() {
  menu_bar_PostDetails.classList.toggle("hidden_post_details");
  post_details.classList.toggle("bg_change");
}
menu_bar_PostDetails.addEventListener("click", (e) => {
  const postId =
    document.querySelector("#post_details").children[0].dataset.postid;
  e.currentTarget.classList.remove("hidden_post_details");
  post_details.classList.toggle("bg_change");
  if (e.target.classList.contains("seeReview")) {
    const url = `/api/v1/post/${postId}/review/getReview`;
    getReview(url);
  }
  if (e.target.classList.contains("giveReview")) {
    post_review(postId);
  }
  if (e.target.classList.contains("DeletePost")) {
    const url = `/api/v1/post/delete/${postId}`;
    DeletePost(url); /////////////////////////This function is in Postdetail///////////////////
  }
});

/////////////////////////////Post Reply//////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////

// // // reply model open
const replymodel_post = document.querySelector("#replymodel_post");
const post_reply_model_btn = document.querySelector("#post_reply_model_btn");
const cross_reply_model = document.querySelector("#cross_reply_model");
post_reply_model_btn.addEventListener("click", showreplymodel_post);
cross_reply_model.addEventListener("click", hideReplyModel_post);

function showreplymodel_post() {
  replymodel_post.classList.add("show_reply_model");
  modals_wrapper.classList.remove("hidden");
}

function hideReplyModel_post() {
  replymodel_post.classList.remove("show_reply_model");
  modals_wrapper.classList.add("hidden");
}

// // view address
const view_address_post = document.querySelector("#view_address_post");
const cross_view_address_model = document.querySelector(
  "#cross_view_address_model"
);
const show_view_address_model = document.querySelector(
  "#show_view_address_model"
);
cross_view_address_model.addEventListener(
  "click",
  hide_Cross_model_view_address
);
show_view_address_model.addEventListener(
  "click",
  show_Cross_model_view_address
);
function hide_Cross_model_view_address() {
  view_address_post.classList.add("hidden");
}

function show_Cross_model_view_address() {
  view_address_post.classList.remove("hidden");
}

///////////////////Activate Like Button//////////////////
////////////////////////////////////////////////////////
const userid = document.querySelector(".nav__profile").dataset.userid;
const postid = document.querySelector(".post__box").dataset.postid;
console.log("hey", userid);
const post__like_img_Image = document.querySelector(".post__like-img");
const post__like_class = document.querySelector(".post__like");
let like_dislike_image = "/img/homepage/like-0.svg";
let className = "";
const activate_like = async function () {
  const promise = await fetch(
    `/api/v1/post/getOnepost/${postid}`
  );
  const res = await promise.json();
  console.log(res.data.post.likedBy);
  if (res.data.post.likedBy.includes(userid)) {
    console.log("hello");
    like_dislike_image = "/img/homepage/like-1.svg";
    post__like_img_Image.setAttribute("src", like_dislike_image);
    post__like_class.classList.add("liked");
  } else {
    like_dislike_image = "/img/homepage/like-0.svg";
    post__like_img_Image.setAttribute("src", like_dislike_image);
  }
};

activate_like();
console.log(post__like_img_Image.getAttribute("src"));
activateLikeButton();

/////////////////////////////view less/////////////////////

document.querySelector(".post__view").addEventListener("click", () => {
  location.assign("/homepage");
});

////////////////////////Slider//////////////////////
const post_Box = document.querySelector(".post__box");
post_Box.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("post__img") ||
    e.target.classList.contains("post__img-counter")
  ) {
    const image_container = e.target.closest(".post__box");
    const postId = image_container.dataset.postid;
    const url = `/api/v1/post/getOnepost/${postId}`;
    getAllImage(url);
  }
});
