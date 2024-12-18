import { I18n, StatusCodes } from "@types";
import { SwaggerContract } from "@contracts";

type I18nArgs = { [x: string]: I18nArgs | boolean | number | string };

/**
 * Ошибка API
 */
export class ApiError extends Error {
  public name = "ApiError";

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
  ): ApiError {
    return new ApiError(
      statusCode,
      msg || SwaggerContract.CodeDescriptions[statusCode],
      alert || true,
      args || {}
    );
  }
}
