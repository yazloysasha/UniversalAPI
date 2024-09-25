import { AppFastifyInstance } from "@types";
import { registerClientRoutes } from "@controllers";

/**
 * Регистрация маршрутов Fastify
 */
export const setupFastifyRoutes = async (
  fastify: AppFastifyInstance
): Promise<void> => {
  registerClientRoutes(fastify);
};
