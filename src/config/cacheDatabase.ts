import Redis from "ioredis";
import { APIError } from "@/utils/APIError";
import { appLogger } from "./winstonLogger";
import appConfig from "@/constants/appConfig";

/**
 * Клиент для работы с Redis
 */
export class RedisClient {
  static instance: Redis;

  static getInstance(): Redis | null {
    if (!appConfig.ENABLED_MODULES.includes("redis")) {
      return null;
    }

    if (RedisClient.instance) return RedisClient.instance;

    if (!appConfig.REDIS_URL) {
      throw new APIError(500, { msg: "system.NO_REDIS_URL" });
    }

    appLogger.info("Подключение к кэширующей базе данных...");

    RedisClient.instance = new Redis(appConfig.REDIS_URL);

    RedisClient.instance.on("ready", () => {
      appLogger.verbose("Соединение с кэширующей базой данных установлено");
    });

    RedisClient.instance.on("reconnecting", () => {
      appLogger.verbose("Переподключение к кэширующей базе данных...");
    });

    RedisClient.instance.on("error", (err) => {
      console.error(err);

      appLogger.fatal(
        "Не удалось установить соединение с кэширующей базой данных"
      );
    });

    return RedisClient.instance;
  }
}
