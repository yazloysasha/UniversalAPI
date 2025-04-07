import {
  Entity,
  Column,
  ManyToOne,
  VirtualColumn,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "../user";

export enum TaskStatus {
  ACTIVE = "Active",
  COMPLETED = "Completed",
  OVERDUE = "Overdue",
  LATE = "Late",
}

export enum TaskPriority {
  LOW = "Low",
  MEDIUM = "Medium",
  HIGH = "High",
  CRITICAL = "Critical",
}

@Entity()
export class Task {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  /**
   * Создатель задачи
   */
  @ManyToOne(() => User, (user) => user.tasks, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  author!: User;

  /**
   * Ссылка на создателя задачи
   */
  @Column({ type: "text" })
  authorId!: string;

  /**
   * Название задачи
   */
  @Column({ type: "text" })
  name!: string;

  /**
   * Описание задачи
   */
  @Column({ type: "text", nullable: true })
  description!: string | null;

  /**
   * Дата выполнения задачи
   */
  @Column({ type: "timestamp", nullable: true })
  deadline!: Date | null;

  /**
   * Статус задачи
   */
  @VirtualColumn({
    query: (alias) => `
      CASE WHEN ${alias}.doneAt IS NULL THEN (
        CASE WHEN ${alias}.deadline IS NULL OR ${alias}.deadline >= NOW() THEN (
          '${TaskStatus.ACTIVE}'
        ) ELSE (
          '${TaskStatus.OVERDUE}'
        ) END
      ) ELSE (
        CASE WHEN ${alias}.deadline IS NULL OR ${alias}.deadline >= ${alias}.doneAt THEN (
          '${TaskStatus.COMPLETED}'
        ) ELSE (
          '${TaskStatus.LATE}'
        ) END
      ) END
    `,
  })
  status!: TaskStatus;

  /**
   * Приоритет
   */
  @Column({ type: "enum", enum: TaskPriority, enumName: "TaskPriority" })
  priority!: TaskPriority;

  /**
   * Дата отметки о выполнении
   */
  @Column({ type: "timestamp", nullable: true })
  doneAt!: Date | null;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
