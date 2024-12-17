import { di } from "@config";
import { ApiError } from "@errors";
import { TypeORMError } from "typeorm";
import { MongooseError } from "mongoose";
import { AnalyticalService } from "@services";
import { ClientErrorCode, ServerErrorCode } from "@types";
import { FastifyError, FastifyReply, FastifyRequest } from "fastify";

export const apiErrorHandler = (
  error: FastifyError,
  req: FastifyRequest,
  reply: FastifyReply
): void => {
  /**
   * Validation error
   */
  if (error.code == "FST_ERR_VALIDATION") {
    reply.code(ClientErrorCode.BAD_REQUEST).send({
      alert: true,
      type: "error",
      message: "Ошибка валидации",
      errors: error.validation?.map((error) => error.message),
    });

    return;
  }

  /**
   * Error uploading file too large
   */
  if (error.code == "FST_REQ_FILE_TOO_LARGE") {
    reply.code(ClientErrorCode.BAD_REQUEST).send({
      alert: true,
      type: "error",
      message: "Загружаемый файл слишком большой",
    });

    return;
  }

  /**
   * Invalid content format error
   */
  if (error.code == "FST_ERR_CTP_INVALID_MEDIA_TYPE") {
    reply.code(ClientErrorCode.UNSUPPORTED_MEDIA_TYPE).send({
      alert: false,
      type: "error",
      message: "Неверный формат Content-Type",
    });

    return;
  }

  /**
   * Error thrown by the service
   */
  if (error instanceof ApiError) {
    reply.code(error.statusCode).send({
      alert: error.alert,
      type: "error",
      message: error.message,
    });

    return;
  }

  const analyticalService = di.container.resolve<AnalyticalService>(
    AnalyticalService.name
  );

  // Create a log for an unhandled exception
  analyticalService.createErrorLog({
    name: error.name,
    message: error.message,
    stack: error.stack,
    method: req.method,
    url: req.url,
  });

  /**
   * Operational database error (bad query or connection problem)
   */
  if (error instanceof TypeORMError) {
    reply.code(ServerErrorCode.BAD_GATEWAY).send({
      alert: true,
      type: "error",
      message: "Ошибка операционной базы данных",
    });

    return;
  }

  /**
   * Analytical database error
   */
  if (error instanceof MongooseError) {
    reply.code(ServerErrorCode.BAD_GATEWAY).send({
      alert: true,
      type: "error",
      message: "Ошибка аналитической базы данных",
    });

    return;
  }

  /**
   * Unknown error
   */
  reply.code(ServerErrorCode.INTERNAL_SERVER_ERROR).send({
    alert: true,
    type: "error",
    message: "Непредвиденная ошибка",
  });
};
