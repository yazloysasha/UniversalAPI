import { di } from "@/config/DIContainer";
import { TaskHandler } from "@/types/cron";
import { UserService } from "@/services/user";
import { CacheService } from "@/services/cache";
import { CacheContract } from "@/contracts/cache";

export const updateUsersTopTask: TaskHandler = async (ctx) => {
  const userService = di.container.resolve<UserService>(UserService.key);
  const cacheService = di.container.resolve<CacheService>(CacheService.key);

  const usersTop = await userService.getUsersTop();

  await ctx.updateProgress(50);

  await cacheService.set(CacheContract.UsersTop, usersTop);
};
