import BaseController from '../base/base.controller.js';
import { AppError } from '../models/error.model.js';
import OrderRepository from '../repository/order.repository.js';

class OrderController extends BaseController {
    async createTransaction(req, res, next) {
        try {
            const { orders, ...rest } = req.body;
            let listImage = [];
            const orderPromises = orders.map(async (img) => {
                const imgRes = await ImageController.createImage(img);
                return imgRes;
            });
            listImage = await Promise.all(orderPromises); // Fix variable name
            if (listImage.some((img) => img.error)) {
                res.status(500).json({ error: 'Failed to create one or more images' });
                return;
            }
            const data = {
                ...rest,
                images: listImage,
            };
            const result = await TransactionRepository.createTransaction(data);
            this.success(req, res)(result);
        } catch (error) {
            next(this.getManagedError(error));
        }
    }

    async getOrders(req, res, next) { // Correct method name
        try {
            const orders = await OrderRepository.getOrders(req.body); // Assuming you pass the request body to getOrders
            this.success(req, res)(orders);
        } catch (e) {
            next(this.getManagedError(e));
        }
    }

    async getOrderById(req, res, next) {
        try {
            const id = req.params.id;
            if (!id) throw new AppError('Not found order!');
            const order = await OrderRepository.getOneOrderById(id);
            console.log(order);
            this.success(req, res)(order);
        } catch (e) {
            next(this.getManagedError(e));
        }
    }
}

const orderController = new OrderController('order');
export default orderController;
