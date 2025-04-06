import { di } from "@config";
import { primitive } from "@utils";
import { UserService } from "@services";
import { GetUserType } from "@schemas/client";
import { AppFastifyHandler, ExtendedUser } from "@types";

export const getUserHandler: AppFastifyHandler<GetUserType> = async (
  req,
  reply
) => {
  const userService = di.container.resolve<UserService>(UserService.key);

  const user = await userService.getUser<ExtendedUser>({
    userId: req.session!.userId,
    extended: true,
  });

  reply.code(200).send(primitive(user));
};
