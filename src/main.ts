import "dotenv/config";
import { IAppConfig } from "@types";

export const appConfig = process.env as IAppConfig;

import {
  appLogger,
  setupFastify,
  setupDIContainer,
  connectToAnalyticalDatabase,
  connectToOperationalDatabase,
} from "@config";

const bootstrapApp = async (): Promise<void> => {
  // Сначала установить все зависимости, без них ничего работать не может
  setupDIContainer();

  // Запустить Fastify API
  await setupFastify();

  // Подключиться к операционной базе данных
  try {
    await connectToOperationalDatabase();
  } catch (err) {
    appLogger.fatal((err as Error).message);
  }

  // Подключиться к аналитической базе данных
  try {
    await connectToAnalyticalDatabase();
  } catch (err) {
    appLogger.fatal((err as Error).message);
  }
};

bootstrapApp().catch((err) => {
  appLogger.fatal((err as Error).message);
});
