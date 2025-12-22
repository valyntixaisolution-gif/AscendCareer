import emailConfig from '../config/email.config';
import config from '../config/env.config';
import APIError from './api-error.lib';
import logger from './logger.lib';

async function sendVerificationEmail(to, subject, html) {
  try {
    const message = await emailConfig.sendAsync({
      from: config.EMAIL_USER,
      to,
      subject,
      attachment: [
        { data: html, alternative: true, 'content-type': 'text/html' },
      ],
    });
    logger.info('Verification email sent successfully', {
      label: 'SendEmailLib',
      to,
      message,
    });

    return message;
  } catch (error) {
    logger.error('Error sending verification email', {
      label: 'SendEmailLib',
      error,
    });
    throw new APIError(500, 'Failed to send verification email', {
      type: 'EmailError',
      details: [
        { field: 'email', message: 'Failed to send verification email' },
      ],
    });
  } finally {
    emailConfig.smtp.close();
  }
}

export default sendVerificationEmail;
