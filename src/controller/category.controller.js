import BaseController from '../base/base.controller.js';
import CategoryRepository from '../repository/category.repository.js';

class CategoryControll extends BaseController {
  async getAllCategory(req, res) {
    try {
      const cates = await CategoryRepository.findAllCate();
      this.success(req, res)(cates);
    } catch (e) {
      next(this.getManagedError(e));
    }
  }
}

const CategoryController = new CategoryControll();
export default CategoryController;
