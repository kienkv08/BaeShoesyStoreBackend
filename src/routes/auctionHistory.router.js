import express from 'express';
import AutionHisController from '../controller/auctionHistory.controller.js';
import { authenticateJwt } from '../middlewares/jwt.middleware.js';

const auctionHistoryRouter = express.Router();

auctionHistoryRouter.post('/', authenticateJwt, AutionHisController.create);
auctionHistoryRouter.post('/highestPrice', authenticateJwt, AutionHisController.findMaxPrice);
export default auctionHistoryRouter;
