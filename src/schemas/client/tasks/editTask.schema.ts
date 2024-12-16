import { SwaggerContract } from "@contracts";
import { AppFastifySchema, ClientErrorCode, SuccessCode } from "@types";
import { paramsWithTaskId, taskSample, taskSchema } from "./common.schemas";

export const editTaskSchema = {
  tags: [SwaggerContract.ClientTag.TASKS],
  summary: "Отредактировать задачу",
  security: [{ Bearer: [] }],
  params: paramsWithTaskId,
  body: {
    type: "object",
    description: "Редактируемые поля",
    properties: taskSample,
  },
  response: {
    [SuccessCode.OK]: {
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
          description: "Отредактированная задача",
          ...taskSchema,
        },
      },
    } as const satisfies SwaggerContract.ActionResponseType,
    [ClientErrorCode.NOT_FOUND]: SwaggerContract.ClientErrorResponseFactory(
      ClientErrorCode.NOT_FOUND
    ),
  },
} as const satisfies AppFastifySchema;

export type EditTaskType = typeof editTaskSchema;
