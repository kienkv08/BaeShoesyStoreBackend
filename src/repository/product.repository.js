import BaseRepository from '../base/base.repository.js';
import { AppError } from '../models/error.model.js';
import Product from '../models/product.model.js';
import Category from '../models/category.model.js';
import Image from '../models/image.model.js';

class ProductRepo extends BaseRepository {
  constructor() {
    super(Product);
  }
  async createProduct(data) {
    try {
      const createdProduct = await this.create(data);
      return createdProduct.toObject();
    } catch (error) {
      throw new AppError(error);
    }
  }
  async getProducts(params) {
    const products = await this.paginate(params);
    return products;
  }
  async getOneProductById(id) {
    const product = this.findById(id, ['category', 'created_by']);
    if (!product) throw new AppError('Not found!');
    return product;
  }

  async updateProduct(id, data) {
    const { userRouter, ...rest } = data;
    const product = await this.update(id, rest);
    if (!product) throw new AppError('Not found!');
    return product.toObject();
  }
}
const ProductRepository = new ProductRepo();
export default ProductRepository;
