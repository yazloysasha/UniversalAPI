import "dotenv/config";
import { FastifyRoutes, IAppConfig, Module } from "@types";

/**
 * Парсинг .env в проектную конфигурацию
 */
export const parseConfig = (): IAppConfig => {
  const {
    ENV,
    ENABLED_MODULES,
    ENABLED_FASTIFY_ROUTES,
    ENABLED_QUEUE_TASKS,
    BCRYPT_ROUNDS_COUNT,
    JWT_SECRET_KEY,
    POSTGRESQL_URL,
    MONGODB_URL,
    REDIS_URL,
  } = process.env;

  const enabledFastifyRoutes: IAppConfig["ENABLED_FASTIFY_ROUTES"] = {};

  if (ENABLED_FASTIFY_ROUTES) {
    ENABLED_FASTIFY_ROUTES.split(",").forEach((group) => {
      const [name, port] = group.split(":");

      enabledFastifyRoutes[name as FastifyRoutes] = Number(port);
    });
  }

  return {
    ENV: ENV as "development" | "production",
    ENABLED_MODULES: ENABLED_MODULES
      ? (ENABLED_MODULES.split(",") as Module[])
      : [],
    ENABLED_FASTIFY_ROUTES: enabledFastifyRoutes,
    ENABLED_QUEUE_TASKS: ENABLED_QUEUE_TASKS
      ? ENABLED_QUEUE_TASKS.split(",")
      : [],
    BCRYPT_ROUNDS_COUNT: BCRYPT_ROUNDS_COUNT ? Number(BCRYPT_ROUNDS_COUNT) : 8,
    JWT_SECRET_KEY,
    POSTGRESQL_URL,
    MONGODB_URL,
    REDIS_URL,
  };
};
