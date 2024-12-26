import {
  appLogger,
  setupFastify,
  setupTaskQueue,
  setupDIContainer,
  setupMultilingualism,
  connectToAnalyticalDatabase,
  connectToOperationalDatabase,
} from "@config";
import { FastifyRoutes } from "@types";
import appConfig from "@constants/appConfig";

const bootstrapApp = async (): Promise<void> => {
  // Инициализировать мультиязычность
  setupMultilingualism();

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
