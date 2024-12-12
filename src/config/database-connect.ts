import { ApiError } from "@errors";
import { appLogger } from "@config";
import { appConfig, appDataSource } from "@main";

/**
 * Подключение к базе данных
 */
export const connectToDatabase = async (): Promise<void> => {
  if (!appConfig.DATABASE_URL) {
    throw ApiError.internalServerError({
      msg: "Не указана ссылка для подключения к базе данных",
    });
  }

  appLogger.info("Подключение к базе данных...");

  try {
    await appDataSource.initialize();

    appLogger.verbose("Соединение с базой данных установлено");
  } catch (err) {
    console.error(err);

    throw ApiError.internalServerError({
      msg: "Не удалось установить соединение с базой данных",
    });
  }
};
