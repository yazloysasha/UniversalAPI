import { AppFastifyRoute } from "@types";
import { createTaskHandler } from "../handlers";
import { createTaskSchema, CreateTaskType } from "../schemas";

/**
 * Создание новой задачи
 */
export const createTaskRoute: AppFastifyRoute<CreateTaskType> = {
  url: "/tasks",
  method: "POST",
  schema: createTaskSchema,
  handler: createTaskHandler,
};
