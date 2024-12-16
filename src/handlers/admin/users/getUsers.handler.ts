import { di } from "@config";
import { UserService } from "@services";
import { GetUsersType } from "@schemas/admin";
import { AppFastifyHandler, SuccessCode } from "@types";

export const getUsersHandler: AppFastifyHandler<GetUsersType> = async (
  req,
  reply
) => {
  const userService = di.container.resolve<UserService>(UserService.name);

  const { totalSize, users } = await userService.getUsers({
    pagination: req.query,
  });

  reply.code(SuccessCode.OK).send({ totalSize, items: users });
};
