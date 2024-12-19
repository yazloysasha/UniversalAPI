import { Session, Task } from "@entities";
import { createPLPGSQLTrigger } from "@helpers";
import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1734606786983 implements MigrationInterface {
  name = "Migration1734606786983";

  /**
   * Дублирование атрибута "lastVisitAt" из сессии в пользователя
   */
  private duplicateLastVisitFromSessionTrigger = createPLPGSQLTrigger<Session>({
    name: "duplicateLastVisitFromSession",
    table: "session",
    fires: "AFTER",
    events: ["INSERT", "UPDATE"],
    columns: ["lastVisitAt"],
    code: `
      BEGIN
        UPDATE "user"
        SET "lastVisitAt" = NEW."lastVisitAt"
        WHERE "id" = NEW."userId";

        RETURN NEW;
      END;
    `,
  });

  /**
   * Агрегация количества сессий в пользователя
   */
  private aggregateSessionsCountTrigger = createPLPGSQLTrigger<Session>({
    name: "aggregateSessionsCount",
    table: "session",
    fires: "AFTER",
    events: ["INSERT", "DELETE"],
    code: `
      BEGIN
        IF TG_OP = 'INSERT' THEN
          UPDATE "user"
          SET "sessionsCount" = "sessionsCount" + 1
          WHERE "id" = NEW."userId";

          RETURN NEW;
        END IF;

        UPDATE "user"
        SET "sessionsCount" = "sessionsCount" - 1
        WHERE "id" = OLD."userId";

        RETURN OLD;
      END;
    `,
  });

  /**
   * Агрегация количества задач в пользователя
   */
  private aggregateTasksCountTrigger = createPLPGSQLTrigger<Task>({
    name: "aggregateTasksCount",
    table: "task",
    fires: "AFTER",
    events: ["INSERT", "DELETE"],
    code: `
      BEGIN
        IF TG_OP = 'INSERT' THEN
          UPDATE "user"
          SET "tasksCount" = "tasksCount" + 1
          WHERE "id" = NEW."userId";

          RETURN NEW;
        END IF;

        UPDATE "user"
        SET "tasksCount" = "tasksCount" - 1
        WHERE "id" = OLD."userId";

        RETURN OLD;
      END;
    `,
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."user_role_enum" AS ENUM('Administrator')`
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "password" text NOT NULL, "role" "public"."user_role_enum", "sessionsCount" integer NOT NULL DEFAULT '0', "tasksCount" integer NOT NULL DEFAULT '0', "lastVisitAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_065d4d8f3b5adb4a08841eae3c8" UNIQUE ("name"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "session" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, "lastVisitAt" TIMESTAMP NOT NULL DEFAULT now(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f55da76ac1c3ac420f444d2ff11" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."task_status_enum" AS ENUM('Done', 'NotDone')`
    );
    await queryRunner.query(
      `CREATE TABLE "task" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "content" text NOT NULL, "status" "public"."task_status_enum" NOT NULL, "userId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_fb213f79ee45060ba925ecd576e" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "session" ADD CONSTRAINT "FK_3d2f174ef04fb312fdebd0ddc53" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "task" ADD CONSTRAINT "FK_f316d3fe53497d4d8a2957db8b9" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );

    await queryRunner.query(
      this.duplicateLastVisitFromSessionTrigger.create.procedure
    );
    await queryRunner.query(
      this.duplicateLastVisitFromSessionTrigger.create.trigger
    );
    await queryRunner.query(
      this.aggregateSessionsCountTrigger.create.procedure
    );
    await queryRunner.query(this.aggregateSessionsCountTrigger.create.trigger);
    await queryRunner.query(this.aggregateTasksCountTrigger.create.procedure);
    await queryRunner.query(this.aggregateTasksCountTrigger.create.trigger);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(this.aggregateTasksCountTrigger.drop.trigger);
    await queryRunner.query(this.aggregateTasksCountTrigger.drop.procedure);
    await queryRunner.query(this.aggregateSessionsCountTrigger.drop.trigger);
    await queryRunner.query(this.aggregateSessionsCountTrigger.drop.procedure);
    await queryRunner.query(
      this.duplicateLastVisitFromSessionTrigger.drop.trigger
    );
    await queryRunner.query(
      this.duplicateLastVisitFromSessionTrigger.drop.procedure
    );

    await queryRunner.query(
      `ALTER TABLE "task" DROP CONSTRAINT "FK_f316d3fe53497d4d8a2957db8b9"`
    );
    await queryRunner.query(
      `ALTER TABLE "session" DROP CONSTRAINT "FK_3d2f174ef04fb312fdebd0ddc53"`
    );
    await queryRunner.query(`DROP TABLE "task"`);
    await queryRunner.query(`DROP TYPE "public"."task_status_enum"`);
    await queryRunner.query(`DROP TABLE "session"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
  }
}
