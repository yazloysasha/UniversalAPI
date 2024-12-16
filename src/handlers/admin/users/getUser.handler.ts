import { di } from "@config";
import { UserService } from "@services";
import { GetUserType } from "@schemas/admin";
import { AppFastifyHandler, ExtendedUser, SuccessCode } from "@types";

export const getUserHandler: AppFastifyHandler<GetUserType> = async (
  req,
  reply
) => {
  const userService = di.container.resolve<UserService>(UserService.name);

  const user = await userService.getUser({
    userId: req.params.userId,
    extended: true,
  });

  reply.code(SuccessCode.OK).send(user as ExtendedUser);
};
