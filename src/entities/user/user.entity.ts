import {
  Entity,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Task } from "@entities/task";
import { Session } from "./session.entity";

export enum UserRole {
  ADMINISTRATOR = "Administrator",
}

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "text", unique: true })
  name!: string;

  /**
   * Encrypted password
   */
  @Column({ type: "text" })
  password!: string;

  @Column({ type: "enum", enum: UserRole, nullable: true })
  role!: UserRole | null;

  /**
   * User sessions
   */
  @OneToMany(() => Session, (session) => session.user)
  sessions!: Session[];

  /**
   * User tasks
   */
  @OneToMany(() => Task, (task) => task.user)
  tasks!: Task[];

  @CreateDateColumn()
  createdAt!: string;

  @UpdateDateColumn()
  updatedAt!: string;
}
