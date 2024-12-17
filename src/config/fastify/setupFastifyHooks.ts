import { di } from "@config";
import { AppFastifyInstance } from "@types";
import { AnalyticalService } from "@services";

/**
 * Setup Fastify tracking hooks
 */
export const setupFastifyHooks = (fastify: AppFastifyInstance): void => {
  const analyticalService = di.container.resolve<AnalyticalService>(
    AnalyticalService.name
  );

  // Logging all responses
  fastify.addHook("onResponse", (req, reply, done) => {
    analyticalService.createRequestLog({
      method: req.method,
      url: req.url,
      statusCode: reply.statusCode,
      duration: Math.round(reply.elapsedTime),
    });

    done();
  });
};
