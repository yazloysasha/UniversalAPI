import { TaskStatus } from "@entities";
import { SwaggerContract } from "@contracts";
import { AppJSONSchema, CustomFormat } from "@types";

export const taskSample = {
  content: {
    type: "string",
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
  required: ["id", "content", "status"],
  properties: {
    id: {
      type: "string",
      format: CustomFormat.UUID,
      description: "ID задачи",
      example: SwaggerContract.UUIDExample,
    },
    ...taskSample,
  },
} as const satisfies AppJSONSchema;

export const paramsWithTaskId = {
  type: "object",
  required: ["taskId"],
  properties: {
    taskId: {
      type: "string",
      format: CustomFormat.UUID,
      example: SwaggerContract.UUIDExample,
    },
  },
} as const satisfies AppJSONSchema;
