import { APIError } from "@utils";
import { Repository } from "typeorm";
import { Task, TaskPriority, TaskStatus } from "@entities";
import { RegularTask, IPagination, ITaskFilter, TaskSort } from "@types";

/**
 * Сервис для управления задачами
 */
export class TaskService {
  static key = "taskService";

  constructor(private taskRepository: Repository<Task>) {}

  private regularAttributes: (keyof Task)[] = [
    "id",
    "name",
    "description",
    "deadline",
    "status",
    "priority",
    "createdAt",
    "updatedAt",
  ];

  /**
   * Получить статус задачи
   */
  private getStatus(task: Task): TaskStatus {
    return task.doneAt === null
      ? task.deadline === null || task.deadline >= new Date()
        ? TaskStatus.ACTIVE
        : TaskStatus.OVERDUE
      : task.deadline === null || task.deadline >= task.doneAt
      ? TaskStatus.COMPLETED
      : TaskStatus.LATE;
  }

  /**
   * Получить приоритет по слову
   */
  private getPriorityByWord(word: string): TaskPriority | undefined {
    switch (word) {
      case "!1":
        return TaskPriority.CRITICAL;

      case "!2":
        return TaskPriority.HIGH;

      case "!3":
        return TaskPriority.MEDIUM;

      case "!4":
        return TaskPriority.LOW;
    }
  }

  /**
   * Получить вычисляемые параметры для задачи
   */
  private getCalculatedParams(name: string): {
    name: string;
    deadline: Date | undefined;
    priority: TaskPriority | undefined;
  } {
    let words = name.split(/\s/g).filter((word) => word.length);

    if (!words.length) {
      throw new APIError(400, { msg: "services.task.EMPTY_NAME" });
    }

    let deadline: Date | undefined;
    let priority: TaskPriority | undefined;

    words = words.filter((word, index) => {
      if (word === "!before") {
        const nextWord = words![index + 1];

        if (
          nextWord &&
          (/^\d{2}\.\d{2}\.\d{4}$/.test(nextWord) ||
            /^\d{2}-\d{2}-\d{4}$/.test(nextWord))
        ) {
          return false;
        }
      }

      const previousWord = words![index - 1];

      if (previousWord === "!before") {
        let args: string[] | undefined;

        if (/^\d{2}\.\d{2}\.\d{4}$/.test(word)) {
          args = word.split(".");
        }

        if (/^\d{2}-\d{2}-\d{4}$/.test(word)) {
          args = word.split("-");
        }

        if (args) {
          const [day, month, year] = args.map(Number);

          deadline = new Date(year, month - 1, day);

          return false;
        }
      }

      const newPriority = this.getPriorityByWord(word);

      if (newPriority) {
        priority = newPriority;
      }

      return !newPriority;
    });

    return {
      name: words.join(" "),
      deadline,
      priority,
    };
  }

  /**
   * Получить список задач
   */
  async getTasks({
    authorId,
    pagination,
    filter,
    sort,
  }: {
    authorId: string;
    pagination: IPagination;
    filter: ITaskFilter;
    sort: TaskSort;
  }): Promise<{
    totalSize: number;
    tasks: RegularTask[];
  }> {
    const [tasks, totalSize] = await this.taskRepository.findAndCount({
      where: {
        authorId,
        status: filter.status,
        priority: filter.priority,
      },
      select: this.regularAttributes,
      skip: pagination.skip,
      take: pagination.limit,
      order: {
        name: sort.name,
        description: sort.description,
        deadline: sort.deadline,
        createdAt: sort.createdAt,
        updatedAt: sort.updatedAt,
      },
    });

    return {
      totalSize,
      tasks,
    };
  }

  /**
   * Создать задачу
   */
  async createTask({
    authorId,
    name,
    description,
    deadline,
    priority,
  }: {
    authorId: string;
    name: string;
    description: string | null;
    deadline: Date | null;
    priority: TaskPriority | null;
  }): Promise<RegularTask> {
    const calculatedParams = this.getCalculatedParams(name);

    const task = this.taskRepository.create({
      authorId,
      name: calculatedParams.name,
      description,
      deadline: deadline || calculatedParams.deadline,
      priority: priority || calculatedParams.priority || TaskPriority.MEDIUM,
    });

    await this.taskRepository.insert(task);

    if (!task.deadline) {
      task.deadline = null;
    }

    if (!task.status) {
      task.status = TaskStatus.ACTIVE;
    }

    return task;
  }

  /**
   * Получить задачу
   */
  async getTask({
    taskId,
    authorId,
  }: {
    taskId: string;
    authorId: string;
  }): Promise<RegularTask> {
    const task = await this.taskRepository.findOne({
      where: { id: taskId, authorId },
      select: this.regularAttributes,
    });

    if (!task) throw new APIError(404);

    return task;
  }

  /**
   * Отредактировать задачу
   */
  async editTask({
    taskId,
    authorId,
    name,
    description,
    deadline,
    priority,
    done,
  }: {
    taskId: string;
    authorId: string;
    name?: string;
    description?: string | null;
    deadline?: Date | null;
    priority?: TaskPriority | null;
    done?: boolean;
  }): Promise<RegularTask> {
    const calculatedParams = name ? this.getCalculatedParams(name) : undefined;

    const result = await this.taskRepository
      .createQueryBuilder()
      .update()
      .set({
        name: calculatedParams?.name,
        description,
        deadline: deadline || calculatedParams?.deadline,
        priority: priority || calculatedParams?.priority,
        doneAt: done ? new Date() : null,
      })
      .where({ id: taskId, authorId })
      .returning(this.regularAttributes.filter((key) => key !== "status"))
      .execute();

    if (!result.affected) throw new APIError(404);

    const task = result.raw[0];

    task.status = this.getStatus(task);

    return task;
  }

  /**
   * Удалить задачу
   */
  async deleteTask({
    taskId,
    authorId,
  }: {
    taskId: string;
    authorId: string;
  }): Promise<void> {
    const result = await this.taskRepository.delete({ id: taskId, authorId });

    if (!result.affected) throw new APIError(404);
  }
}
