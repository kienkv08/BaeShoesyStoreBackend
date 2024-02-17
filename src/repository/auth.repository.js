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
      // Check if the username or email is already taken
      const existingUser = await this.findOne({
        $or: [{ username: userDetails.username }, { email: userDetails.email }],
      });

      if (existingUser) {
        throw new AppError('Username or email already exists');
      }

      // Hash the password before saving it to the database

      // Create a new user object with the hashed password
      const newUser = {
        ...userDetails,
      };

      // Save the user to the database
      const createdUser = await this.create(newUser);

      return createdUser;
    } catch (error) {
      throw error;
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
