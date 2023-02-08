import { Router } from 'express';
import BlogController from '../controllers/BlogController';
import AuthMiddleware from '../middlewares/AuthMiddleware';
import TrybeBlogScraping from '../scraping/TrybeBlogScraping';

const blogRouter = Router();

blogRouter
  .get('/trybe', AuthMiddleware.auth, new BlogController(TrybeBlogScraping).get)
export default blogRouter;
