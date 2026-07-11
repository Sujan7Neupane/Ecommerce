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

const router = express.Router();

router.post("/add", checkAuth, isAdmin, upload.single("image"), addProduct);
router.get("/all", checkAuth, isAdmin, getProducts);
router.get("/:slug", checkAuth, isAdmin, getProductBySlug);
router.put("/:id", checkAuth, isAdmin, upload.single("image"), updateProduct);
router.delete("/:id", checkAuth, isAdmin, deleteProduct);

export default router;
