import { CacheItem } from "@/types/cache";

export namespace CacheContract {
  /**
   * Топ пользователей по созданным задачам
   */
  export const UsersTop: CacheItem = {
    key: "UsersTop",
    type: "array",
  };
}
