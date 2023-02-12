import { Router } from 'express';
import UserController from '../controllers/UserController';
import AuthMiddleware from '../middlewares/AuthMiddleware';

const userRouter = Router();

userRouter
  .get('/', AuthMiddleware.auth, new UserController().getUser);

export default userRouter;
