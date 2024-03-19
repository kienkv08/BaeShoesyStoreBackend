import BaseRepository from '../base/base.repository.js';
import { AppError } from '../models/error.model.js';
import Transaction from '../models/transaction.model.js';

class TransactionRepo extends BaseRepository {
  constructor() {
    super(Transaction);
  }

  async createTransaction(data) {
    try {
      const res = await this.create(data);
      return res.toObject();
    } catch (e) {
      throw new AppError(e);
    }
  }
}
const TransactionRepository = new TransactionRepo();
export default TransactionRepository;
