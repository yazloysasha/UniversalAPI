import {
  appLogger,
  setupAjvValidator,
  setupFastifyHooks,
  setupFastifyRoutes,
} from "@config";
import Fastify from "fastify";
import i18next from "i18next";
import fastifyCors from "@fastify/cors";
import { getFastifyRoutes } from "@helpers";
import fastifyCookie from "@fastify/cookie";
import { SwaggerContract } from "@contracts";
import fastifySwagger from "@fastify/swagger";
import fastifyFormbody from "@fastify/formbody";
import { plugin } from "i18next-http-middleware";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { ApiError, apiErrorHandler } from "@errors";
import { AppFastifyInstance, FastifyRoutes } from "@types";
import { JsonSchemaToTsProvider } from "@fastify/type-provider-json-schema-to-ts";

/**
 * Запуск систем Fastify
 */
export const setupFastify = async (
  routes: FastifyRoutes,
  port?: number
): Promise<void> => {
  if (typeof port !== "number" || Number.isNaN(port)) {
    throw ApiError.new(500, {
      msg: "system.NO_FASTIFY_PORT",
      args: { routes },
    });
  }

  appLogger.info(`Запуск приложения Fastify (${routes})...`);

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

  // Интернационализация и локализация
  await fastify.register(plugin, { i18next });

  // Регистрация сваггера
  await fastify.register(fastifySwagger, SwaggerContract.GetConfig(routes));
  await fastify.register(fastifySwaggerUi, SwaggerContract.ConfigUi);

  // Прочие плагины
  await fastify.register(fastifyCookie);
  await fastify.register(fastifyFormbody);
  await fastify.register(fastifyCors, { origin: true, credentials: true });

  // Регистрация маршрутов
  await setupFastifyRoutes(fastify, routes);

  await fastify.listen({ port });
  await fastify.ready();

  appLogger.verbose(`Приложение Fastify (${routes}) запущено на порту ${port}`);

  console.log(getFastifyRoutes(fastify));
};
