// file : errorHandler.util.js

class CustomError extends Error {
     constructor(status, message, data, stack) {
          super(message);
          this.status = status;
          this.data = typeof data === 'object' ? data : {};
          this.name = this.constructor.name;
          if (!stack) {
               Error.captureStackTrace(this, this.constructor);
          } else {
               this.stack = stack;
          }
     }
}
export default CustomError;