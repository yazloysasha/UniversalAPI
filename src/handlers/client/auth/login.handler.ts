import { di } from "@config";
import { AuthService } from "@services";
import { LoginType } from "@schemas/client";
import { AppFastifyHandler, SuccessCode } from "@types";

export const loginHandler: AppFastifyHandler<LoginType> = async (
  req,
  reply
) => {
  const authService = di.container.resolve<AuthService>(AuthService.name);

  const userId = await authService.login(req.body);
  const token = await authService.newSession({ userId });

  reply.code(SuccessCode.OK).send({
    alert: true,
    message: "Вы успешно вошли в аккаунт",
    token,
  });
};
