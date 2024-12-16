import { TaskStatus } from "@entities";
import { SwaggerContract } from "@contracts";
import { AppJSONSchema, CustomFormat } from "@types";
import { timestampsSample } from "@schemas/common.schemas";

export const taskSample = {
  content: {
    type: "string",
    minLength: 1,
    description: "Текст задачи",
    example: "Сделать API для проекта",
  },
  status: {
    type: "string",
    enum: [TaskStatus.DONE, TaskStatus.NOT_DONE],
    description: "Статус задачи",
    example: TaskStatus.DONE,
  },
} as const satisfies { [Property in string]: AppJSONSchema };

export const taskSchema = {
  type: "object",
  required: ["id", "content", "status", "createdAt", "updatedAt"],
  properties: {
    id: {
      type: "string",
      format: CustomFormat.UUID,
      description: "ID задачи",
      example: SwaggerContract.UUIDExample,
    },
    ...taskSample,
    ...timestampsSample,
  },
} as const satisfies AppJSONSchema;

export const paramsWithTaskId = {
  type: "object",
  required: ["taskId"],
  properties: {
    taskId: {
      type: "string",
      format: CustomFormat.UUID,
      description: "ID задачи",
      example: SwaggerContract.UUIDExample,
    },
  },
} as const satisfies AppJSONSchema;
