import Redis from "ioredis";
import { ApiError } from "@errors";
import appConfig from "@consts/appConfig";
import { appLogger } from "./winstonLogger";

export class RedisClient {
  static instance: Redis;

  static getInstance(): Redis | null {
    if (!appConfig.ENABLED_MODULES.includes("redis")) {
      return null;
    }

    if (RedisClient.instance) return RedisClient.instance;

    if (!appConfig.REDIS_URL) {
      throw ApiError.internalServerError({
        msg: "Не указана ссылка для подключения к кэширующей базе данных",
      });
    }

    RedisClient.instance = new Redis(appConfig.REDIS_URL);

    RedisClient.instance.on("ready", async () => {
      appLogger.verbose("Подключение к кэширующей базе данных установлено");

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
