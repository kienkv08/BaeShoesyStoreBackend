import BaseController from '../base/base.controller.js';
import AuthRepository from '../repository/auth.repository.js';

class _AuthController extends BaseController {
  async register(req, res, next) {
    try {
      const user = await AuthRepository.register(req.body);
      this.success(req, res)(user);
    } catch (e) {
      next(this.getManagedError(e));
    }
  }

  async login(req, res, next) {
    try {
      const user = await AuthRepository.login(req.body);
      this.success(req, res)(user);
    } catch (e) {
      next(this.getManagedError(e));
    }
  }
}

const AuthController = new _AuthController('user');
export default AuthController;
