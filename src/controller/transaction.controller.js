import BaseController from '../base/base.controller.js';
import { AppError } from '../models/error.model.js';
import TransactionRepository from '../repository/transaction.repository.js';

class TransactionControll extends BaseController {
    // async createTransaction(req, res, next) {
    //     try {
    //         const { orders, ...rest } = req.body;
    //         let listImage = [];
    //         const orderPromises = orders.map(async (img) => {
    //             const imgRes = await ImageController.createImage(img);
    //             return imgRes;
    //         });
    //         listOrder = await Promise.all(imagePromises);
    //         if (listOrder.some((img) => img.error)) {
    //             res.status(500).json({ error: 'Failed to create one or more images' });
    //             return;
    //         }
    //         const data = {
    //             ...rest,
    //             images: listImage,
    //         };
    //         const result = await TransactionRepository.createTransaction(data);
    //         this.success(req, res)(result);
    //     } catch (error) {
    //         next(this.getManagedError(error));
    //     }
    // }

    async getTransactions(req, res, next) {
        try {
            const transactions = await TransactionRepository.getTransactions(req.body);
            this.success(req, res)(transactions);
        } catch (e) {
            next(this.getManagedError(e));
        }
    }

    async getTransactionById(req, res, next) {
        try {
            const id = req.params.id;
            if (!id) throw new AppError('Not found transaction!');
            const transaction = await TransactionRepository.getOneTransactionById(id);
            console.log(transaction);
            this.success(req, res)(transaction);
        } catch (e) {
            next(this.getManagedError(e));
        }
    }
}

const TransactionController = new TransactionControll('transaction');
export default TransactionController;
