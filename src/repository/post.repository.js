import BaseRepository from '../base/base.repository.js';
import { AppError } from '../models/error.model.js';
import Post from '../models/post.model.js';


class PostRepo extends BaseRepository {
    constructor() {
        super(Post);
    }
    async createPost(data) {
        try {
            const createdPost = await this.create(data);
            return createdPost.toObject();
        } catch (error) {
            throw new AppError(error);
        }
    }
    async getPosts(params) {
        const Posts = await this.paginate(params);
        return Posts;
    }
    async getOnePostById(id) {
        const Post = this.findById(id, ['post', 'created_by']);
        if (!Post) throw new AppError('Not found!');
        return Post;
    }
}
const PostRepository = new PostRepo();
export default PostRepository;
