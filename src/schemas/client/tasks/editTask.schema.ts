import i18next from "i18next";
import { AppFastifySchema } from "@types";
import { SwaggerContract } from "@contracts";
import { paramsWithTaskId, taskSample, taskSchema } from "./common.schemas";

export const editTaskSchema = {
  tags: [SwaggerContract.ClientTag.TASKS],
  summary: "Отредактировать задачу",
  security: [{ Bearer: [] }],
  params: paramsWithTaskId,
  body: {
    type: "object",
    description: "Редактируемые атрибуты",
    properties: {
      name: taskSample.name,
      description: taskSample.description,
      deadline: taskSample.deadline,
      priority: {
        ...taskSample.priority,
        enum: [null, ...taskSample.priority.enum],
        nullable: true,
      },
      done: {
        type: "boolean",
        description: "Отметка о выполнении задачи",
        example: true,
      },
    },
  },
  response: {
    200: {
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
          description: "Отредактированная задача",
          ...taskSchema,
        },
      },
    } as const satisfies SwaggerContract.ActionResponseType,
    401: SwaggerContract.ClientErrorResponseFactory(401),
    404: SwaggerContract.ClientErrorResponseFactory(404),
  },
} as const satisfies AppFastifySchema;

export type EditTaskType = typeof editTaskSchema;
