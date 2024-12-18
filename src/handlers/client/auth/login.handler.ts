import { di } from "@config";
import { AuthService } from "@services";
import { AppFastifyHandler } from "@types";
import { LoginType } from "@schemas/client";

export const loginHandler: AppFastifyHandler<LoginType> = async (
  req,
  reply
) => {
  const authService = di.container.resolve<AuthService>(AuthService.name);

  const userId = await authService.login(req.body);
  const token = await authService.newSession({ userId });

  reply.code(200).send({
    alert: true,
    message: req.i18n.t("swagger.messages.LOGGED"),
    token,
  });
};
