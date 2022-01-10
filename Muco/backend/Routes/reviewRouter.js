const express = require("express");
const userController = require("./../Controllers/userController");
const reviewController = require("./../Controllers/reviewController");
const postController = require("./../Controllers/postController");
const router = express.Router({ mergeParams: true });
router.use(userController.checkJWT);
router.get("/getReview", reviewController.getReview);
router.use(postController.checkPost);
router.route("/").post(reviewController.checkUser, reviewController.postReview);

router
  .route("/update/:reviewId")
  .patch(reviewController.checkUser, reviewController.updateReview);
router
  .route("/delete/:reviewId")
  .delete(reviewController.checkUser, reviewController.deleteReview);

module.exports = router;
