import { Router } from 'express';
import LinkController from '../controllers/LinkController';
import AuthMiddleware from '../middlewares/AuthMiddleware';
import LinkValidationMiddleware from '../middlewares/LinkValidationMiddleware';

const linkRouter = Router();

linkRouter
  .get('/', AuthMiddleware.auth, new LinkController().getAll)

export default linkRouter;
