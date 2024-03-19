import authRoter from './auth.router.js';
import cartRouter from './cart.router.js';
import categoryRouter from './category.router.js';
import orderRouter from './order.router.js';
import paymentRouter from './payment.router.js';
import productRouter from './product.router.js';
import transactionRouter from './transaction.router.js';
import userRouter from './user.router.js';
import postRouter from './post.router.js';

const routes = (app) => {
  app.use('/auth', authRoter);
  app.use('/products', productRouter);
  app.use('/transactions', transactionRouter);
  app.use('/orders', orderRouter);
  app.use('/posts', postRouter);
  app.use('/categories', categoryRouter);
  app.use('/carts', cartRouter);
  app.use('/users', userRouter);
  app.use('/payment', paymentRouter);
};

export default routes;
