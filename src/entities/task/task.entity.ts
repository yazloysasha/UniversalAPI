import {
  Entity,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "@entities/user";

export enum TaskStatus {
  DONE = "Done",
  NOT_DONE = "NotDone",
}

/**
 * Задача
 */
@Entity()
export class Task {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  /**
   * Описание
   */
  @Column({ type: "text" })
  content!: string;

  /**
   * Статус
   */
  @Column({ type: "enum", enum: TaskStatus })
  status!: TaskStatus;

  /**
   * Создатель задачи
   */
  @ManyToOne(() => User, (user) => user.tasks, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  user!: User;

  /**
   * Ссылка на создателя задачи
   */
  @Column()
  userId!: string;

  @CreateDateColumn()
  createdAt!: string;

  @UpdateDateColumn()
  updatedAt!: string;
}
