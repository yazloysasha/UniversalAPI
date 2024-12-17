import {
  AuthService,
  TaskService,
  UserService,
  CacheService,
  AnalyticalService,
} from "@services";
import { asClass, asValue } from "awilix";
import { Session, Task, User } from "@entities";
import appDataSource from "@consts/appDataSource";
import { di, appLogger, RedisClient } from "@config";

/**
 * Setup dependencies in DI container
 */
export const setupDIContainer = (): void => {
  appLogger.info("Injecting dependencies...");

  /**
   * Operational database tables
   */
  const taskRepository = appDataSource.getRepository(Task);
  const userRepository = appDataSource.getRepository(User);
  const sessionRepository = appDataSource.getRepository(Session);

  /**
   * Caching database client
   */
  const redisClient = RedisClient.getInstance();

  di.container.register({
    appDataSource: asValue(appDataSource),
    taskRepository: asValue(taskRepository),
    userRepository: asValue(userRepository),
    sessionRepository: asValue(sessionRepository),

    redisClient: asValue(redisClient),

    [AuthService.name]: asClass(AuthService).singleton(),
    [TaskService.name]: asClass(TaskService).singleton(),
    [UserService.name]: asClass(UserService).singleton(),
    [CacheService.name]: asClass(CacheService).singleton(),
    [AnalyticalService.name]: asClass(AnalyticalService).singleton(),
  });

  appLogger.verbose("Dependencies are injected");
};
