import { IApiErrorProps } from "@errors";

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public alert: boolean
  ) {
    super(message);
  }

  static badRequest({
    msg = "Плохой запрос",
    alert = true,
  }: IApiErrorProps = {}): ApiError {
    return new ApiError(400, msg, alert);
  }

  static unAuth({
    msg = "Пользователь не авторизован",
    alert = true,
  }: IApiErrorProps = {}): ApiError {
    return new ApiError(401, msg, alert);
  }

  static forbidden({
    msg = "Доступ запрещён",
    alert = true,
  }: IApiErrorProps = {}): ApiError {
    return new ApiError(403, msg, alert);
  }

  static noPermission({
    msg = "Недостаточно прав",
    alert = true,
  }: IApiErrorProps = {}): ApiError {
    return new ApiError(403, msg, alert);
  }

  static notFound({
    msg = "Не найдено",
    alert = true,
  }: IApiErrorProps = {}): ApiError {
    return new ApiError(404, msg, alert);
  }

  static alreadyExists({
    msg = "Уже существует",
    alert = true,
  }: IApiErrorProps = {}): ApiError {
    return new ApiError(409, msg, alert);
  }

  static tooManyRequests({
    msg = "Слишком много запросов",
    alert = true,
  }: IApiErrorProps = {}): ApiError {
    return new ApiError(429, msg, alert);
  }

  static internalServerError({
    msg = "Внутренняя ошибка сервера",
    alert = true,
  }: IApiErrorProps = {}): ApiError {
    return new ApiError(500, msg, alert);
  }
}
