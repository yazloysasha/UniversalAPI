import "reflect-metadata";
import { DataSource } from "typeorm";
import { Task, User } from "@entities";
import appConfig from "@consts/appConfig";

/**
 * Ресурсы для операционной базы данных
 */
export default new DataSource({
  type: "postgres",
  url: appConfig.POSTGRESQL_URL,
  entities: [Task, User],
  migrations: [
    appConfig.ENV === "development"
      ? "./src/migrations/*.ts"
      : "./build/migrations/*.js",
  ],
  synchronize: false,
  migrationsRun: true,
});
