import { ValidationError } from 'joi';
import {
  registerSchema,
  loginSchema,
  linkSchema,
  passwordUpdateSchema,
} from './schemas';
import ErrorGenerator from '../../utils/ErrorGenerator';
import LoginDTO from '../../dto/LoginDTO';
import RegisterDTO from '../../dto/RegisterDTO';
import LinkDTO from '../../dto/LinkDTO';

const returnError = (error: ValidationError) => {
  if (error) {
    if (error.message.includes('is required'))
      throw new ErrorGenerator(400, error.message);
    throw new ErrorGenerator(422, error.message);
  }
};

const validateLogin = (data: LoginDTO): void => {
  const { error } = loginSchema.validate(data);
  returnError(error);
};

const validateRegister = (data: RegisterDTO): void => {
  const { error } = registerSchema.validate(data);
  returnError(error);
};

const validateLink = (data: LinkDTO): void => {
  const { error } = linkSchema.validate(data);
  returnError(error);
};

const validateUpdatePassword = (password: string): void => {
  const { error } = passwordUpdateSchema.validate(password);
  returnError(error);
};

export {
  validateRegister,
  validateLogin,
  validateLink,
  validateUpdatePassword,
};
