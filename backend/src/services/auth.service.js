import { isUserExistByEmail } from '../repositories/auth.repository.js';
import logger from '../lib/logger.lib.js';
import APIError from '../lib/api-error.lib.js';
import {
  generateVerificationToken,
  generateVerificationExpiry,
  verifyTokenUrl,
  verificationEmailTemplate,
} from '../utils/index.util.js';
import {
  createUser,
  findUserByEmail,
  deleteRefreshToken,
  findEmailWithTokenAndExpiryDate,
} from '../repositories/auth.repository.js';
import sendVerificationEmail from '../lib/send-email.lib.js';
import jwtLib from '../lib/jwt.lib.js';

export async function registerService(bodyData) {
  const { fullName, email, password, confirmPassword } = bodyData;
  const { firstName, lastName } = fullName;

  if (password !== confirmPassword) {
    logger.error('Passwords do not match', {
      label: 'RegisterService',
      email,
    });
    throw new APIError(400, 'Passwords do not match', {
      type: 'ValidationError',
      details: [
        { field: 'confirmPassword', message: 'Passwords do not match' },
      ],
    });
  }

  const isUserExist = await isUserExistByEmail(email);

  if (isUserExist) {
    logger.error('User already exists with email: ', {
      label: 'RegisterService',
      email,
    });
    throw new APIError(400, 'User already exists with this email', {
      type: 'ValidationError',
      details: [
        { field: 'email', message: 'User already exists with this email' },
      ],
    });
  }

  const verificationToken = generateVerificationToken();
  const verificationTokenExpiry = generateVerificationExpiry();

  const newUser = await createUser({
    fullName: {
      firstName,
      lastName,
    },
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
}

export async function loginService(bodyData) {
  const { email, password } = bodyData;

  const user = await findUserByEmail(email);

  if (!user) {
    logger.error('Invalid email or password', {
      label: 'LoginService',
      email,
    });
    throw new APIError(401, 'Invalid email or password', {
      type: 'AuthenticationError',
    });
  }

  if (!user.isVerified) {
    logger.warn(`Unverified email login attempt for email: ${email}`, {
      label: 'AuthService',
    });

    throw new APIError(401, 'Please verify your email before logging in', {
      type: 'AuthenticationError',
      details: [
        {
          field: 'email',
          message: 'Email not verified',
        },
      ],
    });
  }

  const isPasswordValid = await user.comparePassword(password);

  if (!isPasswordValid) {
    logger.warn(`Invalid password attempt for email: ${email}`, {
      label: 'AuthService',
    });

    throw new APIError(401, 'Invalid email or password', {
      type: 'AuthenticationError',
      details: [
        {
          field: 'password',
          message: 'Incorrect password',
        },
      ],
    });
  }

  const accessToken = jwtLib.generateAccessToken({
    userId: user._id,
    role: user.role,
  });

  const refreshToken = jwtLib.generateRefreshToken({
    userId: user._id,
    role: user.role,
  });

  user.refreshToken = refreshToken;
  await user.save();

  return {
    user,
    accessToken,
    refreshToken,
  };
}

export async function logoutService(token) {
  if (!token) {
    logger.warn('No refresh token provided for logout', {
      label: 'LogoutService',
    });
    throw new APIError(400, 'No refresh token provided for logout');
  }

  const deleteToken = await deleteRefreshToken(token);

  if (!deleteToken.acknowledged) {
    logger.error('Failed to delete refresh token during logout', {
      label: 'LogoutService',
    });
    throw new APIError(500, 'Failed to logout user');
  }

  return true;
}

export async function verifyEmailService(queryData) {
  const { token } = queryData;

  const user = await findEmailWithTokenAndExpiryDate(token);

  if (!user) {
    logger.error('Invalid or expired email verification token', {
      label: 'VerifyEmailService',
    });
    throw new APIError(400, 'Invalid or expired email verification token');
  }

  user.isVerified = true;
  user.emailVerificationToken = null;
  user.emailVerificationTokenExpiry = null;

  await user.save();

  return user;
}
