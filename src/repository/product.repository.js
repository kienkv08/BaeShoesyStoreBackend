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
      console.log('createdProduct', createdProduct.toObject());
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
    const product = this.findById(id, ['category']);
    if (!product) throw new AppError('Not found!');
    return product;
  }
}
const ProductRepository = new ProductRepo();
export default ProductRepository;
