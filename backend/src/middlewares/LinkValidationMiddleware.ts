import { Request, Response, NextFunction } from 'express';
import { validateLink } from './validations/validateInputValues';

export default class LinkValidationMiddleware {
  public static validate(req: Request, _res: Response, next: NextFunction) {
    validateLink(req.body);
    next();
  }
}
