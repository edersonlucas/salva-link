import User from '../database/models/User';
import ErrorGenerator from '../utils/ErrorGenerator';
import Auth from '../utils/Auth';
import Cryptography from '../utils/Cryptography';
import LoginDTO from '../dto/LoginDTO';
import RegisterDTO from '../dto/RegisterDTO';

export default class AuthService {
  private model = User;

  private async getUserByEmail(email: string) {
    const user = await this.model.findOne({
      where: {
        email,
      },
      raw: true,
    });
    return user;
  }

  public async login(data: LoginDTO): Promise<string> {
    const { email, password } = data;
    const user = await this.getUserByEmail(email);
    if (!user) throw new ErrorGenerator(401, 'Incorrect email or password');
    const isValidPassword = Cryptography.validate(password, user.password);
    if (isValidPassword) {
      const payload = {
        sub: user.id,
        username: user.username,
        email: user.email,
      };
      const token = new Auth().Authentication(payload);
      return token;
    }
    throw new ErrorGenerator(401, 'Incorrect email or password');
  }

  public async register(data: RegisterDTO): Promise<string> {
    const { username, email, password } = data;
    const emailAlreadyExist = await this.getUserByEmail(email);
    if (emailAlreadyExist)
      throw new ErrorGenerator(409, 'This email is already registered.');
    const passwordHash = Cryptography.generate(password);
    const user = await this.model.create({
      username,
      email,
      password: passwordHash,
    });
    const payload = {
      sub: user.id,
      username: user.username,
      email: user.email,
    };
    const token = new Auth().Authentication(payload);
    return token;
  }
}
