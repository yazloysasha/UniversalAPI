import { AppFastifyRoute } from "@types";
import { replaceTasksHandler } from "@handlers/client";
import { replaceTasksSchema, ReplaceTasksType } from "@schemas/client";

/**
 * Замена всех задач
 */
export const replaceTasksController: AppFastifyRoute<ReplaceTasksType> = {
  url: "/tasks",
  method: "PUT",
  schema: replaceTasksSchema,
  handler: replaceTasksHandler,
};
