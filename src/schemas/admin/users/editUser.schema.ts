import i18next from "i18next";
import { AppFastifySchema } from "@types";
import { SwaggerContract } from "@contracts";
import { paramsWithUserId } from "./common.schemas";
import { userSample, userSchema } from "@schemas/client";

export const editUserSchema = {
  tags: [SwaggerContract.AdminTag.USERS],
  summary: "Отредактировать пользователя",
  security: [{ Bearer: [] }],
  params: paramsWithUserId,
  body: {
    type: "object",
    description: "Редактируемые атрибуты",
    properties: {
      name: userSample.name,
      role: userSample.role,
    },
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
    401: SwaggerContract.ClientErrorResponseFactory(401),
    403: SwaggerContract.ClientErrorResponseFactory(403),
    404: SwaggerContract.ClientErrorResponseFactory(404),
  },
} as const satisfies AppFastifySchema;

export type EditUserType = typeof editUserSchema;
