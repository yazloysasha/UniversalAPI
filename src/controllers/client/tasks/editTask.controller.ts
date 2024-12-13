import { AppFastifyRoute } from "@types";
import { editTaskHandler } from "@handlers/client";
import { editTaskSchema, EditTaskType } from "@schemas/client";

/**
 * Редактирование задачи
 */
export const editTaskController: AppFastifyRoute<EditTaskType> = {
  url: "/tasks/:taskId",
  method: "PATCH",
  schema: editTaskSchema,
  handler: editTaskHandler,
};
