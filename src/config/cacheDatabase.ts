import Redis from "ioredis";
import { ApiError } from "@errors";
import appConfig from "@consts/appConfig";
import { appLogger } from "./winstonLogger";

/**
 * Client for using Redis
 */
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

    appLogger.info("Connecting to caching database...");

    RedisClient.instance = new Redis(appConfig.REDIS_URL);

    RedisClient.instance.on("ready", async () => {
      appLogger.verbose("Connection to caching database established");

      if (!appConfig.ENABLED_MODULES.includes("queue")) return;

      // TODO: Run BullMQ tasks
    });

    RedisClient.instance.on("reconnecting", async () => {
      appLogger.verbose("Reconnecting to caching database...");
    });

    RedisClient.instance.on("error", (err) => {
      console.error(err);

      appLogger.fatal("Failed to establish connection to caching database");
    });

    return RedisClient.instance;
  }
}
