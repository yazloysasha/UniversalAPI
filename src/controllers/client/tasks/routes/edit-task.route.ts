import { AppFastifyRoute } from "@types";
import { editTaskHandler } from "../handlers";
import { editTaskSchema, EditTaskType } from "../schemas";

/**
 * Редактирование задачи
 */
export const editTaskRoute: AppFastifyRoute<EditTaskType> = {
  url: "/tasks/:taskId",
  method: "PATCH",
  schema: editTaskSchema,
  handler: editTaskHandler,
};
