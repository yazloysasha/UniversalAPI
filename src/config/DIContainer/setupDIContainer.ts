import {
  AuthService,
  TaskService,
  UserService,
  AnalyticalService,
} from "@services";
import { di, appLogger } from "@config";
import { asClass, asValue } from "awilix";
import { Session, Task, User } from "@entities";
import appDataSource from "@consts/appDataSource";

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
  const sessionRepository = appDataSource.getRepository(Session);

  di.container.register({
    appDataSource: asValue(appDataSource),
    taskRepository: asValue(taskRepository),
    userRepository: asValue(userRepository),
    sessionRepository: asValue(sessionRepository),

    [AuthService.name]: asClass(AuthService).singleton(),
    [TaskService.name]: asClass(TaskService).singleton(),
    [UserService.name]: asClass(UserService).singleton(),
    [AnalyticalService.name]: asClass(AnalyticalService).singleton(),
  });

  appLogger.verbose("Зависимости установлены");
};
