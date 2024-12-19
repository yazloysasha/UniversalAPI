import { SwaggerContract } from "@contracts";
import { I18n, I18nArgs, StatusCodes } from "@types";

/**
 * Ошибка API
 */
export class APIError extends Error {
  public name = "APIError";

  constructor(
    public statusCode: StatusCodes,
    public message: I18n,
    public alert: boolean,
    public args: I18nArgs
  ) {
    super(message);
  }

  static new(
    statusCode: StatusCodes,
    { msg, alert, args }: { alert?: boolean; msg?: I18n; args?: I18nArgs } = {}
  ): APIError {
    return new APIError(
      statusCode,
      msg || SwaggerContract.CodeDescriptions[statusCode],
      alert || true,
      args || {}
    );
  }
}
