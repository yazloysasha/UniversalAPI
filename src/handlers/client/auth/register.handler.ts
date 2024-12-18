import { di } from "@config";
import { AuthService } from "@services";
import { AppFastifyHandler } from "@types";
import { RegisterType } from "@schemas/client";

export const registerHandler: AppFastifyHandler<RegisterType> = async (
  req,
  reply
) => {
  const authService = di.container.resolve<AuthService>(AuthService.name);

  const userId = await authService.register(req.body);
  const token = await authService.newSession({ userId });

  reply.code(201).send({
    alert: true,
    message: req.i18n.t("swagger.messages.REGISTERED"),
    token,
  });
};
