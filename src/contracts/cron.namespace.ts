import { ITask } from "@types";
import { clearingUnusualSessionsTask, updateUsersTopTask } from "@tasks";

export namespace CronContract {
  /**
   * Очистка старых сессий пользователей (каждый день в 4 утра)
   */
  export const ClearingUnusualSessions: ITask = {
    name: "ClearingUnusualSessions",
    schedule: "0 4 */1 * *",
    handler: clearingUnusualSessionsTask,
  };

  /**
   * Обновить топ пользователей (каждый час)
   */
  export const UpdateUsersTop: ITask = {
    name: "UpdateUsersTop",
    schedule: "0 */1 * * *",
    handler: updateUsersTopTask,
  };
}
