import { Router } from "express";
import {
  createOrder,
  getOrders
} from "../controllers/orderController";

const router = Router();

router.get("/", getOrders);

router.post("/", createOrder);

export default router;