import { NextFunction, Request, Response } from 'express';
import IBlog from '../interfaces/IBlog';
import BlogService from '../services/BlogService';

export default class BlogController {
  private service: BlogService;

  constructor(public blog: IBlog) {
    this.service = new BlogService(blog);
    this.get = this.get.bind(this);
  }

  public async get(_req: Request, res: Response, next: NextFunction) {
    try {
      const links = await this.service.get();
      return res.status(200).json(links);
    } catch (err) {
      return next(err);
    }
  }
}
