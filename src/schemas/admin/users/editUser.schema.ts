import { SwaggerContract } from "@contracts";
import { AppFastifySchema, ClientErrorCode, SuccessCode } from "@types";
import { paramsWithUserId, userSample, userSchema } from "./common.schemas";

export const editUserSchema = {
  tags: [SwaggerContract.AdminTag.USERS],
  summary: "Edit a user",
  security: [{ Bearer: [] }],
  params: paramsWithUserId,
  body: {
    type: "object",
    description: "Editable attributes",
    properties: userSample,
  },
  response: {
    [SuccessCode.OK]: {
      type: "object",
      description: SwaggerContract.ActionResponseSchema.description,
      required: ["alert", "message", "user"],
      properties: {
        alert: SwaggerContract.ActionResponseSchema.properties.alert,
        message: {
          type: "string",
          description:
            SwaggerContract.ActionResponseSchema.properties.message.description,
          example: "Успешно сохранено",
        },
        user: {
          description: "Edited user",
          ...userSchema,
        },
      },
    } as const satisfies SwaggerContract.ActionResponseType,
    [ClientErrorCode.NOT_FOUND]: SwaggerContract.ClientErrorResponseFactory(
      ClientErrorCode.NOT_FOUND
    ),
  },
} as const satisfies AppFastifySchema;

export type EditUserType = typeof editUserSchema;
