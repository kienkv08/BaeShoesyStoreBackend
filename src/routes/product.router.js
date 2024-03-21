import express from 'express';
import ProductController from '../controller/product.controller.js';
import { authenticateJwt } from '../middlewares/jwt.middleware.js';

const productRouter = express.Router();
productRouter.post('/create', authenticateJwt, ProductController.createProduct);
productRouter.post('/', ProductController.getProducts);
productRouter.post('/update/:id', authenticateJwt, ProductController.upadateProductById);
productRouter.get('/:id', ProductController.getProductById);

export default productRouter;
