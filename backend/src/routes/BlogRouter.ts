import { Router } from 'express';
import BlogController from '../controllers/BlogController';
import AuthMiddleware from '../middlewares/AuthMiddleware';
import TrybeBlogScraping from '../scraping/TrybeBlogScraping';
import DevGoBlogScraping from '../scraping/DevGoBlogScraping';
import TecnoBlogScraping from '../scraping/TecnoBlogScraping';

const blogRouter = Router();

blogRouter
  .get('/trybe', AuthMiddleware.auth, new BlogController(TrybeBlogScraping).get)
  .get('/devgo', AuthMiddleware.auth, new BlogController(DevGoBlogScraping).get)
  .get(
    '/tecnoblog',
    AuthMiddleware.auth,
    new BlogController(TecnoBlogScraping).get,
  );

export default blogRouter;
