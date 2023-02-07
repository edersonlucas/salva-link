import { hashSync, compareSync } from 'bcryptjs';

export default class Cryptography {
  public static generate(password: string): string {
    const hash = hashSync(password, 10);
    return hash;
  }

  public static validate(password: string, userHash: string): boolean {
    const compare = compareSync(password, userHash);
    return compare;
  }
}
