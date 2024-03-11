import BaseRepository from '../base/base.repository.js';
import { AppError } from '../models/error.model.js';
import User from '../models/user.model.js';
import { generalAccessToken, generalRefreshToken } from '../services/jwt.service.js';
import bcrypt from 'bcrypt';

class _AuthRepository extends BaseRepository {
  constructor() {
    super(User);
  }

  async register(userDetails) {
    try {
      const existingUser = await this.findOne({
        $or: [{ username: userDetails.username }, { email: userDetails.email }],
      });
      if (existingUser) {
        throw new AppError('Username or email already exists');
      }
      if (userDetails.role) {
        throw new AppError('Not allow to set role');
      }
      const newUser = {
        ...userDetails,
      };
      const createdUser = await this.create(newUser);
      const { password: dummy, ...rest } = createdUser.toObject();
      return { ...rest };
    } catch (error) {
      throw new AppError(error);
    }
  }
  async login({ username, password }) {
    const user = await this.findOne({ username });
    const isMatch = user && (await user.isValidPassword(password));
    if (!user || !isMatch) {
      throw new AppError('Login fail');
    }
    const { password: dummy, ...rest } = user.toObject();
    const accessToken = await generalAccessToken(rest);
    return { accessToken, user: rest };
  }
}

const AuthRepository = new _AuthRepository();
export default AuthRepository;
