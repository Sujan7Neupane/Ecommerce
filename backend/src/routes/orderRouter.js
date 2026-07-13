import express from "express";
import { checkAuth, isAdmin } from "../middlewares/userAuth.js";
import {
  addOrder,
  deliverOrder,
  getAllOrder,
  getMyorders,
  getMyordersById,
  getOrdersById,
  payOrder,
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/add", checkAuth, addOrder);
router.get("/my-orders", checkAuth, getMyorders);
router.get("/my-orders/:id", checkAuth, getMyordersById);
router.put("/:id/pay-order", checkAuth, payOrder);
router.put("/:id/deliver-order", checkAuth, deliverOrder);

router.get("/admin-orders", checkAuth, isAdmin, getAllOrder);
router.get("/admin-orders/:id", checkAuth, isAdmin, getOrdersById);

export default router;
