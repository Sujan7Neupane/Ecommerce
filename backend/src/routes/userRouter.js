import express from "express";

import {
  getAdminUser,
  getAllUsers,
  loginUser,
  registerUser,
} from "../controllers/userControllers.js";

import { checkAuth, isAdmin } from "../middlewares/userAuth.js";

const router = express.Router();

router.post("/register", registerUser);
router.get("/all", checkAuth, isAdmin, getAllUsers);
router.get("/admin", checkAuth, isAdmin, getAdminUser);
router.post("/login", loginUser);

export default router;
