import { verify } from 'jsonwebtoken';
import { JWT_SECRET } from '../../config/security.config.js';

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    res.status(401);
    return next(new Error('Unauthorized: No token provided'));
  }

  try {
    const decoded = verify(token, JWT_SECRET);
    req.user = decoded; // ربط بيانات المستخدم بالطلب
    next();
  } catch (err) {
    res.status(401);
    next(new Error('Unauthorized: Invalid token'));
  }
};

export default authMiddleware;
