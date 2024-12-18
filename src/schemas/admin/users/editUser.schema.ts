import i18next from "i18next";
import { AppFastifySchema } from "@types";
import { SwaggerContract } from "@contracts";
import { paramsWithUserId, userSample, userSchema } from "./common.schemas";

export const editUserSchema = {
  tags: [SwaggerContract.AdminTag.USERS],
  summary: "Отредактировать пользователя",
  security: [{ Bearer: [] }],
  params: paramsWithUserId,
  body: {
    type: "object",
    description: "Редактируемые атрибуты",
    properties: userSample,
  },
  response: {
    200: {
      type: "object",
      description: SwaggerContract.ActionResponseSchema.description,
      required: ["alert", "message", "user"],
      properties: {
        alert: SwaggerContract.ActionResponseSchema.properties.alert,
        message: {
          type: "string",
          description:
            SwaggerContract.ActionResponseSchema.properties.message.description,
          example: i18next.t("swagger.messages.SAVED"),
        },
        user: {
          description: "Отредактированный пользователь",
          ...userSchema,
        },
      },
    } as const satisfies SwaggerContract.ActionResponseType,
    404: SwaggerContract.ClientErrorResponseFactory(404),
  },
} as const satisfies AppFastifySchema;

export type EditUserType = typeof editUserSchema;
