import BaseController from '../base/base.controller.js';
import UserRepository from '../repository/user.repository.js';

class _UserController extends BaseController {
  async getAllUsers(req, res, next) {
    try {
      const users = await UserRepository.getAllUsers();
      this.success(req, res)(users);
    } catch (e) {
      next(this.getManagedError(e));
    }
  }
}

const UserController = new _UserController('user');
export default UserController;
