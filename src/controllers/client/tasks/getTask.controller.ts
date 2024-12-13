import { AppFastifyRoute } from "@types";
import { getTaskHandler } from "@handlers/client";
import { getTaskSchema, GetTaskType } from "@schemas/client";

/**
 * Получение одной задачи
 */
export const getTaskController: AppFastifyRoute<GetTaskType> = {
  url: "/tasks/:taskId",
  method: "GET",
  schema: getTaskSchema,
  handler: getTaskHandler,
};
