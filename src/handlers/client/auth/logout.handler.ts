import { di } from "@config";
import { AuthService } from "@services";
import { AppFastifyHandler } from "@types";
import { LogoutType } from "@schemas/client";

export const logoutHandler: AppFastifyHandler<LogoutType> = async (
  req,
  reply
) => {
  const authService = di.container.resolve<AuthService>(AuthService.key);

  await authService.destroySession({ sessionId: req.session!.id });

  reply.code(200).send({
    message: req.i18n.t("swagger.messages.LOGGED_OUT"),
  });
};
