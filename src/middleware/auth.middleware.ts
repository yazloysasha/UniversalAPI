import { di } from "@config";
import { ApiError } from "@errors";
import { AuthService } from "@services";
import { AppFastifySchema, AppFastifyPreHandler } from "@types";

export const authPreHandler =
  <SchemaType extends AppFastifySchema>({
    required = true,
    extended = false,
  }: {
    required?: boolean;
    extended?: boolean;
  } = {}): AppFastifyPreHandler<SchemaType> =>
  async (req, reply) => {
    try {
      let token = req.headers.authorization!;
      if (!/^Bearer\s(\S+)$/.test(token)) {
        throw Error("Token does not match format");
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
        throw Error("The payload does not match our design");
      }

      if (Math.round(Date.now() / 1000) > payload.exp) {
        throw Error("Token lifetime expired");
      }

      const { sessionId } = payload as { sessionId: string };

      req.session = await authService.getSession({ sessionId, extended });

      if (extended) {
        req.user = req.session.user;
      }
    } catch {
      if (required) throw ApiError.unAuth({ msg: "Требуется авторизация" });
    }
  };
