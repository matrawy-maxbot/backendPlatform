const validationMiddleware = (schema) => (req, res, next) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false });
  
    if (error) {
        res.status(400);
        return next(new Error(error.details.map((err) => err.message).join(', ')));
    }

    if(!req.value) req.value = {};
    req.value.body = value;
  
    next();
  };
  
  export default validationMiddleware;
  