import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1735136402597 implements MigrationInterface {
  name = "Migration1735136402597";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TYPE "public"."user_role_enum" RENAME TO "user_role_enum_old"`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."UserRole" AS ENUM('Administrator')`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "role" TYPE "public"."UserRole" USING "role"::"text"::"public"."UserRole"`
    );
    await queryRunner.query(`DROP TYPE "public"."user_role_enum_old"`);
    await queryRunner.query(
      `ALTER TYPE "public"."task_status_enum" RENAME TO "task_status_enum_old"`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."TaskStatus" AS ENUM('Done', 'NotDone')`
    );
    await queryRunner.query(
      `ALTER TABLE "task" ALTER COLUMN "status" TYPE "public"."TaskStatus" USING "status"::"text"::"public"."TaskStatus"`
    );
    await queryRunner.query(`DROP TYPE "public"."task_status_enum_old"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."task_status_enum_old" AS ENUM('Done', 'NotDone')`
    );
    await queryRunner.query(
      `ALTER TABLE "task" ALTER COLUMN "status" TYPE "public"."task_status_enum_old" USING "status"::"text"::"public"."task_status_enum_old"`
    );
    await queryRunner.query(`DROP TYPE "public"."TaskStatus"`);
    await queryRunner.query(
      `ALTER TYPE "public"."task_status_enum_old" RENAME TO "task_status_enum"`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."user_role_enum_old" AS ENUM('Administrator')`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "role" TYPE "public"."user_role_enum_old" USING "role"::"text"::"public"."user_role_enum_old"`
    );
    await queryRunner.query(`DROP TYPE "public"."UserRole"`);
    await queryRunner.query(
      `ALTER TYPE "public"."user_role_enum_old" RENAME TO "user_role_enum"`
    );
  }
}
