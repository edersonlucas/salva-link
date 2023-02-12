import { Request } from 'express';
import UserJWTPayloadDTO from '../dto/UserJWTPayloadDTO';

export default interface IRequestUser extends Request {
  user: UserJWTPayloadDTO;
}
