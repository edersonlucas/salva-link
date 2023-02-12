import Joi from 'joi';

const registerSchema = Joi.object({
  username: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(3).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(3).required(),
});

const linkSchema = Joi.object({
  title: Joi.string().min(3).required(),
  link: Joi.string().min(5).required(),
});

const passwordUpdateSchema = Joi.object({
  password: Joi.string().min(3).required(),
});

export { registerSchema, loginSchema, linkSchema, passwordUpdateSchema };
