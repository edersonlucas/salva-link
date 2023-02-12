import IBlog from '../interfaces/IBlog';
import IBlogScraping from '../interfaces/IBlogScraping';
import ILink from '../interfaces/ILink';
import scraping from '../scraping';
import ErrorGenerator from '../utils/ErrorGenerator';
import Blog from '../database/models/Blog';

export default class BlogService {
  private model = Blog;

  public async getAll(): Promise<IBlog[]> {
    const blogs = await this.model.findAll();
    return blogs;
  }

  public async getBlogLinks(name: string): Promise<ILink[]> {
    const blog: IBlogScraping = scraping[name?.toLocaleLowerCase()];
    if (!blog) throw new ErrorGenerator(404, 'Blog not found.');
    const links = await blog.get();
    return links;
  }
}
