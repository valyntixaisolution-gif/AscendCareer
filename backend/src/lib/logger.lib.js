import fs from 'node:fs';
import path from 'node:path';
import chalk from 'chalk';
import winston from 'winston';
import config from '../config/env.config';

const transports = [];
const { combine, printf, timestamp } = winston.format;

const logDir = path.join(process.cwd(), config.LOG_DIR);
if (config.NODE_ENV == 'production' && !fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const customFormat = combine(
  timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  printf(({ timestamp, level, message, label, ...meta }) => {
    const labelStr = label ? `${label}` : '';

    const metaStr = Object.keys(meta).length
      ? `\n${JSON.stringify(meta, null, 2)}`
      : '';

    switch (level) {
      // Different colors for different log levels
      case 'info':
        return `🟢 ${chalk.gray(timestamp)} [${chalk.green(
          level.toUpperCase()
        )}] [${chalk.cyanBright('APP')}: ${chalk.green(
          labelStr
        )}]: ${chalk.greenBright(message)} ${chalk.greenBright(metaStr)}`;
      case 'error':
        return `🔴 ${chalk.gray(timestamp)} [${chalk.red(
          level.toUpperCase()
        )}] [${chalk.cyanBright('APP')}: ${chalk.red(
          labelStr
        )}]: ${chalk.redBright(message)} ${chalk.redBright(metaStr)}`;
      case 'warn':
        return `🟡 ${chalk.gray(timestamp)} [${chalk.yellow(
          level.toUpperCase()
        )}] [${chalk.cyanBright('APP')}: ${chalk.yellow(
          labelStr
        )}]: ${chalk.yellowBright(message)} ${chalk.yellowBright(metaStr)}`;
      default:
        return `${chalk.gray(timestamp)} [${chalk.green(
          level.toUpperCase()
        )}] [${chalk.cyanBright('APP')}: ${chalk.green(
          labelStr
        )}]: ${chalk.greenBright(message)} ${chalk.greenBright(metaStr)}`;
    }
  })
);

if (config.NODE_ENV !== 'production' && config.NODE_ENV !== 'test') {
  transports.push(
    new winston.transports.Console({
      format: customFormat,
      level: config.LOG_LEVEL,
    })
  );
} else {
  transports.push(
    new winston.transports.File({
      filename: path.join(logDir, 'app.log'),
      level: 'info',
    })
  );

  transports.push(
    new winston.transports.File({
      filename: path.join(logDir, 'errors.log'),
      level: 'error',
    })
  );

  transports.push(
    new winston.transports.File({
      filename: path.join(logDir, 'combined.log'),
    })
  );
}

const logger = winston.createLogger({
  level: config.LOG_LEVEL,
  format: customFormat,
  transports,
  silent: config.NODE_ENV === 'test',
});

export default logger;
