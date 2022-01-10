"use strict";
const cityid = document.querySelector(".timeline").dataset.cityid;
const uRL = `/api/v1/city/getonecity/${cityid}`;
const getcityReview = async (url) => {
  const promise = await fetch(url);
  const res = await promise.json();
  console.log(res);
  if (res.status == "success") {
    RenderAllReviews(res.data.city.reviews);
  }
};
getcityReview(uRL);
function RenderAllReviews(reviews) {
  const reviewContainer = document.querySelector(".posts");
  reviews.forEach((el) => {
    const html = ` <div class="review_cont_head">
        <div class="post__header post__header__post-1">
            <img src="/img/homepage/user-3.svg" class="tl-users-pf tl-user-pf__post-1" />
            <div class="tl-users-info tl-user-info__post-1">
                <div class="tl-users-name tl-user-name__post-1">
                    ${el.user.name}
                </div>
                <div class="tl-users-loc tl-user-loc__post-1">
                    ${el.user.city}
                </div>
            </div>
        </div>
      
      
        <div class="post-1--text-field review_decri_page">
            ${el.review}
        </div>
      
        <div class="review_star_cont">
            <i class="fas ${
              el.rating - 1 >= 0 ? "active_view_review" : ""
            } rating_view_review fa-star"></i>
            <i class="fas ${
              el.rating - 2 >= 0 ? "active_view_review" : ""
            } rating_view_review  fa-star"></i>
            <i class="fas ${
              el.rating - 3 >= 0 ? "active_view_review" : ""
            }  rating_view_review fa-star"></i>
            <i class="fas ${
              el.rating - 4 >= 0 ? "active_view_review" : ""
            } rating_view_review  fa-star"></i>
            <i class="fas ${
              el.rating - 5 >= 0 ? "active_view_review" : ""
            } rating_view_review  fa-star"></i>
        </div>
      </div>`;
    const ratingbox = document.createElement("div");
    ratingbox.innerHTML = html;
    reviewContainer.append(ratingbox);
  });
}
