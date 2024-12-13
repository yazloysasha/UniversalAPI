import {
  AppFastifyRoute,
  AppFastifyInstance,
  AppFastifyPreHandler,
} from "@types";

/**
 * Регистрация группы маршрутов
 */
export const registerControllers = async (
  fastify: AppFastifyInstance,
  controllers: { [x: string]: AppFastifyRoute<any> },
  commonPreHandler: AppFastifyPreHandler<any>[] = []
): Promise<void> => {
  for (const key in controllers) {
    if (Array.isArray(controllers[key].preHandler)) {
      controllers[key].preHandler.push(...commonPreHandler);
    }

    fastify.route(controllers[key]);
  }
};
