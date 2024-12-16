import { Task } from "@entities";

export type RegularTask = Pick<
  Task,
  "id" | "content" | "status" | "createdAt" | "updatedAt"
>;
