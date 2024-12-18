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

  /**
   * Имя пользователя
   */
  @Column({ type: "text", unique: true })
  name!: string;

  /**
   * Зашифрованный пароль
   */
  @Column({ type: "text" })
  password!: string;

  /**
   * Роль пользователя
   */
  @Column({ type: "enum", enum: UserRole, nullable: true })
  role!: UserRole | null;

  /**
   * Сессии пользователя
   */
  @OneToMany(() => Session, (session) => session.user)
  sessions!: Session[];

  /**
   * Задачи пользователя
   */
  @OneToMany(() => Task, (task) => task.user)
  tasks!: Task[];

  /**
   * Последняя активность пользователя
   */
  @CreateDateColumn()
  lastVisitAt!: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
