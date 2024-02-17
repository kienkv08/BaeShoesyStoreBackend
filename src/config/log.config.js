import path from 'path';
import winston from 'winston';
import 'winston-daily-rotate-file';

class _LogHelper {
  constructor() {
    this.consoleLogger = winston.createLogger({
      level: 'info',
      format: this.getLogFormatConfig(),
      transports: [getConsoleTransport()],
    });
    this.fileLogger = winston.createLogger({
      level: 'info',
      format: this.getLogFormatConfig(),
      transports: [getDailyRotateFileTransport('error'), getConsoleTransport()],
    });
  }

  logAppErrorRequest(req) {
    return (baCode, message) => {
      this.fileLogger.error(`${baCode} | ${message}`, { req });
    };
  }

  logErrorRequest(req) {
    return (message) => {
      this.fileLogger.error(message, { req });
    };
  }

  logErrorFile(message, ...extras) {
    const logStr = [message, ...extras].join(' ');
    this.fileLogger.error(`${logStr}`);
  }

  logInfo(message, ...extras) {
    const logStr = [message, ...extras].join(' ');
    this.consoleLogger.info(`${logStr}`);
  }

  logError(message, ...extras) {
    const logStr = [message, ...extras].join(' ');
    this.consoleLogger.error(`${logStr}`);
  }

  getLogFormatConfig() {
    return winston.format.combine(
      winston.format.timestamp(),
      winston.format.metadata({
        fillExcept: ['timestamp', 'service', 'level', 'message'],
      }),
      this.getLogFormat(),
    );
  }

  getLogFormat() {
    return winston.format.printf(({ timestamp, level, message, metadata }) => {
      let logStr = `${timestamp} | ${level.toUpperCase()}`;
      logStr += ` : ${message}`;

      const { req } = metadata;
      if (req) {
        const { method, originalUrl, headers, params, query, body } = req;
        logStr += `\n  ${method}:${originalUrl}`;
        logStr += `\n    Header: ${JSON.stringify(headers)}`;
        logStr += `\n    Params: ${JSON.stringify(params)}`;
        logStr += `\n    Query: ${JSON.stringify(query)}`;
        logStr += `\n    Body: ${JSON.stringify(body)}`;
      }

      return logStr;
    });
  }
}

function getDailyRotateFileTransport(level) {
  return new winston.transports.DailyRotateFile({
    level,
    filename: '%DATE%.log',
    dirname: path.join('logs', level),
    datePattern: 'YYYY-MM-DD',
  });
}

function getConsoleTransport() {
  return new winston.transports.Console();
}

const LogService = new _LogHelper();
export default LogService;
