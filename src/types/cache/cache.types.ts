/**
 * Тип хранимого в кэше значения
 */
export type CacheType = "boolean" | "number" | "string" | "json";

export interface CacheItem {
  /**
   * Ключ, по которому можно получить значение
   */
  key: string;

  /**
   * Тип значения
   */
  type: CacheType;

  /**
   * Сколько времено нужно держать в памяти (в секундах)
   */
  duration?: number;
}
