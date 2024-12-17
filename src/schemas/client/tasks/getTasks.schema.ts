import { SwaggerContract } from "@contracts";
import { taskSchema } from "./common.schemas";
import { AppFastifySchema, SuccessCode } from "@types";

export const getTasksSchema = {
  tags: [SwaggerContract.ClientTag.TASKS],
  summary: "Get list of all tasks",
  security: [{ Bearer: [] }],
  querystring: SwaggerContract.EnablePaginationSchema,
  response: {
    [SuccessCode.OK]: {
      type: "object",
      description: "Reply to request",
      required: ["totalSize", "items"],
      properties: {
        totalSize: SwaggerContract.PaginatedResponseSchema.properties.totalSize,
        items: {
          type: "array",
          description: "Tasks",
          items: taskSchema,
        },
      },
    } as const satisfies SwaggerContract.PaginatedResponseType,
  },
} as const satisfies AppFastifySchema;

export type GetTasksType = typeof getTasksSchema;
