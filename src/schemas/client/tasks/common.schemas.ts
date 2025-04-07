import { SwaggerContract } from "@contracts";
import { TaskPriority, TaskStatus } from "@entities";
import { AppJSONSchema, CustomFormat } from "@types";
import { timestampsSample } from "@schemas/common.schemas";

const taskIdSchema = {
  type: "string",
  format: CustomFormat.UUID,
  description: "ID задачи",
  example: SwaggerContract.UUIDExample,
} as const satisfies AppJSONSchema;

export const taskSample = {
  id: taskIdSchema,
  name: {
    type: "string",
    minLength: 1,
    description: "Название задачи",
    example: "API для проекта",
  },
  description: {
    type: "string",
    nullable: true,
    minLength: 1,
    description: "Описание задачи",
    example: "Сделать API для проекта",
  },
  deadline: {
    type: "string",
    format: CustomFormat.DATE_TIME,
    nullable: true,
    description: "Дата выполнения задачи",
    example: SwaggerContract.DateTimeExample,
  },
  status: {
    type: "string",
    enum: [
      TaskStatus.ACTIVE,
      TaskStatus.COMPLETED,
      TaskStatus.OVERDUE,
      TaskStatus.LATE,
    ],
    description: "Статус задачи",
    example: TaskStatus.ACTIVE,
  },
  priority: {
    type: "string",
    enum: [
      TaskPriority.LOW,
      TaskPriority.MEDIUM,
      TaskPriority.HIGH,
      TaskPriority.CRITICAL,
    ],
    description: "Приоритет задачи",
    example: TaskPriority.LOW,
  },
  ...timestampsSample,
} as const satisfies { [x in string]: AppJSONSchema };

export const taskSchema = {
  type: "object",
  required: [
    "id",
    "name",
    "description",
    "deadline",
    "status",
    "priority",
    "createdAt",
    "updatedAt",
  ],
  properties: taskSample,
} as const satisfies AppJSONSchema;

export const paramsWithTaskId = {
  type: "object",
  required: ["taskId"],
  properties: {
    taskId: taskIdSchema,
  },
} as const satisfies AppJSONSchema;
