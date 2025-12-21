import app from './app.js';
import connectToDatabase from './config/db.config.js';
import logger from './lib/logger.lib.js';

const PORT = 3000;

async function startServer() {
  try {
    await connectToDatabase();

    app.listen(PORT, () => {
      logger.info(`Server is running at http://localhost:${PORT}`, {
        label: 'Server',
      });
    });
  } catch (error) {
    logger.error('Failed to start server', {
      error,
      label: 'Server',
    });

    process.exit(1);
  }
}

await startServer();
