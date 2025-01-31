import { NODE_ENV } from '../../config/server.config.js';

const errorHandlerMiddleware = (err, req, res, next) => {
    const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
    const message = NODE_ENV === 'production' ? 'Something went wrong' : err.message;
    const stack = NODE_ENV === 'production' ? null : err.stack;
    const messageBody = {
        success: false,
        error: {message, stack}
    };
  
    console.error(`[Error] ${statusCode} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`, err.stack);
    
    res.status(statusCode).json(messageBody);
  };
  
  export default errorHandlerMiddleware;
  