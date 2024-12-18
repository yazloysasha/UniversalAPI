import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1734538903072 implements MigrationInterface {
  name = "Migration1734538903072";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "lastVisitAt" TIMESTAMP NOT NULL DEFAULT now()`
    );
    await queryRunner.query(
      `ALTER TABLE "session" ADD "lastVisitAt" TIMESTAMP NOT NULL DEFAULT now()`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "lastVisitAt"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "lastVisitAt"`);
  }
}
