"use strict";

const post_Button = document.querySelector("#up-new-post");
post_Button.addEventListener("click", (e) => {
  const form = new FormData();

  const images = document.querySelector("#new_post_imgs");
  form.append("discription", document.querySelector("#new_post_text1").value);
  form.append("address", document.querySelector("#new_post_text2").value);
  form.append("coordinate_lng", cordinate[0]);
  form.append("coordinate_lat", cordinate[1]);
  for (let i = 0; i < images.files.length; i++) {
    form.append(`images`, images.files[i]);
  }
  const url = `/api/v1/post/`;
  postProblemsAndReply(form, url, ".post__modal"); //////////////////////////This function is in common function
});
