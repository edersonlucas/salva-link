import { NextFunction, Response } from 'express';
import ErrorGenerator from '../utils/ErrorGenerator';
import UserService from '../services/UserService';
import IRequestUser from '../interfaces/IRequestUser';

export default class UserController {
  private service: UserService;

  constructor() {
    this.service = new UserService();
    this.updatePassword = this.updatePassword.bind(this);
    this.getUser = this.getUser.bind(this);
  }

  public async getUser(req: IRequestUser, res: Response, next: NextFunction) {
    try {
      const userId = req.user.sub;
      const user = await this.service.getUser(Number(userId));
      return res.status(200).json(user);
    } catch (err) {
      return next(err);
    }
  }

  public async updatePassword(
    req: IRequestUser,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const userId = req.user.sub;
      const { password } = req.body;
      const updated = await this.service.updatePassword(
        password,
        Number(userId),
      );
      if (updated) return res.status(204).json();
      throw new ErrorGenerator(400, 'Failed to update password');
    } catch (err) {
      return next(err);
    }
  }
}
