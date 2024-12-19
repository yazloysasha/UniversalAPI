import "dotenv/config";
import { FastifyRoutes, IAppConfig, Module, TaskType } from "@types";

const {
  ENV,
  ENABLED_MODULES,
  ENABLED_FASTIFY_ROUTES,
  ENABLED_TASK_TYPES,
  ENABLED_TASKS,
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

/**
 * Главная конфигурация проекта
 */
const appConfig = {
  ENV: ENV as "development" | "production",
  ENABLED_MODULES: ENABLED_MODULES
    ? (ENABLED_MODULES.split(",") as Module[])
    : [],
  ENABLED_FASTIFY_ROUTES: enabledFastifyRoutes,
  ENABLED_TASK_TYPES: ENABLED_TASK_TYPES
    ? (ENABLED_TASK_TYPES.split(",") as TaskType[])
    : [],
  ENABLED_TASKS: ENABLED_TASKS ? ENABLED_TASKS.split(",") : [],
  BCRYPT_ROUNDS_COUNT: BCRYPT_ROUNDS_COUNT ? Number(BCRYPT_ROUNDS_COUNT) : 8,
  JWT_SECRET_KEY,
  POSTGRESQL_URL,
  MONGODB_URL,
  REDIS_URL,
};

export default appConfig;
