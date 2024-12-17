import {
  GetUserType,
  EditUserType,
  GetUsersType,
  getUserSchema,
  editUserSchema,
  getUsersSchema,
} from "@schemas/admin";
import {
  getUserHandler,
  editUserHandler,
  getUsersHandler,
} from "@handlers/admin";
import { UserRole } from "@entities";
import { AppFastifyRoute } from "@types";
import { verifyPreHandler } from "@middleware";

/**
 * Get all users
 */
export const getUsersController: AppFastifyRoute<GetUsersType> = {
  url: "/users",
  method: "GET",
  schema: getUsersSchema,
  preHandler: verifyPreHandler([UserRole.ADMINISTRATOR]),
  handler: getUsersHandler,
};

/**
 * Get one user
 */
export const getUserController: AppFastifyRoute<GetUserType> = {
  url: "/users/:userId",
  method: "GET",
  schema: getUserSchema,
  preHandler: verifyPreHandler([UserRole.ADMINISTRATOR]),
  handler: getUserHandler,
};

/**
 * Edit a user
 */
export const editUserController: AppFastifyRoute<EditUserType> = {
  url: "/users/:userId",
  method: "PATCH",
  schema: editUserSchema,
  preHandler: verifyPreHandler([UserRole.ADMINISTRATOR]),
  handler: editUserHandler,
};
