import BaseController from '../base/base.controller.js';
import UserRepository from '../repository/user.repository.js';

class _UserController extends BaseController {
  async getAllUsers(req, res, next) {
    try {
      const users = await UserRepository.getAllUsers(req.body);
      this.success(req, res)(users);
    } catch (e) {
      next(this.getManagedError(e));
    }
  }

  async getUserById(req, res, next) {
    try {
      const users = await UserRepository.findById(req.body);
      this.success(req, res)(users);
    } catch (e) {
      next(this.getManagedError(e));
    }
  }

  async update(req, res, next) {
    try {
      const { user, ...rest } = req.body;
      console.log('rest', typeof user);
      console.log('user', user);
      console.log('rest', rest);
      const users = await UserRepository.updateUser(user._id, rest);
      this.success(req, res)(users);
    } catch (e) {
      next(this.getManagedError(e));
    }
  }
}

const UserController = new _UserController('user');
export default UserController;
