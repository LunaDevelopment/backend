import { createLogger, format, transports } from 'winston';
//const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  level: 'error',
  format: format.combine(
    format.timestamp(),
    format.prettyPrint()
  ),
  transports: [
    new transports.File({ filename: 'errors.log' }),
  ],
});

export default logger;