import { SwaggerContract } from "@contracts";
import { ClientErrorCode, ServerErrorCode, StatusCodes } from "@types";

type IApiErrorProps = {
  alert?: boolean;
  msg?: string;
};

export class ApiError extends Error {
  constructor(
    public statusCode: StatusCodes,
    public message: string,
    public alert: boolean
  ) {
    super(message);
  }

  static badRequest({
    msg = SwaggerContract.CodeDescriptions[ClientErrorCode.BAD_REQUEST],
    alert = true,
  }: IApiErrorProps = {}): ApiError {
    return new ApiError(ClientErrorCode.BAD_REQUEST, msg, alert);
  }

  static unAuth({
    msg = SwaggerContract.CodeDescriptions[ClientErrorCode.UNAUTHORIZED],
    alert = true,
  }: IApiErrorProps = {}): ApiError {
    return new ApiError(ClientErrorCode.UNAUTHORIZED, msg, alert);
  }

  static forbidden({
    msg = SwaggerContract.CodeDescriptions[ClientErrorCode.FORBIDDEN],
    alert = true,
  }: IApiErrorProps = {}): ApiError {
    return new ApiError(ClientErrorCode.FORBIDDEN, msg, alert);
  }

  static notFound({
    msg = SwaggerContract.CodeDescriptions[ClientErrorCode.NOT_FOUND],
    alert = true,
  }: IApiErrorProps = {}): ApiError {
    return new ApiError(ClientErrorCode.NOT_FOUND, msg, alert);
  }

  static tooManyRequests({
    msg = SwaggerContract.CodeDescriptions[ClientErrorCode.TOO_MANY_REQUESTS],
    alert = true,
  }: IApiErrorProps = {}): ApiError {
    return new ApiError(ClientErrorCode.TOO_MANY_REQUESTS, msg, alert);
  }

  static internalServerError({
    msg = SwaggerContract.CodeDescriptions[
      ServerErrorCode.INTERNAL_SERVER_ERROR
    ],
    alert = true,
  }: IApiErrorProps = {}): ApiError {
    return new ApiError(ServerErrorCode.INTERNAL_SERVER_ERROR, msg, alert);
  }
}
