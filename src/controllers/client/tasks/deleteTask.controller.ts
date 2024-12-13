import { AppFastifyRoute } from "@types";
import { deleteTaskHandler } from "@handlers/client";
import { deleteTaskSchema, DeleteTaskType } from "@schemas/client";

/**
 * Удаление задачи
 */
export const deleteTaskController: AppFastifyRoute<DeleteTaskType> = {
  url: "/tasks/:taskId",
  method: "DELETE",
  schema: deleteTaskSchema,
  handler: deleteTaskHandler,
};
