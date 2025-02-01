import { User } from '../models/index.js';

class userRepository {
  async create(userData) {
    return await User.create(userData);
  }

  async findById(id) {
    return await User.findByPk(id);
  }

  async findByEmail(email) {
    return await User.findOne({ where: { email } });
  }

  async update(id, userData) {
    const user = await User.findByPk(id);
    if (user) {
      return await user.update(userData);
    }
    return null;
  }

  async delete(id) {
    const user = await User.findByPk(id);
    if (user) {
      return await user.destroy();
    }
    return null;
  }
}

export default new userRepository();