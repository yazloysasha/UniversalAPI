import "dotenv/config";
import { Task } from "@entities";
import { IAppConfig } from "@types";
import { DataSource } from "typeorm";

export const appConfig = process.env as IAppConfig;

export const appDataSource = new DataSource({
  type: "postgres",
  url: appConfig.DATABASE_URL,
  entities: [Task],
  synchronize: true,
});

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
