import { AppError } from '../models/error.model.js';
import TransactionRepository from '../repository/transaction.repository.js';

class TransControll {
  async createTrans(req, res) {
    try {
      const result = await TransactionRepository.createTransaction(req.body);
      return result;
    } catch (error) {
      console.log(error.toString());
    }
  }
}

const TransController = new TransControll();
export default TransController;
