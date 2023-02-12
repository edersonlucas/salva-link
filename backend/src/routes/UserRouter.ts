import { Router } from 'express';
import UserController from '../controllers/UserController';
import AuthMiddleware from '../middlewares/AuthMiddleware';
import PasswordUpdateValidationMiddleware from '../middlewares/PasswordUpdateValidationMiddleware';

const userRouter = Router();

userRouter
  .get('/', AuthMiddleware.auth, new UserController().getUser)
  .put(
    '/changepassword',
    AuthMiddleware.auth,
    PasswordUpdateValidationMiddleware.validate,
    new UserController().updatePassword,
  );

export default userRouter;
