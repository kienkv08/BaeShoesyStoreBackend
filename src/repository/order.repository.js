import BaseRepository from '../base/base.repository.js';
import { AppError } from '../models/error.model.js';
import Order from '../models/order.model.js';


class OrderRepo extends BaseRepository {
    constructor() {
        super(Order);
    }
    async createOrder(data) {
        try {
            const createdOrder = await this.create(data);
            return createdOrder.toObject();
        } catch (error) {
            throw new AppError(error);
        }
    }
    async getOrders(params) {
        const orders = await this.paginate(params);
        return orders;
    }
    async getOneOrderById(id) {
        const order = this.findById(id, ['title', 'created_by']);
        if (!order) throw new AppError('Not found!');
        return order;
    }
}
const OrderRepository = new OrderRepo();
export default OrderRepository;
