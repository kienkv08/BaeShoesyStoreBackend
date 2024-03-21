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
  async findUserById(data) {
    try {
      const { id } = data;
      const res = await this.findById(id);
      const { password: dummy, ...rest } = res;
      return { user: rest };
    } catch (e) {
      throw new AppError(e);
    }
  }

  async updateUser(id, data) {
    try {
      const { amount, deAmount } = data;
      const user = await this.findById(id);
      if (amount && user) {
        data.bag = user.bag + parseFloat(amount);
      }
      if (deAmount && user) {
        data.bag = user.bag - parseFloat(deAmount);
      }
      const res = (await this.update(id, data)).toObject();
      const { password: dummy, ...rest } = res;
      return { user: rest };
    } catch (e) {
      throw new AppError(e);
    }
  }
}
const UserRepository = new _UserRepository();
export default UserRepository;
