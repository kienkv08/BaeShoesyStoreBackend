import express from 'express';
import orderController from '../controller/order.controller.js'; // Correct import path and variable name

const orderRouter = express.Router();
orderRouter.get('/', orderController.getOrders); // Correct method name
export default orderRouter;
