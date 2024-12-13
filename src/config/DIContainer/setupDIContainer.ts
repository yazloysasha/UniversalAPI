import { Task } from "@entities";
import { appConfig } from "@main";
import { DataSource } from "typeorm";
import { di, appLogger } from "@config";
import { asClass, asValue } from "awilix";
import { AnalyticalService, TaskService } from "@services";

/**
 * Установить зависимости в DI-контейнере
 */
export const setupDIContainer = (): void => {
  appLogger.info("Установка зависимостей...");

  /**
   * Ресурсы для операционной базы данных
   */
  const appDataSource = new DataSource({
    type: "postgres",
    url: appConfig.OPERATIONAL_DATABASE_URL,
    entities: [Task],
    synchronize: true,
  });

  /**
   * Таблицы операционной базы данных
   */
  const taskRepository = appDataSource.getRepository(Task);

  di.container.register({
    appDataSource: asValue(appDataSource),
    taskRepository: asValue(taskRepository),

    [TaskService.name]: asClass(TaskService).singleton(),
    [AnalyticalService.name]: asClass(AnalyticalService).singleton(),
  });

  appLogger.verbose("Зависимости установлены");
};
