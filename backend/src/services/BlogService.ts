import IBlog from '../interfaces/IBlog';
import ILink from '../interfaces/ILink';

export default class BlogService {
  constructor(private blog: IBlog) {}

  async get(): Promise<ILink[]> {
    const links = await this.blog.get();
    return links;
  }
}
