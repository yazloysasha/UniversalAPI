import { FastifyInstance } from "fastify";

/**
 * Get a list of routes to output to the console
 */
export const getFastifyRoutes = (fastify: FastifyInstance): string => {
  return fastify.printRoutes({ commonPrefix: false });
};
