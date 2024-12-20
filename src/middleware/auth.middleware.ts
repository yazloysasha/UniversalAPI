import { di } from "@config";
import { APIError } from "@utils";
import { AuthService } from "@services";
import { FastifyRequest } from "fastify";

/**
 * Авторизация
 */
export const authPreHandler =
  ({
    required = true, // Обязательна ли
    extended = false, // Если да, то добавляет в запрос ещё и пользователя
  }: {
    required?: boolean;
    extended?: boolean;
  } = {}) =>
  async (req: FastifyRequest): Promise<void> => {
    try {
      let token = req.headers.authorization!;
      if (!/^Bearer\s(\S+)$/.test(token)) {
        throw Error("Токен не соответствует формату");
      }

      token = token.slice(7);

      const authService = di.container.resolve<AuthService>(AuthService.name);

      const payload = authService.verifyJWT({ token });
      if (
        typeof payload === "string" ||
        !payload.sessionId ||
        !payload.iat ||
        !payload.exp
      ) {
        throw Error("Полезная нагрузка не соответствует нашему проекту");
      }

      if (Math.round(Date.now() / 1000) > payload.exp) {
        throw Error("Время жизни токена истекло");
      }

      const { sessionId } = payload as { sessionId: string };

      req.session = await authService.enterSession({
        sessionId,
        extended,
      });

      if (extended) {
        req.user = req.session.user;
      }
    } catch {
      if (required) throw new APIError(401);
    }
  };
