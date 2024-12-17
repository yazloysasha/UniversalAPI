/**
 * The type of value stored in the cache
 */
export type CacheType = "boolean" | "number" | "string" | "json";

export interface CacheItem {
  /**
   * The key by which the value can be obtained
   */
  key: string;

  /**
   * Value type
   */
  type: CacheType;

  /**
   * How long should it take to remember (in seconds)
   */
  duration?: number;
}
