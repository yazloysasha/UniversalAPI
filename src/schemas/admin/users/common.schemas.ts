import { UserRole } from "@entities";
import { SwaggerContract } from "@contracts";
import { taskSchema } from "@schemas/client";
import { AppJSONSchema, CustomFormat } from "@types";
import { timestampsSample } from "@schemas/common.schemas";

const userIdSchema = {
  type: "string",
  format: CustomFormat.UUID,
  description: "ID пользователя",
  example: SwaggerContract.UUIDExample,
} as const satisfies AppJSONSchema;

export const userSample = {
  name: {
    type: "string",
    minLength: 1,
    description: "Имя пользователя",
    example: "admin",
  },
  role: {
    type: "string",
    enum: [UserRole.ADMINISTRATOR, null],
    nullable: true,
    description: "Роль пользователя",
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
      description: "Список активных сессий",
      items: {
        type: "object",
        required: ["id", "createdAt", "updatedAt"],
        properties: {
          id: {
            type: "string",
            format: CustomFormat.UUID,
            description: "ID сессии",
            example: SwaggerContract.UUIDExample,
          },
          ...timestampsSample,
        },
      },
    },
    tasks: {
      type: "array",
      description: "Список задач пользователя",
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
