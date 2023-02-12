import { Request, Response, NextFunction } from 'express';
import { validateUpdatePassword } from './validations/validateInputValues';

export default class PasswordUpdateValidationMiddleware {
  public static validate(req: Request, _res: Response, next: NextFunction) {
    validateUpdatePassword(req.body);
    next();
  }
}
