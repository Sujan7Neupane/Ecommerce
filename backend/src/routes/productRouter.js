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
router.get("/all", checkAuth, isAdmin, getProducts);
router.get("/:slug", checkAuth, isAdmin, getProductBySlug);
router.put("/:id", checkAuth, isAdmin, upload.single("image"), updateProduct);
router.delete("/:id", checkAuth, isAdmin, deleteProduct);

// Product Review
router.post("/:productId/reviews", checkAuth, addReview);
router.patch("/:productId/reviews/:reviewId/update", checkAuth, updateReview);
router.delete("/:productId/reviews/:reviewId/delete", checkAuth, deleteReview);

export default router;
