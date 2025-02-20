import Redis from "ioredis";
import { BasicType, CacheItem } from "@types";

/**
 * Базовый сервис для работы с Redis
 */
export abstract class RedisService {
  static key = "redisService";

  constructor(private redisClient: Redis) {}

  private stringify<ValueType = BasicType | BasicType[]>(
    item: CacheItem,
    value: ValueType
  ): string {
    if (item.type === "string") {
      return value as string;
    }

    return JSON.stringify(value);
  }

  private parse<ValueType = BasicType | BasicType[]>(
    item: CacheItem,
    value: string
  ): ValueType {
    if (item.type === "string") {
      return value as ValueType;
    }

    return JSON.parse(value);
  }

  /**
   * Получить значение из кэша
   */
  async get<ValueType = BasicType | BasicType[]>(
    item: CacheItem
  ): Promise<ValueType | null> {
    const value = await this.redisClient.get(item.key);
    if (typeof value === "object") return value;

    return this.parse(item, value);
  }

  /**
   * Установить значение в кэш
   */
  async set<ValueType = BasicType | BasicType[]>(
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
   * Удалить значение из кэша
   */
  async delete(item: CacheItem): Promise<void> {
    await this.redisClient.del(item.key);
  }

  async getArray<ValueType = BasicType | BasicType[]>(
    item: CacheItem
  ): Promise<ValueType[]> {
    const array = await this.redisClient.smembers(item.key);

    return array.map((value) => this.parse(item, value));
  }

  async addToArray<ValueType = BasicType | BasicType[]>(
    item: CacheItem,
    ...array: ValueType[]
  ): Promise<void> {
    const stringifiedArray = array.map((value) => this.stringify(item, value));

    await this.redisClient.sadd(item.key, ...stringifiedArray);
  }

  async removeFromArray<ValueType = BasicType | BasicType[]>(
    item: CacheItem,
    value: ValueType
  ): Promise<void> {
    await this.redisClient.srem(item.key, this.stringify(item, value));
  }

  async flushAll(): Promise<void> {
    await this.redisClient.flushall();
  }
}
