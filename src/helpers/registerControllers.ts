import {
  AppFastifyRoute,
  AppFastifyInstance,
  AppFastifyPreHandler,
} from "@types";

/**
 * Registering a Route Group
 */
export const registerControllers = async (
  fastify: AppFastifyInstance,
  controllers: { [x: string]: AppFastifyRoute<any> },
  commonPreHandlers: AppFastifyPreHandler<any>[] = []
): Promise<void> => {
  for (const key in controllers) {
    if (!controllers[key].preHandler) {
      controllers[key].preHandler = [];
    } else if (!Array.isArray(controllers[key].preHandler)) {
      controllers[key].preHandler = [controllers[key].preHandler];
    }

    controllers[key].preHandler.unshift(...commonPreHandlers);

    fastify.route(controllers[key]);
  }
};
