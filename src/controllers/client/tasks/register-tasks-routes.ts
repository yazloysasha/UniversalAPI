import {
  getTasksRoute,
  editTaskRoute,
  createTaskRoute,
  deleteTaskRoute,
  replaceTasksRoute,
} from "./routes";
import { AppFastifyInstance } from "@types";

/**
 * Регистрация маршрутов задач
 */
export const registerTasksRoutes = (fastify: AppFastifyInstance): void => {
  fastify.route(getTasksRoute);
  fastify.route(createTaskRoute);
  fastify.route(replaceTasksRoute);
  fastify.route(editTaskRoute);
  fastify.route(deleteTaskRoute);
};
