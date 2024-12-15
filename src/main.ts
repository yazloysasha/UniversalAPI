import { parseConfig } from "@utils";

export const appConfig = parseConfig();

import {
  appLogger,
  setupFastify,
  setupDIContainer,
  connectToAnalyticalDatabase,
  connectToOperationalDatabase,
} from "@config";
import { FastifyRoutes } from "@types";

const bootstrapApp = async (): Promise<void> => {
  // Сначала установить все зависимости, без них ничего работать не может
  setupDIContainer();

  // Запустить Fastify API
  if (appConfig.ENABLED_MODULES.includes("fastify")) {
    for (const routes in appConfig.ENABLED_FASTIFY_ROUTES) {
      await setupFastify(
        routes as FastifyRoutes,
        appConfig.ENABLED_FASTIFY_ROUTES[routes as FastifyRoutes]
      );
    }
  }

  // Подключиться к операционной базе данных
  try {
    await connectToOperationalDatabase();
  } catch (err) {
    appLogger.fatal((err as Error).message);
  }

  // Подключиться к аналитической базе данных
  if (appConfig.ENABLED_MODULES.includes("analytics")) {
    try {
      await connectToAnalyticalDatabase();
    } catch (err) {
      appLogger.fatal((err as Error).message);
    }
  }
};

bootstrapApp().catch((err) => {
  appLogger.fatal((err as Error).message);
});
