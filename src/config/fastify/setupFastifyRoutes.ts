import { authPreHandler } from "@middleware";
import { registerControllers } from "@helpers";
import { AppFastifyInstance, FastifyRoutes } from "@types";

/**
 * Регистрация маршрутов Fastify
 */
export const setupFastifyRoutes = (
  fastify: AppFastifyInstance,
  routes: FastifyRoutes
): void => {
  switch (routes) {
    case "admin":
      return registerControllers(fastify, require("@controllers/admin"), [
        authPreHandler({ extended: true }),
      ]);

    case "client":
      return registerControllers(fastify, require("@controllers/client"));
  }
};
