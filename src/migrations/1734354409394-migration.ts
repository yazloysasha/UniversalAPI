import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1734354409394 implements MigrationInterface {
  name = "Migration1734354409394";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "task" ADD "userId" uuid NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "task" ADD CONSTRAINT "FK_f316d3fe53497d4d8a2957db8b9" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "task" DROP CONSTRAINT "FK_f316d3fe53497d4d8a2957db8b9"`
    );
    await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "userId"`);
  }
}
