import { NextFunction, Request, Response } from 'express';
import BlogService from '../services/BlogService';

export default class BlogController {
  private service: BlogService;

  constructor() {
    this.service = new BlogService();
    this.getAll = this.getAll.bind(this);
    this.getBlogLinks = this.getBlogLinks.bind(this);
  }

  public async getAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const blogs = await this.service.getAll();
      return res.status(200).json(blogs);
    } catch (err) {
      return next(err);
    }
  }

  public async getBlogLinks(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = req.params;
      const links = await this.service.getBlogLinks(name);
      return res.status(200).json(links);
    } catch (err) {
      return next(err);
    }
  }
}
