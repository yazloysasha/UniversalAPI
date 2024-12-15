import { appConfig } from "@main";
import { ApiError } from "@errors";
import { DataSource } from "typeorm";
import { appLogger, di } from "@config";

/**
 * Подключение к операционной базе данных
 */
export const connectToOperationalDatabase = async (): Promise<void> => {
  const appDataSource = di.container.resolve<DataSource>("appDataSource");

  if (!appConfig.POSTGRESQL_URL) {
    throw ApiError.internalServerError({
      msg: "Не указана ссылка для подключения к операционной базе данных",
    });
  }

  appLogger.info("Подключение к операционной базе данных...");

  try {
    await appDataSource.initialize();

    appLogger.verbose("Соединение с операционной базой данных установлено");
  } catch (err) {
    console.error(err);

    throw ApiError.badGateway({
      msg: "Не удалось установить соединение с операционной базой данных",
    });
  }
};
