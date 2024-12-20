import { di } from "@config";
import { UserRole } from "@entities";
import { AppContract } from "@contracts";
import { AppFastifyInstance } from "@types";
import { AnalyticalService } from "@services";
import { authPreHandler, verifyPreHandler } from "@middleware";

/**
 * Установка хуков Fastify
 */
export const setupFastifyHooks = (fastify: AppFastifyInstance): void => {
  const analyticalService = di.container.resolve<AnalyticalService>(
    AnalyticalService.name
  );

  // Действия при запросе
  fastify.addHook("onRequest", async (req) => {
    // Если путь не относится к сваггеру, то пропустить проверку
    if (!req.url.startsWith(AppContract.SWAGGER_PATHNAME)) {
      return;
    }

    // Авторизация
    await authPreHandler({ required: true, extended: true })(req);

    // Проверка роли пользователя
    await verifyPreHandler([UserRole.ADMINISTRATOR])(req);
  });

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
