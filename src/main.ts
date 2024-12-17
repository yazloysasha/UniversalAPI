import {
  appLogger,
  setupFastify,
  setupDIContainer,
  connectToAnalyticalDatabase,
  connectToOperationalDatabase,
} from "@config";
import { FastifyRoutes } from "@types";
import appConfig from "@consts/appConfig";

const bootstrapApp = async (): Promise<void> => {
  // First inject all dependencies, without them nothing can work
  try {
    setupDIContainer();
  } catch (err) {
    appLogger.fatal((err as Error).message);
  }

  // Launch Fastify API
  if (appConfig.ENABLED_MODULES.includes("fastify")) {
    for (const routes in appConfig.ENABLED_FASTIFY_ROUTES) {
      try {
        await setupFastify(
          routes as FastifyRoutes,
          appConfig.ENABLED_FASTIFY_ROUTES[routes as FastifyRoutes]
        );
      } catch (err) {
        appLogger.fatal((err as Error).message);
      }
    }
  }

  // Connect to operational database
  try {
    await connectToOperationalDatabase();
  } catch (err) {
    appLogger.fatal((err as Error).message);
  }

  // Connect to analytical database
  if (appConfig.ENABLED_MODULES.includes("analytics")) {
    try {
      await connectToAnalyticalDatabase();
    } catch (err) {
      appLogger.fatal((err as Error).message);
    }
  }

  appLogger.verbose("Project launch completed");
};

bootstrapApp();
