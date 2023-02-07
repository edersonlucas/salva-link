import ILink from './ILink';

export default interface IBlog {
  get(): Promise<ILink[]>;
}
