import { sign, verify } from 'jsonwebtoken';
import UserJWTPayloadDTO from '../dto/UserJWTPayloadDTO';
import 'dotenv/config';
import ErrorGenerator from './ErrorGenerator';

export default class Auth {
  private secretJwt: string;

  constructor() {
    this.secretJwt = process.env.JWT_SECRET;
  }

  public authentication(payload: UserJWTPayloadDTO): string {
    const token = sign(payload, this.secretJwt, { expiresIn: '1d' });
    return token;
  }

  public authorization(token: string) {
    try {
      const payload = verify(token, this.secretJwt);
      return payload;
    } catch (err) {
      throw new ErrorGenerator(400, 'Invalid token');
    }
  }
}
