import { Router } from 'express';
import LinkController from '../controllers/LinkController';
import AuthMiddleware from '../middlewares/AuthMiddleware';
import LinkValidationMiddleware from '../middlewares/LinkValidationMiddleware';

const linkRouter = Router();

linkRouter
  .get('/', AuthMiddleware.auth, new LinkController().getAll)
  .post(
    '/',
    AuthMiddleware.auth,
    LinkValidationMiddleware.validate,
    new LinkController().create,
  )
  .put(
    '/:id',
    AuthMiddleware.auth,
    LinkValidationMiddleware.validate,
    new LinkController().update,
  )

export default linkRouter;
