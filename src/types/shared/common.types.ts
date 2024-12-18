import { TaskType } from "@types";
import { FastifyRoutes } from "./fastify.types";

export enum CustomFormat {
  MONGOOSE_ID = "objectId",
  UUID = "uuid",
}

export type ArgumentsType<F extends Function> = F extends (
  ...args: infer A
) => any
  ? A
  : never;

export type Module = "fastify" | "analytics" | "redis" | "queue";

export interface IAppConfig {
  ENV: "development" | "production";
  ENABLED_MODULES: Module[];
  ENABLED_FASTIFY_ROUTES: { [x in FastifyRoutes]?: number };
  ENABLED_TASK_TYPES: TaskType[];
  ENABLED_TASKS: string[];
  BCRYPT_ROUNDS_COUNT: number;
  JWT_SECRET_KEY?: string;
  POSTGRESQL_URL?: string;
  MONGODB_URL?: string;
  REDIS_URL?: string;
}

export interface IPagination {
  skip: number;
  limit: number;
}
