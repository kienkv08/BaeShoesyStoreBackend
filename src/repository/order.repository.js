import BaseRepository from '../base/base.repository.js';
import Order from '../models/order.model.js';
import Product from '../models/product.model.js';
import User from '../models/user.model.js';

class OrderRepo extends BaseRepository {
  constructor() {
    super(Order);
  }
  async create(data) {
    try {
      console.log(data);
      const newOrder = await Order.create({ ...data });
      return newOrder.toObject();
    } catch (error) {
      console.log(error.toString());
    }
  }

  async updateOrderRe(id, data) {
    const newOrder = await this.update(id, data);
    return newOrder.toObject();
  }
  async orderByUserId(params) {
    const products = await this.paginate(params);
    return products;
  }
}

const OrderRepository = new OrderRepo();
export default OrderRepository;
