import sequelize from './config/db.config.js';
import { User } from './models/index.js';
import UserService from './services/User.service.js';

export { sequelize, User, UserService };