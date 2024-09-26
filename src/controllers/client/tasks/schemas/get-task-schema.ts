import { SwaggerContract } from "@contracts";
import { paramsWithTaskId, taskSchema } from "./common.schemas";
import { AppFastifySchema, ClientErrorCode, SuccessCode } from "@types";

export const getTaskSchema = {
  tags: [SwaggerContract.ClientTag.TASKS],
  summary: "Получить задачу",
  params: paramsWithTaskId,
  response: {
    [SuccessCode.OK]: {
      description: "Задача",
      ...taskSchema,
    },
    [ClientErrorCode.NOT_FOUND]: SwaggerContract.ClientErrorResponseFactory(
      ClientErrorCode.NOT_FOUND
    ),
  },
} as const satisfies AppFastifySchema;

export type GetTaskType = typeof getTaskSchema;
