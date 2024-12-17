import { SwaggerContract } from "@contracts";
import { userSchema } from "./common.schemas";
import { AppFastifySchema, SuccessCode } from "@types";

export const getUsersSchema = {
  tags: [SwaggerContract.AdminTag.USERS],
  summary: "Get list of all users",
  security: [{ Bearer: [] }],
  querystring: SwaggerContract.EnablePaginationSchema,
  response: {
    [SuccessCode.OK]: {
      type: "object",
      description: "Reply to request",
      required: ["totalSize", "items"],
      properties: {
        totalSize: SwaggerContract.PaginatedResponseSchema.properties.totalSize,
        items: {
          type: "array",
          description: "Users",
          items: userSchema,
        },
      },
    } as const satisfies SwaggerContract.PaginatedResponseType,
  },
} as const satisfies AppFastifySchema;

export type GetUsersType = typeof getUsersSchema;
