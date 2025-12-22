import { isUserExiistByEmail } from '../repositories/auth.repository';
import logger from '../lib/logger.lib';
import APIError from '../lib/api-error.lib';
import {
  generateVerificationToken,
  generateVerificationExpiry,
  verifyTokenUrl,
  verificationEmailTemplate,
} from '../utils/index.util';
import { createUser } from '../repositories/auth.repository';
import sendVerificationEmail from '../lib/send-email.lib';

export const registerService = async (
  fullName,
  email,
  password,
  confirmPassword
) => {
  const { firstName, lastName } = fullName;

  if (password !== confirmPassword) {
    logger.error('Passwords do not match', {
      label: 'RegisterService',
      email,
    });
    return new APIError(400, 'Passwords do not match', {
      type: 'ValidationError',
      details: [
        { field: 'confirmPassword', message: 'Passwords do not match' },
      ],
    });
  }

  const isUserExist = await isUserExiistByEmail(email);

  if (isUserExist) {
    logger.error('User already exists with email: ', {
      label: 'RegisterService',
      email,
    });
    return new APIError(400, 'User already exists with this email', {
      type: 'ValidationError',
      details: [
        { field: 'email', message: 'User already exists with this email' },
      ],
    });
  }

  const verificationToken = generateVerificationToken();
  const verificationTokenExpiry = generateVerificationExpiry();

  const newUser = await createUser({
    firstName,
    lastName,
    email,
    password,
    emailVerificationToken: verificationToken,
    emailVerificationTokenExpiry: verificationTokenExpiry,
  });

  const token = verifyTokenUrl(verificationToken);

  await sendVerificationEmail(
    email,
    'Verify your email address',
    verificationEmailTemplate(`${firstName} ${lastName}`, token)
  );

  return newUser;
};
