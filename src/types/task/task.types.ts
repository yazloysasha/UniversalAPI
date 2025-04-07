import { Task, TaskPriority, TaskStatus } from "@entities";

export type RegularTask = Pick<
  Task,
  | "id"
  | "name"
  | "description"
  | "deadline"
  | "status"
  | "priority"
  | "createdAt"
  | "updatedAt"
>;

export interface ITaskFilter {
  status?: TaskStatus;
  priority?: TaskPriority;
}

export type TaskSort = {
  [Property in keyof Pick<
    RegularTask,
    "name" | "description" | "deadline" | "createdAt" | "updatedAt"
  >]?: "ASC" | "DESC";
};
