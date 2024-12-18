import { di } from "@config";
import { ApiError } from "@errors";
import { TypeORMError } from "typeorm";
import { MongooseError } from "mongoose";
import { AnalyticalService } from "@services";
import { FastifyError, FastifyReply, FastifyRequest } from "fastify";

export const apiErrorHandler = (
  error: FastifyError,
  req: FastifyRequest,
  reply: FastifyReply
): void => {
  // Ошибка валидации
  if (error.code === "FST_ERR_VALIDATION") {
    reply.code(400).send({
      alert: true,
      type: "error",
      message: req.i18n.t("swagger.errors.VALIDATION"),
      errors: error.validation?.map((error) => error.message),
    });

    return;
  }

  // Ошибка загрузки слишком большого файла
  if (error.code === "FST_REQ_FILE_TOO_LARGE") {
    reply.code(400).send({
      alert: true,
      type: "error",
      message: req.i18n.t("swagger.errors.FILE_TOO_LARGE"),
    });

    return;
  }

  // Ошибка неверного формата контента
  if (error.code == "FST_ERR_CTP_INVALID_MEDIA_TYPE") {
    reply.code(415).send({
      alert: false,
      type: "error",
      message: req.i18n.t("swagger.errors.INVALID_MEDIA_TYPE"),
    });

    return;
  }

  // Ошибка, выброшенная нашим сервисом
  if (error instanceof ApiError) {
    reply.code(error.statusCode).send({
      alert: error.alert,
      type: "error",
      message: req.i18n.t(error.message),
    });

    return;
  }

  const analyticalService = di.container.resolve<AnalyticalService>(
    AnalyticalService.name
  );

  // Создать лог для необработанного исключения
  analyticalService.createErrorLog({
    name: error.name,
    message: error.message,
    stack: error.stack,
    method: req.method,
    url: req.url,
  });

  // Ошибка операционной базы данных (неправильный запрос или проблема с соединением)
  if (error instanceof TypeORMError) {
    reply.code(502).send({
      alert: true,
      type: "error",
      message: req.i18n.t("swagger.errors.OPERATIONAL_DATABASE"),
    });

    return;
  }

  // Ошибка аналитической базы данных
  if (error instanceof MongooseError) {
    reply.code(502).send({
      alert: true,
      type: "error",
      message: req.i18n.t("swagger.errors.ANALYTICAL_DATABASE"),
    });

    return;
  }

  // Неизвестная ошибка
  reply.code(500).send({
    alert: true,
    type: "error",
    message: req.i18n.t("swagger.errors.UNKNOWN"),
  });
};
