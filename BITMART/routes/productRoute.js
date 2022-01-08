const express=require("express");
const { getMyProducts, getAllProducts, createProduct, getProductDetails, updateProduct, deleteProduct, renderCreate, renderEdit }=require("../controllers/productController");
const checkLogin=require('../middleware/checkLogin');
const checkAuth=require('../middleware/checkProductAuth');
const router=express.Router({ mergeParams: true });
const multer=require('multer');
const { storage }=require('../cloudinary/config');
const upload=multer({ storage });

router.route("/")
    .get(getAllProducts);

router.route("/new")
    .get(checkLogin, renderCreate)
    .post(checkLogin, upload.array('images'), createProduct);

router.route('/my')
    .get(checkLogin, getMyProducts);
router.route("/:id")
    .get(getProductDetails)
    .put(checkLogin, checkAuth, upload.array('images'), updateProduct)
    .delete(checkLogin, checkAuth, deleteProduct);
router.route("/:id/edit")
    .get(checkLogin, checkAuth, renderEdit);



module.exports=router;
