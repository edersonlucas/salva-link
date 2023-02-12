const incorrectEmailOrPassword = { message: 'Incorrect email or password' };
const emailAlreadyRegistered = { message: 'This email is already registered.' };
const tokenInvalid = { message: 'Token must be a valid token' };
const tokenNotFound = { message: 'Token not found' };
const linkAlreadyRegistered = { message: 'You already saved this link' };
const failedUpdateLink = { message: 'Failed to update link' };
const failedRemoveLink = { message: 'Failed to remove link' };
const emailIsRequired = { message: '"email" is required' };
const emailFormatInvalid = { message: '"email" must be a valid email' };
const internalServerError = { message: 'Internal Server Error!' };
const blogNotFound = { message: 'Blog not found' };
const passwordSameAsAbove = {
  message: 'The password cannot be the same as the previous one',
};

export {
  incorrectEmailOrPassword,
  emailAlreadyRegistered,
  tokenInvalid,
  linkAlreadyRegistered,
  failedUpdateLink,
  failedRemoveLink,
  emailIsRequired,
  emailFormatInvalid,
  internalServerError,
  tokenNotFound,
  blogNotFound,
  passwordSameAsAbove,
};
