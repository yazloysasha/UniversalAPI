import Redis from "ioredis";
import { ApiError } from "@errors";
import { appLogger } from "./winstonLogger";
import appConfig from "@constants/appConfig";

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
      throw ApiError.new(500, { msg: "system.NO_REDIS_URL" });
    }

    appLogger.info("Подключение к кэширующей базе данных...");

    RedisClient.instance = new Redis(appConfig.REDIS_URL);

    RedisClient.instance.on("ready", async () => {
      appLogger.verbose("Соединение с кэширующей базой данных установлено");

      if (!appConfig.ENABLED_MODULES.includes("queue")) return;

      // TODO: Запуск задач BullMQ
    });

    RedisClient.instance.on("reconnecting", async () => {
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
