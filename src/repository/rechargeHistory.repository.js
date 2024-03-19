import BaseRepository from '../base/base.repository.js';
import { AppError } from '../models/error.model.js';
import RechargeHistory from '../models/rechargeHistory.model.js';

class RechargeRepo extends BaseRepository {
  constructor() {
    super(RechargeHistory);
  }

  async findByOrderId(data) {
    try {
      const { orderId } = data;
      const res = await this.findOne({ orderId });
      return res.toObject();
    } catch (e) {
      throw new AppError(e);
    }
  }

  async updateRecharge(id, data) {
    try {
      const { status } = data;
      const res = (await this.update(id, { status })).toObject();
      return res;
    } catch (e) {
      throw new AppError(e);
    }
  }

  async createRecharge(data) {
    try {
      const { orderId } = data;
      const isExist = await this.findOne({ orderId: orderId });
      if (isExist) throw new AppError('Fail');
      const res = await this.create(data);
      return res.toObject();
    } catch (e) {
      throw new AppError(e);
    }
  }
}
const RechargeRepository = new RechargeRepo();
export default RechargeRepository;
