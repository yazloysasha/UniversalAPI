import "@/config/setupMultilingualism";

import appConfig from "@/constants/appConfig";
import { FastifyRoutes } from "@/types/shared";
import { setupFastify } from "@/config/fastify";
import { appLogger } from "@/config/winstonLogger";
import { setupDIContainer } from "@/config/DIContainer";
import { setupTaskQueue } from "@/config/setupTaskQueue";
import { connectToAnalyticalDatabase } from "@/config/connectToAnalyticalDatabase";
import { connectToOperationalDatabase } from "@/config/connectToOperationalDatabase";

const bootstrapApp = async (): Promise<void> => {
  // Сначала установить все зависимости, без них ничего не может работать
  setupDIContainer();

  // Запустить Fastify API
  if (appConfig.ENABLED_MODULES.includes("fastify")) {
    for (const routes in appConfig.ENABLED_FASTIFY_ROUTES) {
      try {
        await setupFastify(routes as FastifyRoutes);
      } catch (err) {
        appLogger.fatal((err as Error).message, true);
      }
    }
  }

  // Подключиться к операционной базе данных
  try {
    await connectToOperationalDatabase();
  } catch (err) {
    appLogger.fatal((err as Error).message, true);
  }

  // Подключиться к аналитической базе данных
  if (appConfig.ENABLED_MODULES.includes("analytics")) {
    try {
      await connectToAnalyticalDatabase();
    } catch (err) {
      appLogger.fatal((err as Error).message, true);
    }
  }

  // Запустить очередь задач
  if (appConfig.ENABLED_MODULES.includes("queue")) {
    try {
      setupTaskQueue();
    } catch (err) {
      appLogger.fatal((err as Error).message, true);
    }
  }

  appLogger.verbose("Запуск проекта завершён");
};

bootstrapApp();
