import {
  appLogger,
  setupAjvValidator,
  setupFastifyHooks,
  setupFastifyRoutes,
} from "@config";
import Fastify from "fastify";
import fastifyCors from "@fastify/cors";
import { getFastifyRoutes } from "@helpers";
import fastifyCookie from "@fastify/cookie";
import { SwaggerContract } from "@contracts";
import fastifySwagger from "@fastify/swagger";
import fastifyFormbody from "@fastify/formbody";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { ApiError, apiErrorHandler } from "@errors";
import { AppFastifyInstance, FastifyRoutes } from "@types";
import { JsonSchemaToTsProvider } from "@fastify/type-provider-json-schema-to-ts";

/**
 * Launch of Fastify systems
 */
export const setupFastify = async (
  routes: FastifyRoutes,
  port?: number
): Promise<void> => {
  if (typeof port !== "number" || Number.isNaN(port)) {
    throw ApiError.internalServerError({
      msg: `Не указан порт для запуска маршрутов Fastify (${routes})`,
    });
  }

  appLogger.info(`Launching the Fastify app (${routes})...`);

  const fastify: AppFastifyInstance = Fastify({
    disableRequestLogging: true,
  })
    // For improved typing of requests and responses
    .withTypeProvider<JsonSchemaToTsProvider>();

  // Set own error handler
  fastify.setErrorHandler(apiErrorHandler);

  // Install error validator
  setupAjvValidator(fastify);

  // Add query hooks
  setupFastifyHooks(fastify);

  // Swagger registration
  await fastify.register(fastifySwagger, SwaggerContract.GetConfig(routes));
  await fastify.register(fastifySwaggerUi, SwaggerContract.ConfigUi);

  // Other plugins
  await fastify.register(fastifyCookie);
  await fastify.register(fastifyFormbody);
  await fastify.register(fastifyCors, { origin: true, credentials: true });

  // Registration of routes
  await setupFastifyRoutes(fastify, routes);

  await fastify.listen({ port });
  await fastify.ready();

  appLogger.verbose(`Fastify app (${routes}) is running on port ${port}`);

  console.log(getFastifyRoutes(fastify));
};
