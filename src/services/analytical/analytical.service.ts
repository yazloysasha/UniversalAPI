import { appLogger } from "@config";
import appConfig from "@constants/appConfig";
import { ErrorLog, RequestLog } from "@models";
import { IErrorLog, IRequestLog } from "@types";

/**
 * Сервис для сбора аналитики
 */
export class AnalyticalService {
  private enabled = appConfig.ENABLED_MODULES.includes("analytics");

  async createErrorLog(data: IErrorLog): Promise<void> {
    if (!this.enabled) {
      appLogger.error(`${data.name}: ${data.message || "???"}`);

      return appLogger.so(data.stack!);
    }

    try {
      await ErrorLog.create(data);
    } catch (err) {
      appLogger.error("Не удалось создать отчёт об ошибке");

      console.error(err);
    }
  }

  async createRequestLog(data: IRequestLog): Promise<void> {
    if (!this.enabled) {
      return appLogger.requestInfo(data);
    }

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
