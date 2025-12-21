import mongoose from 'mongoose';
import logger from '../lib/logger.lib.js';
import config from './env.config.js';

mongoose.connection.on('error', (err) => {
  logger.error('MongoDB runtime error', {
    error: err,
    label: 'DatabaseConfig',
  });
});

mongoose.connection.on('disconnected', () => {
  logger.warn('MongoDB disconnected', {
    label: 'DatabaseConfig',
  });
});

async function connectToDatabase() {
  try {
    await mongoose.connect(config.DATABASE_URL);

    logger.info('MongoDB connected successfully', {
      label: 'DatabaseConfig',
    });
  } catch (error) {
    logger.error('MongoDB initial connection failed', {
      error,
      label: 'DatabaseConfig',
    });

    process.exit(1);
  }
}

export default connectToDatabase;
