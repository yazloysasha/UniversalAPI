import { taskSchema } from "./common.schemas";
import { AppFastifySchema } from "@/types/shared";
import { SwaggerContract } from "@/contracts/swagger";
import { TaskPriority, TaskStatus } from "@/entities/task";

export const getTasksSchema = {
  tags: [SwaggerContract.ClientTag.TASKS],
  summary: "Получить все задачи",
  security: [{ Bearer: [] }],
  querystring: {
    type: "object",
    properties: {
      ...SwaggerContract.EnablePaginationSchema.properties,
      status: {
        type: "string",
        enum: [
          TaskStatus.ACTIVE,
          TaskStatus.COMPLETED,
          TaskStatus.OVERDUE,
          TaskStatus.LATE,
        ],
        description: "Фильтрация по статусу задачи",
        example: TaskStatus.ACTIVE,
      },
      priority: {
        type: "string",
        enum: [
          TaskPriority.LOW,
          TaskPriority.MEDIUM,
          TaskPriority.HIGH,
          TaskPriority.CRITICAL,
        ],
        description: "Фильтрация по приоритету задачи",
        example: TaskPriority.LOW,
      },
      name: {
        type: "string",
        enum: ["ASC", "DESC"],
        description: "Сортировка по названию задачи",
        example: "ASC",
      },
      description: {
        type: "string",
        enum: ["ASC", "DESC"],
        description: "Сортировка по описанию задачи",
        example: "ASC",
      },
      deadline: {
        type: "string",
        enum: ["ASC", "DESC"],
        description: "Сортировка по дате выполнения задачи",
        example: "ASC",
      },
      createdAt: {
        type: "string",
        enum: ["ASC", "DESC"],
        description: "Сортировка по дате создания задачи",
        example: "ASC",
      },
      updatedAt: {
        type: "string",
        enum: ["ASC", "DESC"],
        description: "Сортировка по дате обновления задачи",
        example: "ASC",
      },
    },
  } as const satisfies SwaggerContract.EnablePaginationType,
  response: {
    200: {
      type: "object",
      description: "Ответ на запрос",
      required: ["totalSize", "items"],
      properties: {
        totalSize: SwaggerContract.PaginatedResponseSchema.properties.totalSize,
        items: {
          type: "array",
          description: "Задачи",
          items: taskSchema,
        },
      },
    } as const satisfies SwaggerContract.PaginatedResponseType,
    401: SwaggerContract.ClientErrorResponseFactory(401),
  },
} as const satisfies AppFastifySchema;

export type GetTasksType = typeof getTasksSchema;
