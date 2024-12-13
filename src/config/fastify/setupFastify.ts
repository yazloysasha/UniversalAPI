import {
  appLogger,
  setupAjvValidator,
  setupFastifyHooks,
  setupFastifyRoutes,
} from "@config";
import Fastify from "fastify";
import { appConfig } from "@main";
import fastifyCors from "@fastify/cors";
import { getFastifyRoutes } from "@utils";
import fastifyCookie from "@fastify/cookie";
import { AppFastifyInstance } from "@types";
import { SwaggerContract } from "@contracts";
import fastifySwagger from "@fastify/swagger";
import fastifyFormbody from "@fastify/formbody";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { ApiError, apiErrorHandler } from "@errors";
import { JsonSchemaToTsProvider } from "@fastify/type-provider-json-schema-to-ts";

/**
 * Запуск систем Fastify
 */
export const setupFastify = async (): Promise<void> => {
  if (!appConfig.DATABASE_URL) {
    throw ApiError.internalServerError({
      msg: "Не указан порт для запуска Fastify",
    });
  }

  appLogger.info("Запуск приложения Fastify...");

  const fastify: AppFastifyInstance = Fastify({
    disableRequestLogging: true,
  })
    // Для улучшенной типизации запросов и ответов
    .withTypeProvider<JsonSchemaToTsProvider>();

  // Установить собственный обработчик ошибок
  fastify.setErrorHandler(apiErrorHandler);

  // Установить валидатор ошибок
  setupAjvValidator(fastify);

  // Добавить хуки запросов
  setupFastifyHooks(fastify);

  // Регистрация сваггера
  await fastify.register(fastifySwagger, SwaggerContract.Config);
  await fastify.register(fastifySwaggerUi, SwaggerContract.ConfigUi);

  // Прочие плагины
  await fastify.register(fastifyCookie);
  await fastify.register(fastifyFormbody);
  await fastify.register(fastifyCors, { origin: true, credentials: true });

  // Регистрация маршрутов
  await setupFastifyRoutes(fastify);

  await fastify.listen({ port: Number(appConfig.FASTIFY_PORT) });

  await fastify.ready();

  appLogger.verbose(
    `Приложение Fastify запущено на порту ${appConfig.FASTIFY_PORT}`
  );
  console.log(getFastifyRoutes(fastify));
};
