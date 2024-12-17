import { SwaggerContract } from "@contracts";
import { paramsWithTaskId } from "./common.schemas";
import { AppFastifySchema, ClientErrorCode, SuccessCode } from "@types";

export const deleteTaskSchema = {
  tags: [SwaggerContract.ClientTag.TASKS],
  summary: "Delete a task",
  security: [{ Bearer: [] }],
  params: paramsWithTaskId,
  response: {
    [SuccessCode.OK]: {
      type: "object",
      required: ["alert", "message", "taskId"],
      description: SwaggerContract.ActionResponseSchema.description,
      properties: {
        alert: SwaggerContract.ActionResponseSchema.properties.alert,
        message: {
          type: "string",
          description:
            SwaggerContract.ActionResponseSchema.properties.message.description,
          example: "Успешно удалено",
        },
        taskId: {
          type: "string",
          description: "Remote task ID",
          example: SwaggerContract.UUIDExample,
        },
      },
    } as const satisfies SwaggerContract.ActionResponseType,
    [ClientErrorCode.NOT_FOUND]: SwaggerContract.ClientErrorResponseFactory(
      ClientErrorCode.NOT_FOUND
    ),
  },
} as const satisfies AppFastifySchema;

export type DeleteTaskType = typeof deleteTaskSchema;
