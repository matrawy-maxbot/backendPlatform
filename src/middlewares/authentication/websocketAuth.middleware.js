import { verify } from 'jsonwebtoken';
import { JWT_SECRET } from '../../config/security.config.js';

const wsAuthMiddleware = (socket, next) => {
  const token = socket.handshake.query.token;

  if (!token) {
    return next(new Error('Unauthorized: No token provided'));
  }

  try {
    const decoded = verify(token, JWT_SECRET);
    socket.user = decoded;
    next();
  } catch (err) {
    next(new Error('Unauthorized: Invalid token'));
  }
};

export default wsAuthMiddleware;
