import { SwaggerContract } from "@contracts";
import { paramsWithTaskId } from "./common.schemas";
import { AppFastifySchema, SuccessCode } from "@types";

export const deleteTaskSchema = {
  tags: [SwaggerContract.ClientTag.TASKS],
  summary: "Удалить задачу",
  params: paramsWithTaskId,
  response: {
    [SuccessCode.OK]: SwaggerContract.ActionResponseSchema,
  },
} as const satisfies AppFastifySchema;

export type DeleteTaskType = typeof deleteTaskSchema;
