import User from '../database/models/User';
import IUser from '../interfaces/IUser';
import Cryptography from '../utils/Cryptography';
import ErrorGenerator from '../utils/ErrorGenerator';

export default class UserService {
  private model = User;

  private async getUserById(id: number) {
    const user = await this.model.findOne({
      where: {
        id,
      },
      raw: true,
    });
    return user;
  }

  public async getUser(id: number): Promise<IUser> {
    const { username, email } = await this.getUserById(id);
    return {
      username,
      email,
    };
  }

  public async updatePassword(password: string, id: number): Promise<number> {
    const user = await this.getUserById(id);
    const IsPasswordSameAsAbove = Cryptography.validate(
      password,
      user.password,
    );
    if (IsPasswordSameAsAbove) {
      throw new ErrorGenerator(
        409,
        'The password cannot be the same as the previous one',
      );
    }
    const passwordHash = Cryptography.generate(password);
    const [updated] = await this.model.update(
      { password: passwordHash },
      { where: { id } },
    );
    return updated;
  }
}
