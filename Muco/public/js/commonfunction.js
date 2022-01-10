const AlertBoxAppend = (message) => {
  const alertBox = document.querySelector(".alert");
  alertBox.innerText = message;
  alertBox.classList.remove("hidden");
  setTimeout(() => {
    alertBox.classList.add("hidden");
  }, 3000);
};

const likedislike = async function (url) {
  const promise = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
  });
  await promise.json();
};

const activateLikeButton = function () {
  const post_like_buttons = document.querySelectorAll(".post__like");
  [...post_like_buttons].forEach((currButton) => {
    const count = currButton.children[1].children[0];
    // const currButton = currButton;
    const like_img = currButton.children[0];
    let url;
    currButton.addEventListener("click", (e) => {
      const postId = e.target.closest(".post__box").dataset.postid;
      //console.log(postId);
      if (!currButton.classList.contains("liked")) {
        currButton.style.background = "white";
        currButton.style.color = "black";
        count.innerText = Number(count.innerText) + 1;
        like_img.src = "/img/homepage/like-1.svg";
        currButton.classList.add("liked");
        url = `/api/v1/post/like/${postId}`;
        likedislike(url);
      } else {
        currButton.classList.remove("liked");
        currButton.style.background = "whitesmoke";
        currButton.style.color = "black";
        count.innerText = Number(count.innerText) - 1;
        like_img.src = "/img/homepage/like-0.svg";
        url = `/api/v1/post/dislike/${postId}`;
        likedislike(url);
      }
    });
  });
};
//////////////////////////////////Review/////////////////////////////////
////////////////////////////////////////////////////////////////////////
const AppendViewReview = (review) => {
  const showReviewContainer = document.querySelector(
    "#view_review_container_details"
  );
  showReviewContainer.innerHTML = "";
  const html = `  <div class=" View_review_icon_cont">
  <div class="img_Image">View Review</div>
  <div id="icon_cross_view_review">x</div>
</div>
<div class="view_Review_min_content">
  <div class="post__header post__header__post-1">
    <img src="/img/homepage/user-3.svg" class="tl-users-pf tl-user-pf__post-1" />
    <div class="tl-users-info tl-user-info__post-1">
      <div class="tl-users-name tl-user-name__post-1">
        ${review.user.name}
      </div>
      <div class="tl-users-loc tl-user-loc__post-1">
        ${review.user.city}
      </div>
    </div>
  </div>

  <p class="">
   ${review.review}
  </p>

  <div class="addStar">
  </div>

</div>`;
  const reviewModal = document.createElement("div");
  reviewModal.innerHTML = html;
  showReviewContainer.classList.remove("hidden");
  showReviewContainer.insertAdjacentElement("afterbegin", reviewModal);
  const addStar = document.querySelector(".addStar");
  [1, 2, 3, 4, 5].forEach((el) => {
    if (el <= review.rating) {
      addStar.insertAdjacentHTML(
        "beforeend",
        '<i class="fas active_view_review rating_view_review fa-star"></i>'
      );
    } else {
      addStar.insertAdjacentHTML(
        "beforeend",
        '<i class="fas  rating_view_review fa-star"></i>'
      );
    }
  });
  modals_wrapper.classList.remove("hidden");
  document
    .querySelector("#icon_cross_view_review")
    .addEventListener("click", (e) => {
      modals_wrapper.classList.add("hidden");
      showReviewContainer.classList.add("hidden");
    });
  modals_wrapper.addEventListener("click", () => {
    showReviewContainer.classList.add("hidden");
  });
};

const getReview = async (url) => {
  const promise = await fetch(url);
  const res = await promise.json();
  if (res.status == "fail") {
    AlertBoxAppend(res.message);
  }
  if (res.status == "success") {
    AppendViewReview(res.data.review);
  }
};

//////////////////////////////////////Create Review Function///////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////
const post_review = async (postId) => {
  const reviewContainer = document.querySelector(
    "#give_review_container_details"
  );
  let ratingstar;
  reviewContainer.classList.remove("hidden");
  modals_wrapper.classList.remove("hidden");
  document
    .querySelector("#icon_cross_give_review")
    .addEventListener("click", () => {
      document
        .querySelector("#give_review_container_details")
        .classList.add("hidden");
      modals_wrapper.classList.add("hidden");
    });
  modals_wrapper.addEventListener("click", () => {
    document
      .querySelector("#give_review_container_details")
      .classList.add("hidden");
    modals_wrapper.classList.add("hidden");
  });
  document.querySelector(".give_rating-btn").addEventListener("click", (e) => {
    if (e.target.classList.contains("rating_view_review")) {
      const number = Number(e.target.dataset.number);
      ratingstar = number;
      const AllstarHTMLCollection =
        document.querySelector(".give_rating-btn").children[0].children;
      const star = [...AllstarHTMLCollection];
      for (let i = 0; i <= number - 1; i++) {
        star[i].classList.add("active_view_review");
      }
      for (let i = number; i < 5; i++) {
        star[i].classList.remove("active_view_review");
      }
    }
  });
  document
    .querySelector(".btn_give_review_send")
    .addEventListener("click", (e) => {
      createReviewPost(e, ratingstar, postId);
    });
};

function createReviewPost(e, rating, postId) {
  const PostReview = async (url, reqBody) => {
    const promise = await fetch(url, {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = await promise.json();
    if (
      res.status == "fail" ||
      res.status == "success" ||
      res.status == "error"
    ) {
      AlertBoxAppend(res.message);
    } else {
      AlertBoxAppend("Something went wrong");
    }
  };
  const review = document.querySelector(".your_Review").value;
  const url = `/api/v1/post/${postId}/review`;
  PostReview(url, { review, rating });
}

////////////////////////////////////////////////////////////////////
///////Post Problems and reply////////////////////////////////
const postProblemsAndReply = async (form, url, className) => {
  const promise = await fetch(url, {
    method: "POST",
    body: form,
  });
  const res = await promise.json();
  if (res.status == "success") {
    document.querySelector(className).classList.add("hidden");
    modals_wrapper.classList.add("hidden");
  }
  AlertBoxAppend(res.message);
};

///////////////////////Slider Function///////////////////////
///////////////////////////////////////////////////////
async function getAllImage(url) {
  const promise = await fetch(url);
  const res = await promise.json();
  renderAllImages(res.data.post.images);
}
function renderAllImages(images) {
  const image_container = document.querySelector(".img-slide_container_02");
  const previousImg = [...image_container.children];
  previousImg.forEach((el) => el.remove());
  images.forEach((image) => {
    const html = ` <div class="img_slide_model">
    <img src="/img/users/${image}" class="slide-img" alt="" />
  </div>`;
    const element = document.createElement("div");
    element.innerHTML = html;
    image_container.insertAdjacentElement("beforeend", element);
  });
  console.log(images.length);
  if (images.length >= 1) {
    slideImages();
  }
}
function slideImages() {
  document.querySelector(".img_model_slide").classList.remove("hidden");
  modals_wrapper.classList.remove("hidden");
  const image_container = document.querySelector(".img-slide_container_02");
  const TotalImg = [...image_container.children].length;
  const img_model_slider = document.querySelectorAll(".img_slide_model");
  const prevBtn = document.querySelector(".prev_btn_cont_img_slide");
  const nextBtn = document.querySelector(".next_btn_cont_img_slide");

  img_model_slider.forEach(function (slide, index) {
    slide.style.left = `${index * 100}%`;
  });
  if (TotalImg === 1) {
    prevBtn.classList.add("hidden");
    nextBtn.classList.add("hidden");
  }
  let counter = 0;
  nextBtn.addEventListener("click", function () {
    counter++;
    carousel();
  });

  prevBtn.addEventListener("click", function () {
    counter--;
    carousel();
  });

  function carousel() {
    if (counter < img_model_slider.length - 1) {
      nextBtn.style.display = "block";
    } else {
      nextBtn.style.display = "none";
    }
    if (counter > 0) {
      prevBtn.style.display = "block";
    } else {
      prevBtn.style.display = "none";
    }
    img_model_slider.forEach(function (slide) {
      slide.style.transform = `translateX(-${counter * 100}%)`;
    });
  }

  prevBtn.style.display = "none";
}
