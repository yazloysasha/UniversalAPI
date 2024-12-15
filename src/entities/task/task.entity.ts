import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum TaskStatus {
  DONE = "DONE",
  NOT_DONE = "NOT_DONE",
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
  @Column({
    type: "text",
    nullable: false,
  })
  content!: string;

  /**
   * Статус
   */
  @Column({
    type: "enum",
    enum: TaskStatus,
    nullable: false,
  })
  status!: TaskStatus;
}
