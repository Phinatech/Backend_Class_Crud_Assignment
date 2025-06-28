import express from "express";
import {
  createCartItem,

} from "../controllers/Cart/cartController.js";
import authMiddleware from "../middleware/authmiddles.js";

const cartRouter = express.Router();

cartRouter
  // Create a cart item
  .post('/cart/create/:id', authMiddleware, createCartItem)

export default cartRouter;
