import { di } from "@config";
import { ApiError } from "@errors";
import { AuthService } from "@services";
import { AppFastifySchema, AppFastifyPreHandler } from "@types";

export const authPreHandler =
  <SchemaType extends AppFastifySchema>({
    required = true,
  }: {
    required?: boolean;
  } = {}): AppFastifyPreHandler<SchemaType> =>
  async (req, reply) => {
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
        throw Error("Полезная нагрузка не соответствует проектной");
      }

      if (Math.round(Date.now() / 1000) > payload.exp) {
        throw Error("Время жизни токена истекло");
      }

      const { sessionId } = payload as { sessionId: string };

      const userId = await authService.getUserIdBySessionId({ sessionId });

      req.session = { id: sessionId, userId };
    } catch {
      if (required) throw ApiError.unAuth();
    }
  };
