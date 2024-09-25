import { ApiError } from "@errors";
import { MongooseError } from "mongoose";
import { JsonWebTokenError } from "jsonwebtoken";
import { FastifyError, FastifyReply, FastifyRequest } from "fastify";

export const apiErrorHandler = (
  error: FastifyError,
  req: FastifyRequest,
  reply: FastifyReply
): void => {
  const isMongooseError = error instanceof MongooseError;
  const isApiError = error instanceof ApiError;
  const isJsonWebTokenError = error instanceof JsonWebTokenError;
  const isSyntaxError = error instanceof SyntaxError;

  /**
   * Если приходит ошибка валидации
   */
  if (error.code == "FST_ERR_VALIDATION") {
    reply.code(400).send({
      alert: true,
      type: "error",
      msg: "Ошибка валидации",
      errors: error.validation?.map((error) => error.message),
    });

    return;
  }

  if (error?.code == "FST_REQ_FILE_TOO_LARGE") {
    reply.code(400).send({
      alert: true,
      type: "error",
      msg: "Загружаемый файл слишком большой",
    });

    return;
  }

  if (error?.code == "FST_ERR_CTP_INVALID_MEDIA_TYPE") {
    reply.code(400).send({
      alert: false,
      type: "error",
      msg: "Неверный формат Content-Type",
    });

    return;
  }

  if (isApiError) {
    reply.code(error.statusCode).send({
      alert: error instanceof ApiError ? error.alert : true,
      type: "error",
      msg: error.message,
    });

    return;
  }

  if (isMongooseError) {
    reply.code(500).send({
      alert: true,
      type: "error",
      msg: "Ошибка базы данных",
    });

    console.error(error);

    return;
  }

  if (isJsonWebTokenError) {
    reply.code(403).send({
      alert: true,
      type: "error",
      msg: "Неверный токен авторизации",
    });

    return;
  }

  if (isSyntaxError) {
    reply.code(400).send({
      alert: true,
      type: "error",
      msg: "Синтаксическая ошибка",
    });

    return;
  }

  // Необработанная ошибка
  console.error(error);

  reply.code(500).send({
    alert: true,
    type: "error",
    msg: "Непредвиденная ошибка",
  });
};
