import express from 'express';
import CategoryController from '../controller/category.controller.js';

const categoryRouter = express.Router();

categoryRouter.get('/', CategoryController.getAllCategory);

export default categoryRouter;
