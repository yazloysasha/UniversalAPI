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
import { authPreHandler } from "@middleware";

/**
 * Get all tasks
 */
export const getTasksController: AppFastifyRoute<GetTasksType> = {
  url: "/tasks",
  method: "GET",
  schema: getTasksSchema,
  preHandler: authPreHandler(),
  handler: getTasksHandler,
};

/**
 * Create a new task
 */
export const createTaskController: AppFastifyRoute<CreateTaskType> = {
  url: "/tasks",
  method: "POST",
  schema: createTaskSchema,
  preHandler: authPreHandler(),
  handler: createTaskHandler,
};

/**
 * Replace all tasks
 */
export const replaceTasksController: AppFastifyRoute<ReplaceTasksType> = {
  url: "/tasks",
  method: "PUT",
  schema: replaceTasksSchema,
  preHandler: authPreHandler(),
  handler: replaceTasksHandler,
};

/**
 * Get one task
 */
export const getTaskController: AppFastifyRoute<GetTaskType> = {
  url: "/tasks/:taskId",
  method: "GET",
  schema: getTaskSchema,
  preHandler: authPreHandler(),
  handler: getTaskHandler,
};

/**
 * Edit a task
 */
export const editTaskController: AppFastifyRoute<EditTaskType> = {
  url: "/tasks/:taskId",
  method: "PATCH",
  schema: editTaskSchema,
  preHandler: authPreHandler(),
  handler: editTaskHandler,
};

/**
 * Delete a task
 */
export const deleteTaskController: AppFastifyRoute<DeleteTaskType> = {
  url: "/tasks/:taskId",
  method: "DELETE",
  schema: deleteTaskSchema,
  preHandler: authPreHandler(),
  handler: deleteTaskHandler,
};
