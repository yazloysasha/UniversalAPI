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
   * Session user
   */
  @ManyToOne(() => User, (user) => user.sessions, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  user!: User;

  /**
   * Link to the session user
   */
  @Column()
  userId!: string;

  @CreateDateColumn()
  createdAt!: string;

  @UpdateDateColumn()
  updatedAt!: string;
}
