import { sign, verify } from 'jsonwebtoken';
import UserPayloadDTO from '../dto/UserPayloadDTO';
import 'dotenv/config';
import ErrorGenerator from './ErrorGenerator';

export default class Auth {
  private secretJwt: string;

  constructor() {
    this.secretJwt = process.env.JWT_SECRET;
  }

  public authentication(payload: UserPayloadDTO): string {
    const token = sign(payload, this.secretJwt, { expiresIn: '1d' }) as string;
    return token;
  }

  public authorization(token: string): UserPayloadDTO {
    try {
      const payload = verify(token, this.secretJwt) as UserPayloadDTO;
      return payload;
    } catch (err) {
      throw new ErrorGenerator(400, 'Invalid token');
    }
  }
}
