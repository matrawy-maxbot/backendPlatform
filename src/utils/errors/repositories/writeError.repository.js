// file : writeError.repository.js

export const writeError = (response, status, message, error) => {
     return new Promise((resolve, reject) => {
          try {
               const messageBody = {
                    success: false,
                    error: { message, stack: process.env.NODE_ENV === 'development' ? error.stack : null }
               };

               response.status(status).write(JSON.stringify(messageBody)); // write a response to the client
               resolve();
          } catch (err) {
               console.error("Error in writeError function: ", err);
               reject(err);
          }
     });
};