const notFoundMiddleware = (req, res, next) => {
    res.status(404);
    next(new Error(`404 Not Found - ${req.originalUrl}`));
  };
  
  export default notFoundMiddleware;
  