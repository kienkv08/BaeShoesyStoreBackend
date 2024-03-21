import express from 'express';
import { authenticateJwt } from '../middlewares/jwt.middleware.js';
import TransController from '../controller/transaction.controller.js';

const transRouter = express.Router();

transRouter.post('/', authenticateJwt, TransController.createTrans);
export default transRouter;
