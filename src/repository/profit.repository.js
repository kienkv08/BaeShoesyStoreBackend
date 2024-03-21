import BaseRepository from '../base/base.repository.js';
import { AppError } from '../models/error.model.js';
import Profit from '../models/profit.model.js';

class ProfitRepo extends BaseRepository {
  constructor() {
    super(Profit);
  }

  async createProfit(data) {
    try {
      const res = await this.create(data);
      return res.toObject();
    } catch (e) {
      throw new AppError(e);
    }
  }
}
const ProfitRepository = new ProfitRepo();
export default ProfitRepository;
