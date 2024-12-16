import {
  Entity,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Session } from "./session.entity";

/**
 * Пользователь
 */
@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  /**
   * Имя
   */
  @Column({ type: "text", unique: true })
  name!: string;

  /**
   * Зашифрованный пароль
   */
  @Column({ type: "text" })
  password!: string;

  /**
   * Сессии пользователя
   */
  @OneToMany(() => Session, (session) => session.user)
  sessions!: Session[];

  @CreateDateColumn()
  createdAt!: string;

  @UpdateDateColumn()
  updatedAt!: string;
}
