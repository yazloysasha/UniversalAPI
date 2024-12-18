export type CacheType = "boolean" | "number" | "string" | "json";

export interface CacheItem {
  key: string; // Ключ, по которому можно получить значение
  type: CacheType; // Тип хранимого в кэше значения
  duration?: number; // Сколько времени нужно держать значение в памяти (в секундах)
}
