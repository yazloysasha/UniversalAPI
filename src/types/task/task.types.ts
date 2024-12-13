import { Task } from "@entities";

export type FullTask = Pick<Task, "id" | "content" | "status">;
