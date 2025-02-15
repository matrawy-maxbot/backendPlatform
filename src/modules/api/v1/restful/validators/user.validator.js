// src/modules/api/v1/restful/validators/user.validator.js
import { object, string } from 'joi';

export const createUserSchema = object({
  name: string().required(),
  email: string().email().required(),
  password: string().min(6).required(),
});

export const getUserSchema = object({
  id: string().required(),
});