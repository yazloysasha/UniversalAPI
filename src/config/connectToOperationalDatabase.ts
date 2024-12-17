import { ApiError } from "@errors";
import { DataSource } from "typeorm";
import { appLogger, di } from "@config";
import appConfig from "@consts/appConfig";

/**
 * Connecting to operational database
 */
export const connectToOperationalDatabase = async (): Promise<void> => {
  const appDataSource = di.container.resolve<DataSource>("appDataSource");

  if (!appConfig.POSTGRESQL_URL) {
    throw ApiError.internalServerError({
      msg: "Не указана ссылка для подключения к операционной базе данных",
    });
  }

  appLogger.info("Connecting to operational database...");

  try {
    await appDataSource.initialize();

    appLogger.verbose("Connection to operational database established");
  } catch (err) {
    console.error(err);

    throw ApiError.badGateway({
      msg: "Failed to establish connection to operational database",
    });
  }
};
