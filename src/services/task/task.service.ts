import { RegularTask } from "@types";
import { ApiError } from "@errors";
import { IPagination } from "@types";
import { Repository } from "typeorm";
import { Task, TaskStatus } from "@entities";

/**
 * Сервис для управления задачами
 */
export class TaskService {
  constructor(private taskRepository: Repository<Task>) {}

  private regularAttributes: (keyof Task)[] = [
    "id",
    "content",
    "status",
    "createdAt",
    "updatedAt",
  ];

  /**
   * Получить все задачи
   */
  async getTasks({ pagination }: { pagination: IPagination }): Promise<{
    totalSize: number;
    tasks: RegularTask[];
  }> {
    const [totalSize, tasks] = await Promise.all([
      this.taskRepository.count(),
      this.taskRepository.find({
        skip: pagination.skip,
        take: pagination.limit,
        select: this.regularAttributes,
      }),
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
    tasks: Pick<Task, "content" | "status">[];
  }): Promise<void> {
    await this.taskRepository.delete({});

    await this.taskRepository.insert(tasks);
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
  }): Promise<RegularTask> {
    const task = this.taskRepository.create({
      content,
      status,
    });

    await this.taskRepository.insert(task);

    return task;
  }

  /**
   * Получить задачу
   */
  async getTask({ taskId }: { taskId: string }): Promise<RegularTask> {
    const task = await this.taskRepository.findOne({
      where: { id: taskId },
      select: this.regularAttributes,
    });

    if (!task) throw ApiError.notFound();

    return task;
  }

  /**
   * Отредактировать задачу
   */
  async editTask({
    taskId,
    content,
    status,
  }: {
    taskId: string;
    content?: string;
    status?: TaskStatus;
  }): Promise<RegularTask> {
    const result = await this.taskRepository
      .createQueryBuilder()
      .update()
      .set({ content, status })
      .where({ id: taskId })
      .returning(this.regularAttributes)
      .execute();

    if (!result.affected) throw ApiError.notFound();

    return result.raw[0];
  }

  /**
   * Удалить задачу
   */
  async deleteTask({ taskId }: { taskId: string }): Promise<void> {
    const result = await this.taskRepository.delete({ id: taskId });

    if (!result.affected) throw ApiError.notFound();
  }
}
