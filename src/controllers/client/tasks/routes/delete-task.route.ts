import { AppFastifyRoute } from "@types";
import { deleteTaskHandler } from "../handlers";
import { deleteTaskSchema, DeleteTaskType } from "../schemas";

/**
 * Удаление задачи
 */
export const deleteTaskRoute: AppFastifyRoute<DeleteTaskType> = {
  url: "/tasks/:taskId",
  method: "DELETE",
  schema: deleteTaskSchema,
  handler: deleteTaskHandler,
};
