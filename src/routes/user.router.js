import express from 'express';
import UserController from '../controller/user.controller.js';

const userRouter = express.Router();

userRouter.get('/', UserController.getAllUsers);

export default userRouter;
