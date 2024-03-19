import BaseRepository from '../base/base.repository.js';
import { AppError } from '../models/error.model.js';
import HistoryAuction from '../models/autionHistory.model.js';

class AuctionHisRepo extends BaseRepository {
  constructor() {
    super(HistoryAuction);
  }

  async createAution(data) {
    try {
      const res = await this.create(data);
      return res.toObject();
    } catch (e) {
      throw new AppError(e);
    }
  }

  async getHighestPriceByProduct(data) {
    try {
      const { id } = data;
      console.log('_id', id);
      const res = await HistoryAuction.find({ productId: id }).populate('userId').sort({ price: -1 }).limit(1).exec();
      console.log(res);
      return res;
    } catch (e) {
      throw new AppError(e);
    }
  }
}
const AuctionHisRepository = new AuctionHisRepo();
export default AuctionHisRepository;
