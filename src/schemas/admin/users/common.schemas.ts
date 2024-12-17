import { UserRole } from "@entities";
import { SwaggerContract } from "@contracts";
import { taskSchema } from "@schemas/client";
import { AppJSONSchema, CustomFormat } from "@types";
import { timestampsSample } from "@schemas/common.schemas";

const userIdSchema = {
  type: "string",
  format: CustomFormat.UUID,
  description: "User ID",
  example: SwaggerContract.UUIDExample,
} as const satisfies AppJSONSchema;

export const userSample = {
  name: {
    type: "string",
    minLength: 1,
    description: "Username",
    example: "admin",
  },
  role: {
    type: "string",
    enum: [UserRole.ADMINISTRATOR, null],
    nullable: true,
    description: "User role",
    example: UserRole.ADMINISTRATOR,
  },
} as const satisfies { [Property in string]: AppJSONSchema };

export const userSchema = {
  type: "object",
  required: ["id", "name", "role", "createdAt", "updatedAt"],
  properties: {
    id: userIdSchema,
    ...userSample,
    ...timestampsSample,
  },
} as const satisfies AppJSONSchema;

export const extendedUserSchema = {
  type: "object",
  required: [
    "id",
    "name",
    "role",
    "sessions",
    "tasks",
    "createdAt",
    "updatedAt",
  ],
  properties: {
    id: userIdSchema,
    ...userSample,
    sessions: {
      type: "array",
      description: "List of active sessions",
      items: {
        type: "object",
        required: ["id", "createdAt", "updatedAt"],
        properties: {
          id: {
            type: "string",
            format: CustomFormat.UUID,
            description: "Session ID",
            example: SwaggerContract.UUIDExample,
          },
          ...timestampsSample,
        },
      },
    },
    tasks: {
      type: "array",
      description: "User task list",
      items: taskSchema,
    },
    ...timestampsSample,
  },
} as const satisfies AppJSONSchema;

export const paramsWithUserId = {
  type: "object",
  required: ["userId"],
  properties: {
    userId: userIdSchema,
  },
} as const satisfies AppJSONSchema;
