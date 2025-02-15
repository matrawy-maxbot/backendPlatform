// file : logError.repository.js

export const logError = (error, req) => {
     try {
          error.data = error.data || {};
          console.error("\n--------------------------------------------\n",
          `[${new Date().toISOString()}] Error status : ${error.status} - ${error.message}`,
          "\n--------------------------------------------\n");

          if (req) console.error(`Request URL: ${req.originalUrl}, Method: ${req.method}, IP: ${req.ip}`);
          if (Object.keys(error.data).length > 0) console.error('Additional Data:', JSON.stringify(error.data, null, 2), "\n");

          console.error(error.stack);
     } catch (err) {
          console.error("Error in logError function: ", err);
     }
};