import { appLogger } from "@config";
import { ErrorLog, RequestLog } from "@models";
import { IErrorLog, IRequestLog } from "@types";

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

  /**
   * Создать лог о запросе
   */
  async createRequestLog(data: IRequestLog) {
    try {
      await RequestLog.create(data);
    } catch (err) {
      await this.createErrorLog({
        name: (err as Error).name,
        message: (err as Error).message,
        stack: (err as Error).stack,
      });
    }
  }
}
