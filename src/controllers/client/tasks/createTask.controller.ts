import { AppFastifyRoute } from "@types";
import { createTaskHandler } from "@handlers/client";
import { createTaskSchema, CreateTaskType } from "@schemas/client";

/**
 * Создание новой задачи
 */
export const createTaskController: AppFastifyRoute<CreateTaskType> = {
  url: "/tasks",
  method: "POST",
  schema: createTaskSchema,
  handler: createTaskHandler,
};
