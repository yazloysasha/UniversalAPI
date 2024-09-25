import { asClass } from "awilix";
import { di, appLogger } from "@config";
import { TaskService } from "@services";

/**
 * Установить зависимости в DI-контейнере
 */
export const setupDIContainer = (): void => {
  appLogger.info("Установка зависимостей...");

  di.container.register({
    [TaskService.name]: asClass(TaskService).singleton(),
  });

  appLogger.verbose("Зависимости установлены");
};
