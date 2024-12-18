import i18next from "i18next";
import { AppFastifySchema } from "@types";
import { SwaggerContract } from "@contracts";
import { authSchema, tokenSample } from "./common.schemas";

export const loginSchema = {
  tags: [SwaggerContract.ClientTag.AUTH],
  summary: "Войти в аккаунт",
  body: authSchema,
  response: {
    200: {
      type: "object",
      description: SwaggerContract.ActionResponseSchema.description,
      required: ["alert", "message", "token"],
      properties: {
        alert: SwaggerContract.ActionResponseSchema.properties.alert,
        message: {
          type: "string",
          description:
            SwaggerContract.ActionResponseSchema.properties.message.description,
          example: i18next.t("swagger.messages.LOGGED"),
        },
        ...tokenSample,
      },
    } as const satisfies SwaggerContract.ActionResponseType,
    400: SwaggerContract.ClientErrorResponseFactory(400),
  },
} as const satisfies AppFastifySchema;

export type LoginType = typeof loginSchema;
