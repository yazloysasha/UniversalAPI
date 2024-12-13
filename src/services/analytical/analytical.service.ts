import { ErrorLog } from "@models";
import { IErrorLog } from "@types";
import { appLogger } from "@config";

/**
 * Сервис для сбора аналитики
 */
export class AnalyticalService {
  /**
   * Создать лог об ошибке
   */
  async createErrorLog(data: IErrorLog) {
    try {
      await ErrorLog.create(data);
    } catch (err) {
      appLogger.error("Не удалось создать отчёт об ошибке");

      console.error(err);
    }
  }
}
