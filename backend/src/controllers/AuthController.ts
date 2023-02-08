import { NextFunction, Request, Response } from 'express';
import AuthService from '../services/AuthService';

export default class AuthController {
  private service: AuthService;

  constructor() {
    this.service = new AuthService();
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
  }

  public async login(req: Request, res: Response, next: NextFunction) {
    try {
      const token = await this.service.login(req.body);
      return res.status(200).json({ token });
    } catch (err) {
      return next(err);
    }
  }

  public async register(req: Request, res: Response, next: NextFunction) {
    try {
      const token = await this.service.register(req.body);
      return res.status(201).json({ token });
    } catch (err) {
      return next(err);
    }
  }
}
