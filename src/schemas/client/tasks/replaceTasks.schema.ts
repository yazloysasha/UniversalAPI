import { SwaggerContract } from "@contracts";
import { taskSample } from "./common.schemas";
import { AppFastifySchema, SuccessCode } from "@types";

export const replaceTasksSchema = {
  tags: [SwaggerContract.ClientTag.TASKS],
  summary: "Заменить список задач",
  security: [{ Bearer: [] }],
  body: {
    type: "object",
    required: ["tasks"],
    properties: {
      tasks: {
        type: "array",
        description: "Новый список задач",
        items: {
          type: "object",
          required: ["content", "status"],
          properties: taskSample,
        },
      },
    },
  },
  response: {
    [SuccessCode.CREATED]: SwaggerContract.ActionResponseSchema,
  },
} as const satisfies AppFastifySchema;

export type ReplaceTasksType = typeof replaceTasksSchema;
