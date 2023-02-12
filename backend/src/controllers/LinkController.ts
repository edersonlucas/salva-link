import { NextFunction, Response } from 'express';
import LinkService from '../services/LinkService';
import ErrorGenerator from '../utils/ErrorGenerator';
import IRequestUser from '../interfaces/IRequestUser';

export default class LinkController {
  private service: LinkService;

  constructor() {
    this.service = new LinkService();
    this.getAll = this.getAll.bind(this);
    this.update = this.update.bind(this);
    this.create = this.create.bind(this);
    this.remove = this.remove.bind(this);
  }

  public async getAll(req: IRequestUser, res: Response, next: NextFunction) {
    try {
      const userId = req.user.sub;
      const links = await this.service.getAll(userId);
      return res.status(200).json(links);
    } catch (err) {
      return next(err);
    }
  }

  public async create(req: IRequestUser, res: Response, next: NextFunction) {
    try {
      const userId = req.user.sub;
      const newLink = await this.service.create({ ...req.body }, userId);
      return res.status(201).json(newLink);
    } catch (err) {
      return next(err);
    }
  }

  public async update(req: IRequestUser, res: Response, next: NextFunction) {
    try {
      const userId = req.user.sub;
      const { id } = req.params;
      const updated = await this.service.update(
        { ...req.body },
        Number(id),
        userId,
      );
      if (updated) return res.status(204).json();
      throw new ErrorGenerator(400, 'Failed to update link');
    } catch (err) {
      return next(err);
    }
  }

  public async remove(req: IRequestUser, res: Response, next: NextFunction) {
    try {
      const userId = req.user.sub;
      const { id } = req.params;
      const removed = await this.service.remove(Number(id), userId);
      if (removed) return res.status(204).json();
      throw new ErrorGenerator(400, 'Failed to remove link');
    } catch (err) {
      return next(err);
    }
  }
}
