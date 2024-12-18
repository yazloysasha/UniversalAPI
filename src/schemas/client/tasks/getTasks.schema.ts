import { AppFastifySchema } from "@types";
import { SwaggerContract } from "@contracts";
import { taskSchema } from "./common.schemas";

export const getTasksSchema = {
  tags: [SwaggerContract.ClientTag.TASKS],
  summary: "Получить все задачи",
  security: [{ Bearer: [] }],
  querystring: SwaggerContract.EnablePaginationSchema,
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
