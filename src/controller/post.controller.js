import BaseController from '../base/base.controller.js';
import { AppError } from '../models/error.model.js';
import PostRepository from '../repository/post.repository.js';

class PostControll extends BaseController {
    // async createPost(req, res, next) {
    //     try {
    //         const { orders, ...rest } = req.body;
    //         let listImage = [];
    //         const orderPromises = orders.map(async (img) => {
    //             const imgRes = await ImageController.createImage(img);
    //             return imgRes;
    //         });
    //         listOrder = await Promise.all(imagePromises);
    //         if (listOrder.some((img) => img.error)) {
    //             res.status(500).json({ error: 'Failed to create one or more images' });
    //             return;
    //         }
    //         const data = {
    //             ...rest,
    //             images: listImage,
    //         };
    //         const result = await PostRepository.createPost(data);
    //         this.success(req, res)(result);
    //     } catch (error) {
    //         next(this.getManagedError(error));
    //     }
    // }

    async getPosts(req, res, next) {
        try {
            const Posts = await PostRepository.getPosts(req.body);
            this.success(req, res)(Posts);
        } catch (e) {
            next(this.getManagedError(e));
        }
    }

    async getPostById(req, res, next) {
        try {
            const id = req.params.id;
            if (!id) throw new AppError('Not found Post!');
            const Post = await PostRepository.getOnePostById(id);
            console.log(Post);
            this.success(req, res)(Post);
        } catch (e) {
            next(this.getManagedError(e));
        }
    }
}

const PostController = new PostControll('Post');
export default PostController;
