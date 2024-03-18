import express from 'express';
import TransactionController from '../controller/transaction.controller.js';
import { authenticateJwt } from '../middlewares/jwt.middleware.js';

const transactionRouter = express.Router();
// TransactionRouter.post('/create', authenticateJwt, TransactionController.createTransaction);
transactionRouter.post('/', TransactionController.getTransactions);
transactionRouter.get('/:id', TransactionController.getTransactionById);

export default transactionRouter;