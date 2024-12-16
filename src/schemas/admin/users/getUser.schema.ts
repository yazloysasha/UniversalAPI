import { SwaggerContract } from "@contracts";
import { paramsWithUserId, extendedUserSchema } from "./common.schemas";
import { AppFastifySchema, ClientErrorCode, SuccessCode } from "@types";

export const getUserSchema = {
  tags: [SwaggerContract.AdminTag.USERS],
  summary: "Получить пользователя",
  security: [{ Bearer: [] }],
  params: paramsWithUserId,
  response: {
    [SuccessCode.OK]: {
      description: "Пользователь",
      ...extendedUserSchema,
    },
    [ClientErrorCode.NOT_FOUND]: SwaggerContract.ClientErrorResponseFactory(
      ClientErrorCode.NOT_FOUND
    ),
  },
} as const satisfies AppFastifySchema;

export type GetUserType = typeof getUserSchema;
