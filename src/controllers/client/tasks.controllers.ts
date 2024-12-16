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
  ReplaceTasksType,
  deleteTaskSchema,
  replaceTasksSchema,
} from "@schemas/client";
import {
  getTaskHandler,
  getTasksHandler,
  editTaskHandler,
  createTaskHandler,
  deleteTaskHandler,
  replaceTasksHandler,
} from "@handlers/client";
import { AppFastifyRoute } from "@types";

/**
 * Получение всех задач
 */
export const getTasksController: AppFastifyRoute<GetTasksType> = {
  url: "/tasks",
  method: "GET",
  schema: getTasksSchema,
  handler: getTasksHandler,
};

/**
 * Создание новой задачи
 */
export const createTaskController: AppFastifyRoute<CreateTaskType> = {
  url: "/tasks",
  method: "POST",
  schema: createTaskSchema,
  handler: createTaskHandler,
};

/**
 * Замена всех задач
 */
export const replaceTasksController: AppFastifyRoute<ReplaceTasksType> = {
  url: "/tasks",
  method: "PUT",
  schema: replaceTasksSchema,
  handler: replaceTasksHandler,
};

/**
 * Получение одной задачи
 */
export const getTaskController: AppFastifyRoute<GetTaskType> = {
  url: "/tasks/:taskId",
  method: "GET",
  schema: getTaskSchema,
  handler: getTaskHandler,
};

/**
 * Редактирование задачи
 */
export const editTaskController: AppFastifyRoute<EditTaskType> = {
  url: "/tasks/:taskId",
  method: "PATCH",
  schema: editTaskSchema,
  handler: editTaskHandler,
};

/**
 * Удаление задачи
 */
export const deleteTaskController: AppFastifyRoute<DeleteTaskType> = {
  url: "/tasks/:taskId",
  method: "DELETE",
  schema: deleteTaskSchema,
  handler: deleteTaskHandler,
};
