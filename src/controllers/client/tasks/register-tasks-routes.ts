import {
  getTaskRoute,
  getTasksRoute,
  editTaskRoute,
  createTaskRoute,
  deleteTaskRoute,
  replaceTasksRoute,
} from "./routes";
import { AppFastifyInstance } from "@types";

/**
 * Регистрация маршрутов для задач
 */
export const registerTasksRoutes = (fastify: AppFastifyInstance): void => {
  fastify.route(getTasksRoute);
  fastify.route(createTaskRoute);
  fastify.route(replaceTasksRoute);
  fastify.route(getTaskRoute);
  fastify.route(editTaskRoute);
  fastify.route(deleteTaskRoute);
};
