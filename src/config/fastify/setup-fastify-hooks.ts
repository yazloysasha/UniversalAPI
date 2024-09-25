import { appLogger } from "@config";
import { AppFastifyInstance } from "@types";

/**
 * Установка хуков Fastify
 */
export const setupFastifyHooks = (fastify: AppFastifyInstance): void => {
  // Логирование всех ответов
  fastify.addHook("onResponse", (req, reply, done) => {
    const prefix: string = `${req.method} ${req.originalUrl} {${reply.statusCode}}`;
    const time: string = reply.elapsedTime.toFixed();

    appLogger.info(`${prefix} -> ${time} ms`);

    done();
  });
};
