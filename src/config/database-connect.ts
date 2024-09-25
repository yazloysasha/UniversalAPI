import { appConfig } from "@main";
import { connect } from "mongoose";
import { ApiError } from "@errors";
import { appLogger } from "@config";

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
    await connect(appConfig.DATABASE_URL);

    appLogger.verbose("Соединение с базой данных установлено");
  } catch (err) {
    console.error(err);

    throw ApiError.internalServerError({
      msg: "Не удалось установить соединение с базой данных",
    });
  }
};
