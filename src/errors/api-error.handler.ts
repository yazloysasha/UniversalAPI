import { ApiError } from "@errors";
import { MongooseError } from "mongoose";
import { JsonWebTokenError } from "jsonwebtoken";
import { ClientErrorCode, ServerErrorCode } from "@types";
import { FastifyError, FastifyReply, FastifyRequest } from "fastify";

export const apiErrorHandler = (
  error: FastifyError,
  req: FastifyRequest,
  reply: FastifyReply
): void => {
  /**
   * Если приходит ошибка валидации
   */
  if (error.code == "FST_ERR_VALIDATION") {
    reply.code(ClientErrorCode.BAD_REQUEST).send({
      alert: true,
      type: "error",
      msg: "Ошибка валидации",
      errors: error.validation?.map((error) => error.message),
    });

    return;
  }

  if (error?.code == "FST_REQ_FILE_TOO_LARGE") {
    reply.code(ClientErrorCode.BAD_REQUEST).send({
      alert: true,
      type: "error",
      msg: "Загружаемый файл слишком большой",
    });

    return;
  }

  if (error?.code == "FST_ERR_CTP_INVALID_MEDIA_TYPE") {
    reply.code(ClientErrorCode.UNSUPPORTED_MEDIA_TYPE).send({
      alert: false,
      type: "error",
      msg: "Неверный формат Content-Type",
    });

    return;
  }

  if (error instanceof ApiError) {
    reply.code(error.statusCode).send({
      alert: error.alert,
      type: "error",
      msg: error.message,
    });

    return;
  }

  if (error instanceof JsonWebTokenError) {
    reply.code(ClientErrorCode.UNAUTHORIZED).send({
      alert: true,
      type: "error",
      msg: "Неверный токен авторизации",
    });

    return;
  }

  // Необработанное исключение
  console.error(error);

  if (error instanceof MongooseError) {
    reply.code(ServerErrorCode.INTERNAL_SERVER_ERROR).send({
      alert: true,
      type: "error",
      msg: "Ошибка базы данных",
    });

    return;
  }

  reply.code(ServerErrorCode.INTERNAL_SERVER_ERROR).send({
    alert: true,
    type: "error",
    msg: "Непредвиденная ошибка",
  });
};
