import i18next from "i18next";
import { AppFastifySchema } from "@types";
import { SwaggerContract } from "@contracts";
import { taskSample, taskSchema } from "./common.schemas";

export const createTaskSchema = {
  tags: [SwaggerContract.ClientTag.TASKS],
  summary: "Создать новую задачу",
  security: [{ Bearer: [] }],
  body: {
    type: "object",
    description: "Новая задача",
    required: ["content", "status"],
    properties: taskSample,
  },
  response: {
    201: {
      type: "object",
      description: SwaggerContract.ActionResponseSchema.description,
      required: ["alert", "message", "task"],
      properties: {
        alert: SwaggerContract.ActionResponseSchema.properties.alert,
        message: {
          type: "string",
          description:
            SwaggerContract.ActionResponseSchema.properties.message.description,
          example: i18next.t("swagger.messages.SAVED"),
        },
        task: {
          description: "Созданная задача",
          ...taskSchema,
        },
      },
    } as const satisfies SwaggerContract.ActionResponseType,
    400: SwaggerContract.ClientErrorResponseFactory(400),
  },
} as const satisfies AppFastifySchema;

export type CreateTaskType = typeof createTaskSchema;
