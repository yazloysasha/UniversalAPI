import { SwaggerContract } from "@contracts";
import { AppFastifySchema, ClientErrorCode, SuccessCode } from "@types";

export const logoutSchema = {
  tags: [SwaggerContract.ClientTag.AUTH],
  summary: "Logout from account",
  security: [{ Bearer: [] }],
  response: {
    [SuccessCode.OK]: {
      type: "object",
      description: SwaggerContract.ActionResponseSchema.description,
      required: ["alert", "message"],
      properties: {
        alert: SwaggerContract.ActionResponseSchema.properties.alert,
        message: {
          type: "string",
          description:
            SwaggerContract.ActionResponseSchema.properties.message.description,
          example: "Вы успешно вышли из аккаунта",
        },
      },
    } as const satisfies SwaggerContract.ActionResponseType,
    [ClientErrorCode.UNAUTHORIZED]: SwaggerContract.ClientErrorResponseFactory(
      ClientErrorCode.UNAUTHORIZED
    ),
  },
} as const satisfies AppFastifySchema;

export type LogoutType = typeof logoutSchema;
