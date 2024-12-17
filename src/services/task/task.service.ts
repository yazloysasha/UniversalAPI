import { ApiError } from "@errors";
import { Repository } from "typeorm";
import { Task, TaskStatus } from "@entities";
import { RegularTask, IPagination } from "@types";

/**
 * Task management service
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

  async getTasks({
    userId,
    pagination,
  }: {
    userId: string;
    pagination: IPagination;
  }): Promise<{
    totalSize: number;
    tasks: RegularTask[];
  }> {
    const [totalSize, tasks] = await Promise.all([
      this.taskRepository.count(),
      this.taskRepository.find({
        skip: pagination.skip,
        take: pagination.limit,
        select: this.regularAttributes,
        where: { userId },
      }),
    ]);

    return {
      totalSize,
      tasks,
    };
  }

  async replaceTasks({
    userId,
    tasks,
  }: {
    userId: string;
    tasks: Pick<Task, "content" | "status">[];
  }): Promise<void> {
    await this.taskRepository.delete({ userId });

    await this.taskRepository.insert(
      tasks.map((task) => ({ ...task, userId }))
    );
  }

  async createTask({
    userId,
    content,
    status,
  }: {
    userId: string;
    content: string;
    status: TaskStatus;
  }): Promise<RegularTask> {
    const task = this.taskRepository.create({
      content,
      status,
      userId,
    });

    await this.taskRepository.insert(task);

    return task;
  }

  async getTask({
    userId,
    taskId,
  }: {
    userId: string;
    taskId: string;
  }): Promise<RegularTask> {
    const task = await this.taskRepository.findOne({
      where: { id: taskId, userId },
      select: this.regularAttributes,
    });

    if (!task) throw ApiError.notFound();

    return task;
  }

  async editTask({
    userId,
    taskId,
    content,
    status,
  }: {
    userId: string;
    taskId: string;
    content?: string;
    status?: TaskStatus;
  }): Promise<RegularTask> {
    const result = await this.taskRepository
      .createQueryBuilder()
      .update()
      .set({ content, status })
      .where({ id: taskId, userId })
      .returning(this.regularAttributes)
      .execute();

    if (!result.affected) throw ApiError.notFound();

    return result.raw[0];
  }

  async deleteTask({
    userId,
    taskId,
  }: {
    userId: string;
    taskId: string;
  }): Promise<void> {
    const result = await this.taskRepository.delete({ id: taskId, userId });

    if (!result.affected) throw ApiError.notFound();
  }
}
