import "reflect-metadata";
import { DataSource } from "typeorm";
import appConfig from "@consts/appConfig";
import { Session, Task, User } from "@entities";

/**
 * Resources for operational database
 */
export default new DataSource({
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
