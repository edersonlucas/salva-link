import Link from '../database/models/Link';
import ILink from '../interfaces/ILink';
import LinkDTO from '../dto/LinkDTO';
import ErrorGenerator from '../utils/ErrorGenerator';

export default class LinkService {
  private model = Link;

  private async linkAlreadyExist(link: string, userId: number): Promise<ILink> {
    const linkExist = await this.model.findOne({
      where: { userId, link },
    });
    return linkExist;
  }

  public async getAll(userId: number): Promise<ILink[]> {
    const links = await this.model.findAll({
      where: { userId },
      attributes: ['title', 'link', 'id'],
    });
    return links;
  }

  public async create(data: LinkDTO, userId: number) {
    const linkAlreadyExist = await this.linkAlreadyExist(data.link, userId);
    if (linkAlreadyExist)
      throw new ErrorGenerator(409, 'You already saved this link');
    const newLink = await this.model.create({ ...data, userId });
    return {
      title: newLink.title,
      link: newLink.link,
    };
  }

  public async update(
    data: ILink,
    id: number,
    userId: number,
  ): Promise<number> {
    const [updated] = await this.model.update(
      { ...data },
      { where: { id, userId } },
    );
    return updated;
  }

  public async remove(id: number, userId: number): Promise<number> {
    const removed = await this.model.destroy({ where: { id, userId } });
    return removed;
  }
}
