import BaseRepository from '../base/base.repository.js';
import { AppError } from '../models/error.model.js';
import User from '../models/user.model.js';

class _UserRepository extends BaseRepository {
  constructor() {
    super(User);
  }

  async getAllUsers(params) {
    try {
      const users = await this.paginate(params);
      return users;
    } catch (error) {
      throw new AppError(error);
    }
  }
}
const UserRepository = new _UserRepository();
export default UserRepository;
