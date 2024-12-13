import { AppFastifyRoute } from "@types";
import { getTasksHandler } from "@handlers/client";
import { getTasksSchema, GetTasksType } from "@schemas/client";

/**
 * Получение всех задач
 */
export const getTasksController: AppFastifyRoute<GetTasksType> = {
  url: "/tasks",
  method: "GET",
  schema: getTasksSchema,
  handler: getTasksHandler,
};
