import { Request, Response, NextFunction } from 'express';
import { validateRegister } from './validations/validateInputValues';

export default class RegisterValidationMiddleware {
  public static validate(req: Request, _res: Response, next: NextFunction) {
    validateRegister(req.body);
    next();
  }
}
