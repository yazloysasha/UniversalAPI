import { APIError } from "@utils";
import { UserRole } from "@entities";
import { FastifyRequest } from "fastify";

export const verifyPreHandler =
  (roles: UserRole[] = []) =>
  async (req: FastifyRequest): Promise<void> => {
    if (!req.user?.role || roles.includes(req.user.role)) return;

    throw new APIError(403);
  };
