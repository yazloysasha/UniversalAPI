import { FastifyRoutes } from "./fastify.types";

export enum CustomFormat {
  MONGOOSE_ID = "objectId",
  UUID = "uuid",
}

export type Module = "fastify" | "analytics" | "redis" | "queue";

export interface IAppConfig {
  ENV: "development" | "production";
  ENABLED_MODULES: Module[];
  ENABLED_FASTIFY_ROUTES: { [x in FastifyRoutes]?: number };
  ENABLED_QUEUE_TASKS: string[];
  POSTGRESQL_URL?: string;
  MONGODB_URL?: string;
  REDIS_URL?: string;
}

export interface IPagination {
  skip: number;
  limit: number;
}
