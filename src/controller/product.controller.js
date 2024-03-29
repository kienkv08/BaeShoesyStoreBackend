import BaseController from '../base/base.controller.js';
import { AppError } from '../models/error.model.js';
import ProductRepository from '../repository/product.repository.js';
import ProfitRepository from '../repository/profit.repository.js';
import TransactionRepository from '../repository/transaction.repository.js';
import ImageController from './image.controller.js';

class ProductControll extends BaseController {
  async createProduct(req, res, next) {
    try {
      const { profit, images, ...rest } = req.body;
      let listImage = [];
      const imagePromises = images.map(async (img) => {
        const imgRes = await ImageController.createImage(img);
        return imgRes;
      });
      listImage = await Promise.all(imagePromises);
      if (listImage.some((img) => img.error)) {
        res.status(500).json({ error: 'Failed to create one or more images' });
        return;
      }
      const data = {
        ...rest,
        images: listImage,
      };
      const result = await ProductRepository.createProduct(data);
      const createTransaction = await TransactionRepository.create({
        totalAmount: parseFloat(profit),
        product: result._id,
        userId: result.created_by,
      });
      const createProfit = await ProfitRepository.createProfit({ amout: profit, transaction: createTransaction._id });
      this.success(req, res)(result);
    } catch (error) {
      next(this.getManagedError(error));
    }
  }

  async getProducts(req, res, next) {
    try {
      const products = await ProductRepository.getProducts(req.body);
      this.success(req, res)(products);
    } catch (e) {
      next(this.getManagedError(e));
    }
  }

  async getProductById(req, res, next) {
    try {
      const id = req.params.id;
      if (!id) throw new AppError('Not found product!');
      const product = await ProductRepository.getOneProductById(id);
      this.success(req, res)(product);
    } catch (e) {
      next(this.getManagedError(e));
    }
  }

  async upadateProductById(req, res, next) {
    try {
      const id = req.params.id;
      if (!id) throw new AppError('Not found product!');
      const product = await ProductRepository.updateProduct(id, req.body);
      this.success(req, res)(product);
    } catch (e) {
      next(this.getManagedError(e));
    }
  }
}

const ProductController = new ProductControll('product');
export default ProductController;
