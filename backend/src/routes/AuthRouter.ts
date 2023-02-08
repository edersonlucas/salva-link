import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import LoginValidationMiddleware from '../middlewares/LoginValidationMiddleware';
import RegisterValidationMiddleware from '../middlewares/RegisterValidationMiddleware';

const authRouter = Router();

authRouter
  .post(
    '/login',
    LoginValidationMiddleware.validate,
    new AuthController().login,
  )
  .post(
    '/register',
    RegisterValidationMiddleware.validate,
    new AuthController().register,
  );

export default authRouter;
