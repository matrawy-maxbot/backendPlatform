import logger from '../utils/logger.util.js';

export const requestLogger = (req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
};