import { SwaggerContract } from "@contracts";
import { authSchema, tokenSample } from "./common.schemas";
import { AppFastifySchema, ClientErrorCode, SuccessCode } from "@types";

export const registerSchema = {
  tags: [SwaggerContract.ClientTag.AUTH],
  summary: "Создать новый аккаунт",
  body: authSchema,
  response: {
    [SuccessCode.CREATED]: {
      type: "object",
      description: SwaggerContract.ActionResponseSchema.description,
      required: ["alert", "message", "token"],
      properties: {
        alert: SwaggerContract.ActionResponseSchema.properties.alert,
        message: {
          type: "string",
          description:
            SwaggerContract.ActionResponseSchema.properties.message.description,
          example: "Вы успешно зарегистрировались",
        },
        ...tokenSample,
      },
    } as const satisfies SwaggerContract.ActionResponseType,
    [ClientErrorCode.BAD_REQUEST]: SwaggerContract.ClientErrorResponseFactory(
      ClientErrorCode.BAD_REQUEST
    ),
  },
} as const satisfies AppFastifySchema;

export type RegisterType = typeof registerSchema;
