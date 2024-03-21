import BaseController from '../base/base.controller.js';
import { AppError } from '../models/error.model.js';
import AuctionHisRepository from '../repository/auctionHistory.repository.js';
import OrderRepository from '../repository/order.repository.js';
import ProductRepository from '../repository/product.repository.js';
import ProfitRepository from '../repository/profit.repository.js';
import TransactionRepository from '../repository/transaction.repository.js';
import UserRepository from '../repository/user.repository.js';

class OrderControll extends BaseController {
  async createOrder(req, res, next) {
    try {
      const { profit, productPrice, user, ...rest } = req.body;
      console.log(profit);
      if (user.bag < productPrice * 0.3) throw new AppError('Not enough money!');
      const result = await OrderRepository.create(rest);
      console.log(result);
      const createTransaction = await TransactionRepository.createTransaction({
        totalAmount: parseFloat(productPrice * 0.3),
        product: result.productId,
        userId: result.userId,
      });
      this.success(req, res)(result);
    } catch (error) {
      next(this.getManagedError(error));
    }
  }

  async updateOrder(req, res, next) {
    try {
      const id = req.params.id;
      const { status, user, ...rest } = req.body;
      const result = await OrderRepository.updateOrderRe(id, { status });
      if (status === 2) {
        console.log('run here');
        const product = await ProductRepository.getOneProductById(result.productId);
        console.log('run product', product);
        if (!product) {
          await OrderRepository.updateOrderRe(id, 1);
          throw new AppError('Fail to payment!');
        }
        const auctionHistory = await AuctionHisRepository.getHighestPriceByProduct({ id: product._id });
        console.log('run auctionHistory', auctionHistory);
        if (!auctionHistory) {
          await OrderRepository.updateOrderRe(id, 1);
          throw new AppError('Fail to payment!');
        }
        let priceReturn = 0;
        if (auctionHistory.length !== 0 && product.maxPrice != 0) {
          priceReturn = Math.floor(auctionHistory[0].price * 0.3);
        } else {
          priceReturn = Math.floor(product.price * 0.3);
        }
        const updatedUser = await UserRepository.updateUser(product.created_by, { amount: priceReturn });
        if (!updatedUser) {
          await OrderRepository.updateOrderRe(id, 1);
          throw new AppError('Fail to payment!');
        }
      }
      this.success(req, res)(result);
    } catch (error) {
      next(this.getManagedError(error));
    }
  }

  async getOrderByUserId(req, res, next) {
    try {
      const products = await OrderRepository.orderByUserId(req.body);
      this.success(req, res)(products);
    } catch (e) {
      console.log('vao day');
      next(this.getManagedError(e));
    }
  }
}

const OrderController = new OrderControll();
export default OrderController;
