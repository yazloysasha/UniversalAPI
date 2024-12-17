import Redis from "ioredis";
import { CacheItem } from "@types";

/**
 * Базовый сервис для работы с Redis
 */
export abstract class RedisService {
  constructor(private redisClient: Redis) {}

  private stringify<ValueType = boolean | number | string | object>(
    item: CacheItem,
    value: ValueType
  ): string {
    if (item.type === "string") {
      return value as string;
    }

    return JSON.stringify(value);
  }

  private parse<ValueType = boolean | number | string | object>(
    item: CacheItem,
    value: string
  ): ValueType {
    if (item.type === "string") {
      return value as ValueType;
    }

    return JSON.parse(value);
  }

  /**
   * Получить значение
   */
  protected async get<ValueType = boolean | number | string | object>(
    item: CacheItem
  ): Promise<ValueType | null> {
    const value = await this.redisClient.get(item.key);
    if (typeof value === "object") return value;

    return this.parse(item, value);
  }

  /**
   * Установить значение
   */
  protected async set<ValueType = boolean | number | string | object>(
    item: CacheItem,
    value: ValueType
  ): Promise<void> {
    const stringifiedValue = this.stringify(item, value);

    if (item.duration) {
      await this.redisClient.setex(item.key, item.duration, stringifiedValue);
    } else {
      await this.redisClient.set(item.key, stringifiedValue);
    }
  }

  /**
   * Удалить значение
   */
  protected async delete(item: CacheItem): Promise<void> {
    await this.redisClient.del(item.key);
  }

  async getArray<ValueType = boolean | number | string | object>(
    item: CacheItem
  ): Promise<ValueType[]> {
    const array = await this.redisClient.smembers(item.key);

    return array.map((value) => this.parse(item, value));
  }

  async addToArray<ValueType = boolean | number | string | object>(
    item: CacheItem,
    ...array: ValueType[]
  ): Promise<void> {
    const stringifiedArray = array.map((value) => this.stringify(item, value));

    await this.redisClient.sadd(item.key, ...stringifiedArray);
  }

  async removeFromArray<ValueType = boolean | number | string | object>(
    item: CacheItem,
    value: ValueType
  ): Promise<void> {
    await this.redisClient.srem(item.key, this.stringify(item, value));
  }

  async flushAll(): Promise<void> {
    await this.redisClient.flushall();
  }
}
