import { connect } from "mongoose";
import { APIError } from "@/utils/APIError";
import { appLogger } from "./winstonLogger";
import appConfig from "@/constants/appConfig";

/**
 * Подключение к аналитической базе данных
 */
export const connectToAnalyticalDatabase = async (): Promise<void> => {
  if (!appConfig.MONGODB_URL) {
    throw new APIError(500, { msg: "system.NO_MONGODB_URL" });
  }

  appLogger.info("Подключение к аналитической базе данных...");

  try {
    await connect(appConfig.MONGODB_URL);

    appLogger.verbose("Соединение с аналитической базой данных установлено");
  } catch (err) {
    console.error(err);

    throw new APIError(502, { msg: "system.NO_CONNECT_MONGODB" });
  }
};
