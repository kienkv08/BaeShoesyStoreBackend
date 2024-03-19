import BaseController from '../base/base.controller.js';
import AuctionHisRepository from '../repository/auctionHistory.repository.js';
import HistoryAuction from '../models/autionHistory.model.js';

class AutionHisControll extends BaseController {
  async create(req, res, next) {
    try {
      const { user, ...rest } = req.body;
      const response = await AuctionHisRepository.createAution(rest);
      this.success(req, res)(response);
    } catch (e) {
      next(this.getManagedError(e));
    }
  }
  async findMaxPrice(req, res, next) {
    try {
      const users = await AuctionHisRepository.getHighestPriceByProduct(req.body);
      this.success(req, res)(users);
    } catch (e) {
      next(this.getManagedError(e));
    }
  }
}

const AutionHisController = new AutionHisControll('HistoryAuction');
export default AutionHisController;
