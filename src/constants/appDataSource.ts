import "reflect-metadata";
import entities from "./entities";
import appConfig from "./appConfig";
import { DataSource } from "typeorm";

/**
 * Ресурсы для операционной базы данных
 */
const appDataSource = new DataSource({
  type: "postgres",
  url: appConfig.POSTGRESQL_URL,
  entities,
  migrations: [
    appConfig.ENV === "production"
      ? "./dist/migrations/*.js"
      : "./src/migrations/*.ts",
  ],
  synchronize: false,
});

export default appDataSource;
