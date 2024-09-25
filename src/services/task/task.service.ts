import { Types } from "mongoose";
import { ApiError } from "@errors";
import { IPagination } from "@types";
import { ITask, Task, TaskStatus } from "@models";

/**
 * Сервис для управления задачами
 */
export class TaskService {
  /**
   * Получить все задачи
   */
  async getTasks({
    pagination,
  }: {
    pagination: IPagination;
  }): Promise<{ totalSize: number; tasks: ITask[] }> {
    const [totalSize, tasks] = await Promise.all([
      Task.countDocuments(),
      Task.find().skip(pagination.skip).limit(pagination.limit).lean(),
    ]);

    return {
      totalSize,
      tasks,
    };
  }

  /**
   * Заменить задачи
   */
  async replaceTasks({
    tasks,
  }: {
    tasks: Omit<ITask, "_id">[];
  }): Promise<void> {
    await Task.deleteMany();

    await Task.insertMany(tasks);
  }

  /**
   * Создать задачу
   */
  async createTask({
    content,
    status,
  }: {
    content: string;
    status: TaskStatus;
  }): Promise<ITask> {
    const createdTask = await Task.create({ content, status });

    return createdTask.toObject();
  }

  /**
   * Отредактировать задачу
   */
  async editTask({
    taskId,
    content,
    status,
  }: {
    taskId: Types.ObjectId;
    content?: string;
    status?: TaskStatus;
  }): Promise<ITask> {
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { content, status },
      { returnDocument: "after" }
    ).lean();

    if (!updatedTask) throw ApiError.notFound();

    return updatedTask;
  }

  /**
   * Удалить задачу
   */
  async deleteTask({ taskId }: { taskId: Types.ObjectId }): Promise<void> {
    await Task.findByIdAndDelete(taskId);
  }
}
