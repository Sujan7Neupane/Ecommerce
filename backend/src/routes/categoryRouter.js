import express from "express";

import { checkAuth, isAdmin } from "../middlewares/userAuth.js";
import {
  addCategory,
  deleteCategory,
  getAllCategories,
  getcategoryById,
  updateCategory,
} from "../controllers/categoryController.js";

const router = express.Router();

router.post("/add", checkAuth, isAdmin, addCategory);
router.get("/all", checkAuth, isAdmin, getAllCategories);
router.get("/:slug", checkAuth, isAdmin, getcategoryById);
router.put("/:id/update", checkAuth, isAdmin, updateCategory);
router.delete("/:id/delete", checkAuth, isAdmin, deleteCategory);

export default router;
