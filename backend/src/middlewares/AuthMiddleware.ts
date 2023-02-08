import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import ErrorGenerator from '../utils/ErrorGenerator';
import Auth from '../utils/Auth';

interface RequestAuth extends Request {
  user?: JwtPayload | string;
}

export default class AuthMiddleware {
  public static auth(req: RequestAuth, _res: Response, next: NextFunction) {
    let token = req.headers.authorization;
    if (!token) throw new ErrorGenerator(401, 'Token not found');

    if (token.includes('Bearer ')) {
      token = token.replace('Bearer ', '');
    }

    try {
      const user = new Auth().Authorization(token);
      req.user = user;
      next();
    } catch (_err) {
      throw new ErrorGenerator(401, 'Token must be a valid token');
    }
  }
}
