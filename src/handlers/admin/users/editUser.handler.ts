import { di } from "@config";
import { primitive } from "@utils";
import { UserService } from "@services";
import { AppFastifyHandler } from "@types";
import { EditUserType } from "@schemas/admin";

export const editUserHandler: AppFastifyHandler<EditUserType> = async (
  req,
  reply
) => {
  const userService = di.container.resolve<UserService>(UserService.key);

  const updatedUser = await userService.editUser({
    userId: req.params.userId,
    ...req.body,
  });

  reply.code(200).send({
    alert: true,
    message: req.i18n.t("swagger.messages.SAVED"),
    user: primitive(updatedUser),
  });
};
