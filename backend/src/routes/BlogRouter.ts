import { Router } from 'express';
import BlogController from '../controllers/BlogController';
import AuthMiddleware from '../middlewares/AuthMiddleware';

const blogRouter = Router();

blogRouter
  .get('/', AuthMiddleware.auth, new BlogController().getAll)
  .get('/:name', AuthMiddleware.auth, new BlogController().getBlogLinks);

export default blogRouter;
