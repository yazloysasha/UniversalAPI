import { di } from "@config";
import { UserService } from "@services";
import { EditUserType } from "@schemas/admin";
import { AppFastifyHandler, SuccessCode } from "@types";

export const editUserHandler: AppFastifyHandler<EditUserType> = async (
  req,
  reply
) => {
  const userService = di.container.resolve<UserService>(UserService.name);

  const updatedUser = await userService.editUser({
    userId: req.params.userId,
    ...req.body,
  });

  reply.code(SuccessCode.OK).send({
    alert: true,
    message: "Успешно сохранено",
    user: updatedUser,
  });
};
