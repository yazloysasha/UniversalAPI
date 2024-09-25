import { AppFastifyRoute } from "@types";
import { getTasksHandler } from "../handlers";
import { getTasksSchema, GetTasksType } from "../schemas";

/**
 * Получение всех задач
 */
export const getTasksRoute: AppFastifyRoute<GetTasksType> = {
  url: "/tasks",
  method: "GET",
  schema: getTasksSchema,
  handler: getTasksHandler,
};
