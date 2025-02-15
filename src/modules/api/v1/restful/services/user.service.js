// src/modules/api/v1/restful/services/user.service.js
import User, { findById } from '../../../database/mongoDB/models/User.model';

export async function getUserById(id) {
  return await findById(id);
}

export async function createUser(userData) {
  const user = new User(userData);
  return await user.save();
}