import { ValidationError } from 'joi';
import { registerSchema, loginSchema } from './schemas';
import ErrorGenerator from '../../utils/ErrorGenerator';
import LoginDTO from '../../dto/LoginDTO';
import RegisterDTO from '../../dto/RegisterDTO';

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

export { validateRegister, validateLogin };
