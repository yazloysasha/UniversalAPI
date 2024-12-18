import { ITask } from "@types";
import { clearingUnusualSessionsTask } from "@tasks";

export namespace CronContract {
  /**
   * Очистка старых сессий пользователей (каждый день в 4 утра)
   */
  export const ClearingUnusualSessions: ITask = {
    name: "ClearingUnusualSessions",
    schedule: "0 4 */1 * *",
    handler: clearingUnusualSessionsTask,
  };
}
