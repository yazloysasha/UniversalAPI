import {
  Entity,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "../user";

export enum TaskStatus {
  DONE = "Done",
  NOT_DONE = "NotDone",
}

@Entity()
export class Task {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  /**
   * Описание задачи
   */
  @Column({ type: "text" })
  content!: string;

  /**
   * Статус задачи
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
