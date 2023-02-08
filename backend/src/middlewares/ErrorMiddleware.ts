import { Request, Response, NextFunction } from 'express';
import IError from '../interfaces/IError';

export default class ErrorMiddleware {
  public static error(
    err: IError,
    _req: Request,
    res: Response,
    _next: NextFunction,
  ) {
    const { code, message } = err;
    if (code) return res.status(code).json({ message });
    return res.status(500).json({ message: 'Internal Server Error!' });
  }
}
