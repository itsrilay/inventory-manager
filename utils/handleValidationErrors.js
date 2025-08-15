const { validationResult } = require('express-validator');

const handleValidationErrors = (view, getViewData) => {
  return (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render(view, {
        errors: errors.array(),
        ...getViewData(req),
      });
    }
    next();
  };
};

module.exports = handleValidationErrors;
