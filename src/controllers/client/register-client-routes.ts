import { AppFastifyInstance } from "@types";
import { registerTasksRoutes } from "./tasks";

/**
 * Регистрация маршрутов Client API
 */
export const registerClientRoutes = (fastify: AppFastifyInstance): void => {
  registerTasksRoutes(fastify);
};
