import { AppFastifyRoute } from "@types";
import { getTaskHandler } from "../handlers";
import { getTaskSchema, GetTaskType } from "../schemas";

/**
 * Получение одной задачи
 */
export const getTaskRoute: AppFastifyRoute<GetTaskType> = {
  url: "/tasks/:taskId",
  method: "GET",
  schema: getTaskSchema,
  handler: getTaskHandler,
};
