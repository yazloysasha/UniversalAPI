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
  @Column({
    type: "enum",
    enum: UserRole,
    enumName: "UserRole",
    nullable: true,
  })
  role!: UserRole | null;

  /**
   * Сессии пользователя
   */
  @OneToMany(() => Session, (session) => session.user)
  sessions!: Session[];

  /**
   * Количество сессий пользователя
   */
  @Column({ type: "integer", default: 0 })
  sessionsCount!: number;

  /**
   * Задачи пользователя
   */
  @OneToMany(() => Task, (task) => task.author)
  tasks!: Task[];

  /**
   * Количество задач пользователя
   */
  @Column({ type: "integer", default: 0 })
  tasksCount!: number;

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
