import { appConfig } from "@main";
import { connect } from "mongoose";
import { ApiError } from "@errors";
import { appLogger } from "@config";

/**
 * Подключение к операционной базе данных
 */
export const connectToAnalyticalDatabase = async (): Promise<void> => {
  if (!appConfig.MONGODB_URL) {
    throw ApiError.internalServerError({
      msg: "Не указана ссылка для подключения к аналитической базе данных",
    });
  }

  appLogger.info("Подключение к аналитической базе данных...");

  try {
    await connect(appConfig.MONGODB_URL);

    appLogger.verbose("Соединение с аналитической базой данных установлено");
  } catch (err) {
    console.error(err);

    throw ApiError.badGateway({
      msg: "Не удалось установить соединение с аналитической базой данных",
    });
  }
};
