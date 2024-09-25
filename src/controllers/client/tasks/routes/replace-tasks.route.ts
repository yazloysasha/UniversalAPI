import { AppFastifyRoute } from "@types";
import { replaceTasksHandler } from "../handlers";
import { replaceTasksSchema, ReplaceTasksType } from "../schemas";

/**
 * Замена всех задач
 */
export const replaceTasksRoute: AppFastifyRoute<ReplaceTasksType> = {
  url: "/tasks",
  method: "PUT",
  schema: replaceTasksSchema,
  handler: replaceTasksHandler,
};
