import { AppFastifySchema } from "@types";
import { SwaggerContract } from "@contracts";
import { taskSample } from "./common.schemas";

export const replaceTasksSchema = {
  tags: [SwaggerContract.ClientTag.TASKS],
  summary: "Заменить все задачи",
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
          properties: {
            content: taskSample.content,
            status: taskSample.status,
          },
        },
      },
    },
  },
  response: {
    201: SwaggerContract.ActionResponseSchema,
    401: SwaggerContract.ClientErrorResponseFactory(401),
  },
} as const satisfies AppFastifySchema;

export type ReplaceTasksType = typeof replaceTasksSchema;
