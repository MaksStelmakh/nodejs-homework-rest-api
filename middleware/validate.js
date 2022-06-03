const createError = require("../errors");

const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(createError(400, "Missing required name field"));
    }
    next();
  };
};

module.exports = {
  validate,
};
