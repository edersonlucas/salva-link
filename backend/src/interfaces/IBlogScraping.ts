import ILink from './ILink';

export default interface IBlogScraping {
  get(): Promise<ILink[]>;
}
