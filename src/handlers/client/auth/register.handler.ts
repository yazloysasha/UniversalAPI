import { di } from "@config";
import { AuthService } from "@services";
import { RegisterType } from "@schemas/client";
import { AppFastifyHandler, SuccessCode } from "@types";

export const registerHandler: AppFastifyHandler<RegisterType> = async (
  req,
  reply
) => {
  const authService = di.container.resolve<AuthService>(AuthService.name);

  const userId = await authService.register(req.body);
  const token = await authService.newSession({ userId });

  reply.code(SuccessCode.CREATED).send({
    alert: true,
    message: "Вы успешно зарегистрировались",
    token,
  });
};
