import {
  GetTaskType,
  GetTasksType,
  EditTaskType,
  getTaskSchema,
  getTasksSchema,
  CreateTaskType,
  editTaskSchema,
  DeleteTaskType,
  createTaskSchema,
  deleteTaskSchema,
} from "@/schemas/client";
import {
  getTaskHandler,
  getTasksHandler,
  editTaskHandler,
  createTaskHandler,
  deleteTaskHandler,
} from "@/handlers/client";
import { AppFastifyRoute } from "@/types/shared";
import { authPreHandler } from "@/middleware/auth";

/**
 * Получить все задачи
 */
export const getTasksController: AppFastifyRoute<GetTasksType> = {
  url: "/tasks",
  method: "GET",
  schema: getTasksSchema,
  preHandler: authPreHandler(),
  handler: getTasksHandler,
};

/**
 * Создать новую задачу
 */
export const createTaskController: AppFastifyRoute<CreateTaskType> = {
  url: "/tasks",
  method: "POST",
  schema: createTaskSchema,
  preHandler: authPreHandler(),
  handler: createTaskHandler,
};

/**
 * Получить одну задачу
 */
export const getTaskController: AppFastifyRoute<GetTaskType> = {
  url: "/tasks/:taskId",
  method: "GET",
  schema: getTaskSchema,
  preHandler: authPreHandler(),
  handler: getTaskHandler,
};

/**
 * Отредактировать задачу
 */
export const editTaskController: AppFastifyRoute<EditTaskType> = {
  url: "/tasks/:taskId",
  method: "PATCH",
  schema: editTaskSchema,
  preHandler: authPreHandler(),
  handler: editTaskHandler,
};

/**
 * Удалить задачу
 */
export const deleteTaskController: AppFastifyRoute<DeleteTaskType> = {
  url: "/tasks/:taskId",
  method: "DELETE",
  schema: deleteTaskSchema,
  preHandler: authPreHandler(),
  handler: deleteTaskHandler,
};
