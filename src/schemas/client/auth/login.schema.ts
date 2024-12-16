import { SwaggerContract } from "@contracts";
import { authSchema, tokenSample } from "./common.schemas";
import { AppFastifySchema, ClientErrorCode, SuccessCode } from "@types";

export const loginSchema = {
  tags: [SwaggerContract.ClientTag.AUTH],
  summary: "Войти в аккаунт",
  body: authSchema,
  response: {
    [SuccessCode.OK]: {
      type: "object",
      description: SwaggerContract.ActionResponseSchema.description,
      required: ["alert", "message", "token"],
      properties: {
        alert: SwaggerContract.ActionResponseSchema.properties.alert,
        message: {
          type: "string",
          description:
            SwaggerContract.ActionResponseSchema.properties.message.description,
          example: "Вы успешно вошли в аккаунт",
        },
        ...tokenSample,
      },
    } as const satisfies SwaggerContract.ActionResponseType,
    [ClientErrorCode.BAD_REQUEST]: SwaggerContract.ClientErrorResponseFactory(
      ClientErrorCode.BAD_REQUEST
    ),
  },
} as const satisfies AppFastifySchema;

export type LoginType = typeof loginSchema;
