import BaseRepository from '../base/base.repository.js';
import { AppError } from '../models/error.model.js';
import Transaction from '../models/transaction.model.js';


class TransactionRepo extends BaseRepository {
    constructor() {
        super(Transaction);
    }
    async createTransaction(data) {
        try {
            const createdTransaction = await this.create(data);
            return createdTransaction.toObject();
        } catch (error) {
            throw new AppError(error);
        }
    }
    async getTransactions(params) {
        const transactions = await this.paginate(params);
        return transactions;
    }
    async getOnetransactionById(id) {
        const transaction = this.findById(id, ['category', 'created_by']);
        if (!transaction) throw new AppError('Not found!');
        return transaction;
    }
}
const TransactionRepository = new TransactionRepo();
export default TransactionRepository;
