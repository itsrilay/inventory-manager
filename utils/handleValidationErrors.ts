import { validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

const handleValidationErrors = (view: string, getViewData: (req: Request) => object) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      if (view === 'json') {
        return res.status(400).json({
          errors: errors.array(),
          ...getViewData(req),
        });
      }
      return res.status(400).render(view, {
        errors: errors.array(),
        ...getViewData(req),
      });
    }
    next();
  };
};

export default handleValidationErrors;