import BaseRepository from '../base/base.repository.js';
import { AppError } from '../models/error.model.js';
import User from '../models/user.model.js';

class _UserRepository extends BaseRepository {
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

  async getAllUsers() {
    try {
      const users = await this.findAllIncludeDeleted();
      return users;
    } catch (error) {
      throw new AppError(error);
    }
  }
}
const UserRepository = new _UserRepository();
export default UserRepository;
