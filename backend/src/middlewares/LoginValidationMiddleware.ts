import { Request, Response, NextFunction } from 'express';
import { validateLogin } from './validations/validateInputValues';

export default class LoginValidationMiddleware {
  public static login(req: Request, _res: Response, next: NextFunction) {
    validateLogin(req.body);
    next();
  }
}
