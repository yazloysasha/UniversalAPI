import { AppFastifySchema } from "@types";
import { SwaggerContract } from "@contracts";
import { paramsWithUserId, extendedUserSchema } from "./common.schemas";

export const getUserSchema = {
  tags: [SwaggerContract.AdminTag.USERS],
  summary: "Получить одного пользователя",
  security: [{ Bearer: [] }],
  params: paramsWithUserId,
  response: {
    200: {
      description: "Пользователь",
      ...extendedUserSchema,
    },
    404: SwaggerContract.ClientErrorResponseFactory(404),
  },
} as const satisfies AppFastifySchema;

export type GetUserType = typeof getUserSchema;
