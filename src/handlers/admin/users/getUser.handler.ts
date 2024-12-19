import { di } from "@config";
import { primitive } from "@utils";
import { UserService } from "@services";
import { GetUserType } from "@schemas/admin";
import { AppFastifyHandler, ExtendedUser } from "@types";

export const getUserHandler: AppFastifyHandler<GetUserType> = async (
  req,
  reply
) => {
  const userService = di.container.resolve<UserService>(UserService.name);

  const user = await userService.getUser({
    userId: req.params.userId,
    extended: true,
  });

  reply.code(200).send(primitive(user as ExtendedUser));
};
