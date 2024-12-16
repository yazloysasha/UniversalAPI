import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from "typeorm";

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

  @CreateDateColumn()
  createdAt!: string;

  @UpdateDateColumn()
  updatedAt!: string;
}
