import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1744268116863 implements MigrationInterface {
  name = "Migration1744268116863";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "task" DROP CONSTRAINT "FK_f316d3fe53497d4d8a2957db8b9"`
    );
    await queryRunner.query(`ALTER TABLE "task" ADD "authorId" uuid NOT NULL`);
    await queryRunner.query(`ALTER TABLE "task" ADD "name" text NOT NULL`);
    await queryRunner.query(`ALTER TABLE "task" ADD "description" text`);
    await queryRunner.query(`ALTER TABLE "task" ADD "deadline" TIMESTAMP`);
    await queryRunner.query(
      `CREATE TYPE "public"."TaskPriority" AS ENUM('Low', 'Medium', 'High', 'Critical')`
    );
    await queryRunner.query(
      `ALTER TABLE "task" ADD "priority" "public"."TaskPriority" NOT NULL`
    );
    await queryRunner.query(`ALTER TABLE "task" ADD "doneAt" TIMESTAMP`);
    await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "content"`);
    await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "status"`);
    await queryRunner.query(`DROP TYPE "public"."TaskStatus"`);
    await queryRunner.query(
      `ALTER TABLE "task" ADD CONSTRAINT "FK_30cb9d78297c1f2a2e07df1a616" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "task" DROP CONSTRAINT "FK_30cb9d78297c1f2a2e07df1a616"`
    );
    await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "status"`);
    await queryRunner.query(
      `CREATE TYPE "public"."TaskStatus" AS ENUM('Done', 'NotDone')`
    );
    await queryRunner.query(
      `ALTER TABLE "task" ADD "status" "public"."TaskStatus" NOT NULL`
    );
    await queryRunner.query(`ALTER TABLE "task" ADD "content" text NOT NULL`);
    await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "doneAt"`);
    await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "priority"`);
    await queryRunner.query(`DROP TYPE "public"."TaskPriority"`);
    await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "deadline"`);
    await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "description"`);
    await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "name"`);
    await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "authorId"`);
    await queryRunner.query(
      `ALTER TABLE "task" ADD CONSTRAINT "FK_f316d3fe53497d4d8a2957db8b9" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
  }
}
