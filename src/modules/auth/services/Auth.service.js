import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../../../config/security.config.js';
import User from '../../database/postgreSQL/models/User.model.js';

class AuthService {
  async generateToken(user) {
    return jwt.sign({ id: user.id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });
  }

  async login(email, password) {
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      throw new Error('Invalid email or password.');
    }

    const token = await this.generateToken(user);
    return { user, token };
  }

  // async register(name, email, password) {
  //   const user = await User.create({ name, email, password });
  //   const token = await this.generateToken(user);
  //   return { user, token };
  // }
}

export default new AuthService();