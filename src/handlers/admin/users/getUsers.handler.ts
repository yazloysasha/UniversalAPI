import { di } from "@config";
import { primitive } from "@utils";
import { UserService } from "@services";
import { AppFastifyHandler } from "@types";
import { GetUsersType } from "@schemas/admin";

export const getUsersHandler: AppFastifyHandler<GetUsersType> = async (
  req,
  reply
) => {
  const userService = di.container.resolve<UserService>(UserService.name);

  const { totalSize, users } = await userService.getUsers({
    pagination: req.query,
  });

  reply.code(200).send({ totalSize, items: primitive(users) });
};
