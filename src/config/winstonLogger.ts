import chalk from "chalk";
import { locale } from "moment";
import { format, transports, createLogger, Logger } from "winston";

locale("ru");

export const commonFormat = format.combine(
  format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  format.colorize({ all: true }),
  format.printf((info) => `⏱️  [${info.timestamp}] ${info.message}`)
);

export class AppLogger {
  private logger: Logger;

  private constructor() {
    this.logger = createLogger({
      transports: [
        new transports.Console({
          level: "verbose",
          format: commonFormat,
        }),
      ],
    });
  }

  static instance: AppLogger;

  static getInstance(): AppLogger {
    if (!AppLogger.instance) {
      AppLogger.instance = AppLogger.createLogger();
    }

    return AppLogger.instance;
  }

  static createLogger(): AppLogger {
    return new AppLogger();
  }

  info(message: string): void {
    this.logger.info(message);
  }

  verbose(message: string): void {
    this.logger.verbose(chalk.cyanBright(message));
  }

  fatal(message: string): void {
    this.logger.error(chalk.bgRedBright("FATAL:", message));
  }

  error(message: string): void {
    this.logger.error(message);
  }

  warn(message: string): void {
    this.logger.warn(message);
  }

  debug(message: string): void {
    this.logger.debug(message);
  }
}

/**
 * Лог приложения
 */
export const appLogger = AppLogger.getInstance();
