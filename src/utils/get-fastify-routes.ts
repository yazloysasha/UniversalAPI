import { FastifyInstance } from "fastify";

export const getFastifyRoutes = (fastify: FastifyInstance): string => {
  const text: string = fastify.printRoutes({ commonPrefix: false });
  const lines: string[] = text.split("\n");

  lines.forEach((line, index) => {
    lines[index] = `   ${line}`;
  });

  return lines.join("\n");
};
