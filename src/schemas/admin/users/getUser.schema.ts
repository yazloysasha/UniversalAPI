import { SwaggerContract } from "@contracts";
import { paramsWithUserId, extendedUserSchema } from "./common.schemas";
import { AppFastifySchema, ClientErrorCode, SuccessCode } from "@types";

export const getUserSchema = {
  tags: [SwaggerContract.AdminTag.USERS],
  summary: "Get one user",
  security: [{ Bearer: [] }],
  params: paramsWithUserId,
  response: {
    [SuccessCode.OK]: {
      description: "User",
      ...extendedUserSchema,
    },
    [ClientErrorCode.NOT_FOUND]: SwaggerContract.ClientErrorResponseFactory(
      ClientErrorCode.NOT_FOUND
    ),
  },
} as const satisfies AppFastifySchema;

export type GetUserType = typeof getUserSchema;
