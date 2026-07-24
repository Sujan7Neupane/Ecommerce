import express from "express";

import { checkAuth, isAdmin } from "../middlewares/userAuth.js";

import {
  addProduct,
  deleteProduct,
  getProductBySlug,
  getProducts,
  updateProduct,
} from "../controllers/productController.js";

import { upload } from "../middlewares/multerMiddleware.js";
import {
  addReview,
  deleteReview,
  updateReview,
} from "../controllers/reviewController.js";

const router = express.Router();

router.post("/add", checkAuth, isAdmin, upload.single("image"), addProduct);
router.get("/all", checkAuth, isAdmin, getProducts); // admin protected
// router.get("/:slug", checkAuth, isAdmin, getProductBySlug); //admin protected
router.put("/:id", checkAuth, isAdmin, upload.single("image"), updateProduct);
router.delete("/:id", checkAuth, isAdmin, deleteProduct);

// not protected routes - to display products
router.get("/", getProducts);
router.get("/:slug", getProductBySlug);

// Product Review
router.post("/:productId/reviews", checkAuth, addReview);
router.patch("/:productId/reviews/:reviewId/update", checkAuth, updateReview);
router.delete("/:productId/reviews/:reviewId/delete", checkAuth, deleteReview);

export default router;
