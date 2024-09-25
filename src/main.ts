import "dotenv/config";
import { IAppConfig } from "@types";

export const appConfig = process.env as IAppConfig;

import {
  appLogger,
  setupFastify,
  setupDIContainer,
  connectToDatabase,
} from "@config";

const bootstrapApp = async (): Promise<void> => {
  // Параллельный запуск всех систем
  await Promise.all([connectToDatabase(), setupDIContainer(), setupFastify()]);
};

bootstrapApp().catch((err) => {
  appLogger.fatal((err as Error).message);
});
