import auctionHistoryRouter from './auctionHistory.router.js';
import authRoter from './auth.router.js';
import cartRouter from './cart.router.js';
import categoryRouter from './category.router.js';
import orderRouter from './order.router.js';
import paymentRouter from './payment.router.js';
import productRouter from './product.router.js';
import userRouter from './user.router.js';

const routes = (app) => {
  app.use('/auth', authRoter);
  app.use('/products', productRouter);
  app.use('/orders', orderRouter);
  app.use('/categories', categoryRouter);
  app.use('/carts', cartRouter);
  app.use('/users', userRouter);
  app.use('/payment', paymentRouter);
  app.use('/auctions', auctionHistoryRouter);
};

export default routes;
