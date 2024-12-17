import Redis from "ioredis";
import { CacheItem } from "@types";
import { isAsyncFunction } from "util/types";
import { RedisService } from "./redis.service";

/**
 * Service for working with cache
 */
export class CacheService extends RedisService {
  constructor(redisClient: Redis) {
    super(redisClient);
  }

  /**
   * Get or set a value in the cache
   */
  async getOrSet<ValueType = boolean | number | string | object>({
    item,
    func,
  }: {
    item: CacheItem;
    func: () => ValueType | Promise<ValueType>;
  }): Promise<ValueType | null> {
    const value = await this.get<ValueType>(item);
    if (value) return value;

    // Execute the function you specified to update the cache
    const newValue = isAsyncFunction(func) ? await func() : func();

    // Update value in cache
    await this.set(item, newValue);

    return newValue;
  }
}
