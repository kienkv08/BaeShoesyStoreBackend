import express from 'express';
import OrderController from '../controller/order.controller.js';
import { authenticateJwt } from '../middlewares/jwt.middleware.js';

const orderRouter = express.Router();
orderRouter.post('/create', authenticateJwt, OrderController.createOrder);
orderRouter.post('/', authenticateJwt, OrderController.getOrderByUserId);
orderRouter.post('/update/:id', authenticateJwt, OrderController.updateOrder);

export default orderRouter;
