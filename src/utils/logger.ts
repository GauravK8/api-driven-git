import path from 'path';
import * as winston from 'winston';
const { createLogger, format, transports } = winston;

const logFormat = format.printf((info) => `${info.timestamp} ${info.level} [${info.label}]: ${info.message}`);

const logger = createLogger({
  format: format.combine(
    format.splat(),
    format.label({ label: path.basename(process.mainModule.filename) }),
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.metadata({ fillExcept: ['message', 'level', 'timestamp', 'label'] })
  ),
  level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
  transports: [
    new transports.Console({
      format: format.combine(format.colorize(), logFormat),
    }),
  ],
});

export default logger;
