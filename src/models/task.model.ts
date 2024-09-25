import { ITimestamps } from "@types";
import { model, Schema, Types } from "mongoose";

export enum TaskStatus {
  DONE = "DONE",
  NOT_DONE = "NOT_DONE",
}

export interface ITask extends ITimestamps {
  _id: Types.ObjectId;
  content: string;
  status: TaskStatus;
}

const taskSchema = new Schema<ITask>(
  {
    content: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: [TaskStatus.DONE, TaskStatus.NOT_DONE],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Задача
 */
export const Task = model("task", taskSchema);
