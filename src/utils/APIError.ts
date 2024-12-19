import { SwaggerContract } from "@contracts";
import { I18n, I18nArgs, StatusCodes } from "@types";

/**
 * Ошибка API
 */
export class APIError extends Error {
  public name = "APIError";
  public statusCode!: StatusCodes;
  public message!: I18n;
  public alert!: boolean;
  public args!: I18nArgs;

  constructor(
    statusCode: StatusCodes,
    { msg, alert, args }: { alert?: boolean; msg?: I18n; args?: I18nArgs } = {}
  ) {
    super(msg || SwaggerContract.CodeDescriptions[statusCode]);

    this.statusCode = statusCode;
    this.alert = alert || true;
    this.args = args || {};
  }
}
