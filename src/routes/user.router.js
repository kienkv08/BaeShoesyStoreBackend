import express from 'express';
import UserController from '../controller/user.controller.js';

const userRouter = express.Router();

userRouter.post('/', UserController.getAllUsers);

export default userRouter;
