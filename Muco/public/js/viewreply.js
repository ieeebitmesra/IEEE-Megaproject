"use strict";
const postBox = document.querySelector(".post__box");
const postId = postBox.dataset.postid;
const view_all_reply_container = document.querySelector(
  ".view_all_reply_container"
);
const getAllReply = async (url, filter) => {
  const promise = await fetch(url);
  const res = await promise.json();
  if (res.status == "success") AppendAllReplies(res.data.post.reply, filter);
  else AlertBoxAppend(res.message);
};
getAllReply(`/api/v1/post/getOnepost/${postId}`);

function AppendAllReplies(allReply, filter = "View Status") {
  if (filter == "View Status") {
    filter = "admin";
  } else {
    filter = "user";
  }
  allReply.forEach((el) => {
    if (el.user.role == filter) {
      const html = `<div class="div_01_reply_sec" data-replyid=${el._id}>
        <div class="post__header post__header__post-1">
            <img src="/img/homepage/user-3.svg" class="tl-users-pf tl-user-pf__post-1" />
            <div class="tl-users-info tl-user-info__post-1">
                <div class="tl-users-name tl-user-name__post-1">${
                  el.user.name
                }</div>
                <div class="tl-users-loc tl-user-loc__post-1">${
                  el.user.city
                }</div>
            </div>
        </div>
        <p class="post__text-field post-1--text-field">
            ${el.reply}
        </p>
        ${
          el.images.length > 0
            ? ` <div class="post__imgs--div post--1__img--div">
           <img src="/img/users/${el.images[0]}" class="post__img post--1__img--1" /> <div class="post__img-counter post--1__img--counter">${el.images.length}</div>   </div>`
            : ""
        }
        <div class="post__foot post-1--foot post_div_last_para ">

            
        </div>
    </div>`;
      const replybox = document.createElement("div");
      replybox.innerHTML = html;
      view_all_reply_container.append(replybox);
    }
  });
}
const viewReply = document.querySelector(".view_All_Reply");
console.log("hello hye bye", viewReply);
viewReply.addEventListener("click", () => {
  let filter = "View Status";
  [...view_all_reply_container.children].forEach((el) => el.remove());
  const url = `/api/v1/post/getOnepost/${postId}`;
  if (viewReply.dataset.filter == "View Reply") {
    filter = "View Reply";
    viewReply.setAttribute("data-filter", "View Status");
    viewReply.innerText = "View Status";
    document.querySelector(".status_post_details").innerText = "Replies";
  } else {
    filter = "View Status";
    viewReply.setAttribute("data-filter", "View Reply");
    viewReply.innerText = "View Reply";
    document.querySelector(".status_post_details").innerText = "Status";
  }
  getAllReply(url, filter);
});

/////////////////////Send Reply//////////////////////
/////////////////////////////////////////////////////

const fix_problem = document.querySelector(".post-fixproblem");
if (fix_problem) {
  fix_problem.addEventListener("click", () => {
    const form = new FormData();
    form.append("status", document.querySelector(".problem-give-status").value);
    form.append("reply", document.querySelector(".problem-solution").value);
    const images = document.querySelector(".problem-images");
    for (let i = 0; i < images.files.length; i++) {
      form.append(`images`, images.files[i]);
    }
    const url = `/api/v1/post/${postId}/reply/fixproblem`;
    postProblemsAndReply(form, url, ".reply_another_main_Conti");
  });
}

const reply_post = document.querySelector(".post-reply-button");
if (reply_post) {
  reply_post.addEventListener("click", () => {
    const form = new FormData();
    form.append("reply", document.querySelector(".post-reply").value);
    const images = document.querySelector(".post-reply-images");
    for (let i = 0; i < images.files.length; i++) {
      form.append(`images`, images.files[i]);
    }
    const url = `/api/v1/post/${postId}/reply/`;
    postProblemsAndReply(form, url, ".replymodel_post");
  });
}
///////////////////////////Slider-Reply-Posts//////////////////////////////////////

const Reply__container = document.querySelector(".view_all_reply_container");
Reply__container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("post__img") ||
    e.target.classList.contains("post__img-counter")
  ) {
    const image_container = e.target.closest(".div_01_reply_sec");
    const replyId = image_container.dataset.replyid;
    const url = `/api/v1/post/${postId}/reply/getOneReply/${replyId}`;
    getAllImage(url);
  }
});
