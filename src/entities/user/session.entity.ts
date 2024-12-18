import {
  Entity,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Session {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  /**
   * Пользователь сессии
   */
  @ManyToOne(() => User, (user) => user.sessions, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  user!: User;

  /**
   * Ссылка на пользователя сессии
   */
  @Column()
  userId!: string;

  /**
   * Последняя активность сессии
   */
  @CreateDateColumn()
  lastVisitAt!: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
