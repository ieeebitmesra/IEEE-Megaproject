const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails, createProductReview, getProductReviews, deleteReview } = require("../controller/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

//Routes
router.route("/products").get(getAllProducts);
router.route("/products/:id").get(getProductDetails);

//Authenticated users only
router.route("/review").put(isAuthenticatedUser, createProductReview);
router.route("/reviews").get(getProductReviews).delete(isAuthenticatedUser, deleteReview);

//Admins only
router.route("/admin/products").get(isAuthenticatedUser,authorizeRoles('admin'),getAllProducts);
router.route("/admin/products/new").post(isAuthenticatedUser, authorizeRoles('admin'), createProduct);
router.route("/admin/products/:id").put(isAuthenticatedUser, authorizeRoles('admin'), updateProduct).delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProduct);

module.exports = router;
