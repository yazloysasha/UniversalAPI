import i18next from "i18next";
import { AppFastifySchema } from "@/types/shared";
import { SwaggerContract } from "@/contracts/swagger";
import { taskSample, taskSchema } from "./common.schemas";

export const createTaskSchema = {
  tags: [SwaggerContract.ClientTag.TASKS],
  summary: "Создать новую задачу",
  security: [{ Bearer: [] }],
  body: {
    type: "object",
    description: "Новая задача",
    required: ["name", "description", "deadline", "priority"],
    properties: {
      name: taskSample.name,
      description: taskSample.description,
      deadline: taskSample.deadline,
      priority: {
        ...taskSample.priority,
        enum: [null, ...taskSample.priority.enum],
        nullable: true,
      },
    },
  },
  response: {
    201: {
      type: "object",
      description: SwaggerContract.ActionResponseSchema.description,
      required: ["message", "task"],
      properties: {
        message: {
          type: "string",
          description:
            SwaggerContract.ActionResponseSchema.properties.message.description,
          example: i18next.t("swagger.messages.SAVED"),
        },
        task: {
          description: "Созданная задача",
          ...taskSchema,
        },
      },
    } as const satisfies SwaggerContract.ActionResponseType,
    400: SwaggerContract.ClientErrorResponseFactory(400),
    401: SwaggerContract.ClientErrorResponseFactory(401),
  },
} as const satisfies AppFastifySchema;

export type CreateTaskType = typeof createTaskSchema;
