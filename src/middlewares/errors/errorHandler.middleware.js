// file : errorHandler.middleware.js

import { NODE_ENV } from '../../config/server.config.js';
import { handleError } from '../../utils/errors/errorsAPIHandler.util.js';
import status from '../../config/status.config.js';

const errorHandlerMiddleware = async (err, req, res) => {
    const statusCode = err.status || (res.statusCode >= status.BAD_REQUEST ? res.statusCode : status.INTERNAL_SERVER_ERROR);
    const message = NODE_ENV === 'production' ? 'Something went wrong' : err.message;
    const stack = NODE_ENV === 'production' ? null : err.stack;
    
    await handleError({ status: statusCode, message, response: res, req, stack });
};
  
export default errorHandlerMiddleware;