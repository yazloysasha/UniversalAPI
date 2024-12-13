import { AppFastifyInstance } from "@types";
import { registerControllers } from "@helpers";

/**
 * Регистрация маршрутов Fastify
 */
export const setupFastifyRoutes = async (
  fastify: AppFastifyInstance
): Promise<void> => {
  const clientControllers = require("@controllers/client");

  registerControllers(fastify, clientControllers);
};
