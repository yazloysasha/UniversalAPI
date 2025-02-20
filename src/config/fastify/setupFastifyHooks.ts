import { di } from "@config";
import { AppFastifyInstance } from "@types";
import { AnalyticalService } from "@services";

/**
 * Установка хуков Fastify
 */
export const setupFastifyHooks = (fastify: AppFastifyInstance): void => {
  const analyticalService = di.container.resolve<AnalyticalService>(
    AnalyticalService.key
  );

  // Логирование всех ответов
  fastify.addHook("onResponse", (req, reply) => {
    analyticalService.createRequestLog({
      method: req.method,
      url: req.url,
      statusCode: reply.statusCode,
      duration: Math.round(reply.elapsedTime),
    });
  });
};
