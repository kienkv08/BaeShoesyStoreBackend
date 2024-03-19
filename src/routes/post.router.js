import express from 'express';
import PostController from '../controller/post.controller.js';
import { authenticateJwt } from '../middlewares/jwt.middleware.js';

const postRouter = express.Router();
// postRouter.post('/create', authenticateJwt, PostController.createPost);
postRouter.post('/', PostController.getPosts);
postRouter.get('/:id', PostController.getPostById);

export default postRouter;
