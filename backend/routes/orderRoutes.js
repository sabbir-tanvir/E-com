import express from "express";
import { roleBasedAccess, verifyUserAuth } from "../middleware/userAuth.js";
import { createOrder, getAllOrders, getSingleOrder, myOrders } from "../controller/orderController.js";

const router = express.Router();

router.route("/new/order").post(verifyUserAuth, createOrder)
router.route("/admin/order/:id").get(verifyUserAuth, roleBasedAccess("admin"), getSingleOrder)
router.route("/my/orders").get(verifyUserAuth, myOrders)
router.route("/admin/orders").get(verifyUserAuth, roleBasedAccess("admin"), getAllOrders)

export default router;