import express from 'express';
import UserController from '../controller/user.controller.js';
import { authenticateJwt } from '../middlewares/jwt.middleware.js';

const userRouter = express.Router();

userRouter.post('/', UserController.getAllUsers);
userRouter.post('/information', UserController.getUserById);
userRouter.post('/update', authenticateJwt, UserController.update);

export default userRouter;
