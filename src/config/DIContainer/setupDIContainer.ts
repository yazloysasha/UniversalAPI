import {
  AuthService,
  CronService,
  TaskService,
  UserService,
  CacheService,
  AnalyticalService,
} from "@services";
import { asClass, asValue } from "awilix";
import { Session, Task, User } from "@entities";
import appDataSource from "@constants/appDataSource";
import { di, appLogger, RedisClient } from "@config";

/**
 * Внедрить зависимости в DI-контейнер
 */
export const setupDIContainer = (): void => {
  appLogger.info("Внедрение зависимостей...");

  // Таблицы операционной базы данных
  const taskRepository = appDataSource.getRepository(Task);
  const userRepository = appDataSource.getRepository(User);
  const sessionRepository = appDataSource.getRepository(Session);

  // Клиент для кэширующей базы данных
  const redisClient = RedisClient.getInstance();

  di.container.register({
    appDataSource: asValue(appDataSource),
    taskRepository: asValue(taskRepository),
    userRepository: asValue(userRepository),
    sessionRepository: asValue(sessionRepository),

    redisClient: asValue(redisClient),

    [AuthService.name]: asClass(AuthService).singleton(),
    [CronService.name]: asClass(CronService).singleton(),
    [TaskService.name]: asClass(TaskService).singleton(),
    [UserService.name]: asClass(UserService).singleton(),
    [CacheService.name]: asClass(CacheService).singleton(),
    [AnalyticalService.name]: asClass(AnalyticalService).singleton(),
  });

  appLogger.verbose("Зависимости внедрены");
};
