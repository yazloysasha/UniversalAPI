import "reflect-metadata";
import appConfig from "./appConfig";
import { DataSource } from "typeorm";
import { Session, Task, User } from "@entities";

/**
 * Ресурсы для операционной базы данных
 */
const appDataSource = new DataSource({
  type: "postgres",
  url: appConfig.POSTGRESQL_URL,
  entities: [Task, User, Session],
  migrations: [
    appConfig.ENV === "production"
      ? "./dist/migrations/*.js"
      : "./src/migrations/*.ts",
  ],
  synchronize: false,
});

export default appDataSource;
