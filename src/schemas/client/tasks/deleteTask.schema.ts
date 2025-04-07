import i18next from "i18next";
import { AppFastifySchema } from "@types";
import { SwaggerContract } from "@contracts";
import { paramsWithTaskId } from "./common.schemas";

export const deleteTaskSchema = {
  tags: [SwaggerContract.ClientTag.TASKS],
  summary: "Удалить задачу",
  security: [{ Bearer: [] }],
  params: paramsWithTaskId,
  response: {
    200: {
      type: "object",
      required: ["message", "taskId"],
      description: SwaggerContract.ActionResponseSchema.description,
      properties: {
        message: {
          type: "string",
          description:
            SwaggerContract.ActionResponseSchema.properties.message.description,
          example: i18next.t("swagger.messages.DELETED"),
        },
        taskId: {
          type: "string",
          description: "ID удалённой задачи",
          example: SwaggerContract.UUIDExample,
        },
      },
    } as const satisfies SwaggerContract.ActionResponseType,
    401: SwaggerContract.ClientErrorResponseFactory(401),
    404: SwaggerContract.ClientErrorResponseFactory(404),
  },
} as const satisfies AppFastifySchema;

export type DeleteTaskType = typeof deleteTaskSchema;
