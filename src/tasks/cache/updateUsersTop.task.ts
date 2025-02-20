import { di } from "@config";
import { TaskHandler } from "@types";
import { CacheContract } from "@contracts";
import { CacheService, UserService } from "@services";

export const updateUsersTopTask: TaskHandler = async (ctx) => {
  const userService = di.container.resolve<UserService>(UserService.key);
  const cacheService = di.container.resolve<CacheService>(CacheService.key);

  const usersTop = await userService.getUsersTop();

  await ctx.updateProgress(50);

  await cacheService.set(CacheContract.UsersTop, usersTop);
};
