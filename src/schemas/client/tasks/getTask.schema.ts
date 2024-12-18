import { AppFastifySchema } from "@types";
import { SwaggerContract } from "@contracts";
import { paramsWithTaskId, taskSchema } from "./common.schemas";

export const getTaskSchema = {
  tags: [SwaggerContract.ClientTag.TASKS],
  summary: "Получить одну задачу",
  security: [{ Bearer: [] }],
  params: paramsWithTaskId,
  response: {
    200: {
      description: "Задача",
      ...taskSchema,
    },
    404: SwaggerContract.ClientErrorResponseFactory(404),
  },
} as const satisfies AppFastifySchema;

export type GetTaskType = typeof getTaskSchema;
