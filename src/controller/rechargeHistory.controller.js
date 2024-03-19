import BaseController from '../base/base.controller.js';
import RechargeRepository from '../repository/rechargeHistory.repository.js';
import RechargeHistory from '../models/rechargeHistory.model.js';

class RechargeControll extends BaseController {
  async getRechargeByOrderId(req, res, next) {
    try {
      const users = await RechargeRepository.findByOrderId(req.body);
      console.log(users);
      this.success(req, res)(users);
    } catch (e) {
      next(this.getManagedError(e));
    }
  }

  async update(req, res, next) {
    try {
      const users = await RechargeRepository.updateRecharge(req.body._id, req.body);
      this.success(req, res)(users);
    } catch (e) {
      next(this.getManagedError(e));
    }
  }

  async create(req, res, next) {
    try {
      const users = await RechargeRepository.createRecharge(req.body);
      this.success(req, res)(users);
    } catch (e) {
      next(this.getManagedError(e));
    }
  }
}

const RechargeController = new RechargeControll('RechargeHistory');
export default RechargeController;
