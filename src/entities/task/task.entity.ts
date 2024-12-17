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

  @Column({ type: "text" })
  content!: string;

  @Column({ type: "enum", enum: TaskStatus })
  status!: TaskStatus;

  /**
   * Task creator
   */
  @ManyToOne(() => User, (user) => user.tasks, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  user!: User;

  /**
   * Link to the task creator
   */
  @Column()
  userId!: string;

  @CreateDateColumn()
  createdAt!: string;

  @UpdateDateColumn()
  updatedAt!: string;
}
