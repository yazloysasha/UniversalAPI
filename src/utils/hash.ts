import { hashSync } from "bcrypt";
import appConfig from "@constants/appConfig";

/**
 * Зашифровать значение
 */
export const hash = (value: string): string => {
  return hashSync(value, appConfig.BCRYPT_ROUNDS_COUNT);
};
