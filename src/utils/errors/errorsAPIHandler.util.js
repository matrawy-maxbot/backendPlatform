// file : errorsAPIHandler.util.js

import statusCodes from "../../config/status.config.js";
import CustomError from "../../utils/errors/errorHandler.util.js";
import { logError } from "./repositories/logError.repository.js";
import { writeError } from "./repositories/writeError.repository.js";
import logger from "../../utils/logger.util.js";

const handleError = async (options) => {
     try {
          const { status = statusCodes.INTERNAL_SERVER_ERROR, message = 'Internal Server Error', data = {}, log = true, response, req, stack } = options;
          const error = new CustomError(status, message, data, stack);
          if (log) {
               logError(error, req);
               logger.error({
                    message: error.message,
                    status: error.status,
                    stack: error.stack,
                    url: req ? req.originalUrl : null,
                    method: req ? req.method : null,
                    ip: req ? req.ip : null,
                    data: error.data,
               });
          }
          if (response) {
               await writeError(response, status, message, error, req);
               response.end();
          }
     } catch (err) {
          if (options.req) console.error(`! Error happened with this Request URL: ${options.req.originalUrl}, Method: ${options.req.method}, IP: ${options.req.ip}`);
          console.error("! Error in handleError function");
          logger.error({
               message: err.message,
               status: err.status,
               stack: err.stack,
               url: options.req ? options.req.originalUrl : null,
               method: options.req ? options.req.method : null,
               ip: options.req ? options.req.ip : null,
               data: err.data,
          });
          throw err; // Re-throw the error to handle it in the outer scope
     }
};

export { handleError };