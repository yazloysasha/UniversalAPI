import { APIError } from "@/utils/APIError";
import { appLogger } from "./winstonLogger";
import appConfig from "@/constants/appConfig";
import appDataSource from "@/constants/appDataSource";

/**
 * Подключение к операционной базе данных
 */
export const connectToOperationalDatabase = async (): Promise<void> => {
  if (!appConfig.POSTGRESQL_URL) {
    throw new APIError(500, { msg: "system.NO_POSTGRESQL_URL" });
  }

  appLogger.info("Подключение к операционной базе данных...");

  try {
    await appDataSource.initialize();

    appLogger.verbose("Соединение с операционной базой данных установлено");
  } catch (err) {
    console.error(err);

    throw new APIError(502, { msg: "system.NO_CONNECT_POSTGRESQL" });
  }
};
