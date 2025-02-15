import status from '../../config/status.config.js';

const call = (callback, ...args) => {
     return async (req, res, next) => {
          try {
               await callback(req, res, next, ...args);
          } catch (error) {
               res.status(res.statusCode >= status.BAD_REQUEST ? res.statusCode : status.INTERNAL_SERVER_ERROR);
               next(new Error(error));
          }
     };
};
export { call };