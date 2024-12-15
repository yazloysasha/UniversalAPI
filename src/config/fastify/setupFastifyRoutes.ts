import { registerControllers } from "@helpers";
import { AppFastifyInstance, FastifyRoutes } from "@types";

/**
 * Регистрация маршрутов Fastify
 */
export const setupFastifyRoutes = async (
  fastify: AppFastifyInstance,
  routes: FastifyRoutes
): Promise<void> => {
  switch (routes) {
    case "admin":
      break;

    case "client":
      registerControllers(fastify, require("@controllers/client"));
      break;
  }
};
