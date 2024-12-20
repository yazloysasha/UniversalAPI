import {
  appLogger,
  setupAjvValidator,
  setupFastifyHooks,
  setupFastifyRoutes,
} from "@config";
import Fastify from "fastify";
import i18next from "i18next";
import { APIError } from "@utils";
import fastifyCors from "@fastify/cors";
import fastifyCookie from "@fastify/cookie";
import { SwaggerContract } from "@contracts";
import fastifySwagger from "@fastify/swagger";
import fastifyFormbody from "@fastify/formbody";
import { plugin } from "i18next-http-middleware";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { AppFastifyInstance, FastifyRoutes } from "@types";
import { fastifyErrorHandler, getFastifyRoutes } from "@helpers";
import { JsonSchemaToTsProvider } from "@fastify/type-provider-json-schema-to-ts";

/**
 * Запуск систем Fastify
 */
export const setupFastify = async (
  routes: FastifyRoutes,
  port?: number
): Promise<void> => {
  if (typeof port !== "number" || Number.isNaN(port)) {
    throw new APIError(500, {
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
  fastify.setErrorHandler(fastifyErrorHandler);

  // Установить валидатор ошибок
  setupAjvValidator(fastify);

  // Интернационализация и локализация
  await fastify.register(plugin as never, { i18next });

  // Регистрация сваггера
  await fastify.register(fastifySwagger, SwaggerContract.GetConfig(routes));
  await fastify.register(fastifySwaggerUi, SwaggerContract.ConfigUi);

  // Прочие плагины
  await fastify.register(fastifyCookie);
  await fastify.register(fastifyFormbody);
  await fastify.register(fastifyCors, { origin: true, credentials: true });

  // Регистрация маршрутов
  setupFastifyRoutes(fastify, routes);

  // Добавить хуки для запросов и ответов
  setupFastifyHooks(fastify);

  await fastify.listen({ port });
  await fastify.ready();

  appLogger.verbose(`Приложение Fastify (${routes}) запущено на порту ${port}`);

  console.log(getFastifyRoutes(fastify));
};
