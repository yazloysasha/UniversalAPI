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
    taskRepository: asValue(taskRepository),
    userRepository: asValue(userRepository),
    sessionRepository: asValue(sessionRepository),

    redisClient: asValue(redisClient),

    [AuthService.key]: asClass(AuthService).singleton(),
    [CronService.key]: asClass(CronService).singleton(),
    [TaskService.key]: asClass(TaskService).singleton(),
    [UserService.key]: asClass(UserService).singleton(),
    [CacheService.key]: asClass(CacheService).singleton(),
    [AnalyticalService.key]: asClass(AnalyticalService).singleton(),
  });

  appLogger.verbose("Зависимости внедрены");
};
