import Redis from "ioredis";
import { CacheItem } from "@types";
import { isAsyncFunction } from "util/types";
import { RedisService } from "./redis.service";

/**
 * Сервис для работы с кэшем
 */
export class CacheService extends RedisService {
  static key = "cacheService";

  constructor(redisClient: Redis) {
    super(redisClient);
  }

  /**
   * Получить или установить значение
   */
  async getOrSet<ValueType = boolean | number | string | any[] | object>({
    item,
    func,
  }: {
    item: CacheItem;
    func: () => ValueType | Promise<ValueType>;
  }): Promise<ValueType | null> {
    const value = await this.get<ValueType>(item);
    if (value) return value;

    // Выполнить функцию, которую указали для обновления кэша
    const newValue = isAsyncFunction(func) ? await func() : func();

    // Обновить значение в кэше
    await this.set(item, newValue);

    return newValue;
  }
}
