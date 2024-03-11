import BaseRepository from '../base/base.repository.js';
import Category from '../models/category.model.js';

class CategoryRepo extends BaseRepository {
  constructor() {
    super(Category);
  }
  async findAllCate() {
    try {
      const users = await this.paginate({
        pagination: {
          size: 100000,
          page: 1,
        },
      });
      return users;
    } catch (error) {
      throw new AppError(error);
    }
  }
}

const CategoryRepository = new CategoryRepo();
export default CategoryRepository;
