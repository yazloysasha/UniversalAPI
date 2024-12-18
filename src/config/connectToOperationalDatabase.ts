import { ApiError } from "@errors";
import { DataSource } from "typeorm";
import { appLogger, di } from "@config";
import appConfig from "@constants/appConfig";

/**
 * Подключение к операционной базе данных
 */
export const connectToOperationalDatabase = async (): Promise<void> => {
  const appDataSource = di.container.resolve<DataSource>("appDataSource");

  if (!appConfig.POSTGRESQL_URL) {
    throw ApiError.new(500, { msg: "system.NO_POSTGRESQL_URL" });
  }

  appLogger.info("Подключение к операционной базе данных...");

  try {
    await appDataSource.initialize();

    appLogger.verbose("Соединение с операционной базой данных установлено");
  } catch (err) {
    console.error(err);

    throw ApiError.new(502, { msg: "system.NO_CONNECT_POSTGRESQL" });
  }
};
