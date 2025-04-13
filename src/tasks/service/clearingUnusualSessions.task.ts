import { di } from "@/config/DIContainer";
import { TaskHandler } from "@/types/cron";
import { AuthService } from "@/services/auth";

export const clearingUnusualSessionsTask: TaskHandler = async () => {
  const authService = di.container.resolve<AuthService>(AuthService.key);

  await authService.clearInactiveSessions();
};
