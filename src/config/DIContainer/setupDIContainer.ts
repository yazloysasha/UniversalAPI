import { Task, User } from "@entities";
import { di, appLogger } from "@config";
import { asClass, asValue } from "awilix";
import appDataSource from "@consts/appDataSource";
import { AnalyticalService, TaskService } from "@services";

/**
 * Установить зависимости в DI-контейнере
 */
export const setupDIContainer = (): void => {
  appLogger.info("Установка зависимостей...");

  /**
   * Таблицы операционной базы данных
   */
  const taskRepository = appDataSource.getRepository(Task);
  const userRepository = appDataSource.getRepository(User);

  di.container.register({
    appDataSource: asValue(appDataSource),
    taskRepository: asValue(taskRepository),
    userRepository: asValue(userRepository),

    [TaskService.name]: asClass(TaskService).singleton(),
    [AnalyticalService.name]: asClass(AnalyticalService).singleton(),
  });

  appLogger.verbose("Зависимости установлены");
};
