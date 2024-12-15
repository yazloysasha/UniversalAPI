import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
  @Column({
    type: "text",
    nullable: false,
  })
  name!: string;

  /**
   * Зашифрованный пароль
   */
  @Column({
    type: "text",
    nullable: false,
  })
  password!: string;
}
