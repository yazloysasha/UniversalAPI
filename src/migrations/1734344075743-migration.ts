import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1734344075743 implements MigrationInterface {
  name = "Migration1734344075743";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."user_role_enum" AS ENUM('Administrator')`
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "role" "public"."user_role_enum"`
    );
    await queryRunner.query(
      `ALTER TYPE "public"."task_status_enum" RENAME TO "task_status_enum_old"`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."task_status_enum" AS ENUM('Done', 'NotDone')`
    );
    await queryRunner.query(
      `ALTER TABLE "task" ALTER COLUMN "status" TYPE "public"."task_status_enum" USING "status"::"text"::"public"."task_status_enum"`
    );
    await queryRunner.query(`DROP TYPE "public"."task_status_enum_old"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."task_status_enum_old" AS ENUM('DONE', 'NOT_DONE')`
    );
    await queryRunner.query(
      `ALTER TABLE "task" ALTER COLUMN "status" TYPE "public"."task_status_enum_old" USING "status"::"text"::"public"."task_status_enum_old"`
    );
    await queryRunner.query(`DROP TYPE "public"."task_status_enum"`);
    await queryRunner.query(
      `ALTER TYPE "public"."task_status_enum_old" RENAME TO "task_status_enum"`
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "role"`);
    await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
  }
}
