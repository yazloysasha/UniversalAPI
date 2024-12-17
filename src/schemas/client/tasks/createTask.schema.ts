import { SwaggerContract } from "@contracts";
import { AppFastifySchema, SuccessCode } from "@types";
import { taskSample, taskSchema } from "./common.schemas";

export const createTaskSchema = {
  tags: [SwaggerContract.ClientTag.TASKS],
  summary: "Create a new task",
  security: [{ Bearer: [] }],
  body: {
    type: "object",
    description: "New task",
    required: ["content", "status"],
    properties: taskSample,
  },
  response: {
    [SuccessCode.CREATED]: {
      type: "object",
      description: SwaggerContract.ActionResponseSchema.description,
      required: ["alert", "message", "task"],
      properties: {
        alert: SwaggerContract.ActionResponseSchema.properties.alert,
        message: {
          type: "string",
          description:
            SwaggerContract.ActionResponseSchema.properties.message.description,
          example: "Успешно сохранено",
        },
        task: {
          description: "Created task",
          ...taskSchema,
        },
      },
    } as const satisfies SwaggerContract.ActionResponseType,
  },
} as const satisfies AppFastifySchema;

export type CreateTaskType = typeof createTaskSchema;
