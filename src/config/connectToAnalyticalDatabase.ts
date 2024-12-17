import { connect } from "mongoose";
import { ApiError } from "@errors";
import { appLogger } from "@config";
import appConfig from "@consts/appConfig";

/**
 * Connecting to analytical database
 */
export const connectToAnalyticalDatabase = async (): Promise<void> => {
  if (!appConfig.MONGODB_URL) {
    throw ApiError.internalServerError({
      msg: "Не указана ссылка для подключения к аналитической базе данных",
    });
  }

  appLogger.info("Connecting to analytical database...");

  try {
    await connect(appConfig.MONGODB_URL);

    appLogger.verbose("Connection to analytical database established");
  } catch (err) {
    console.error(err);

    throw ApiError.badGateway({
      msg: "Failed to establish connection to analytical database",
    });
  }
};
