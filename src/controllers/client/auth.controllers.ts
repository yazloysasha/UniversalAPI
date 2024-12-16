import {
  LoginType,
  LogoutType,
  loginSchema,
  RegisterType,
  logoutSchema,
  registerSchema,
} from "@schemas/client";
import { AppFastifyRoute } from "@types";
import { authPreHandler } from "@middleware";
import { loginHandler, logoutHandler, registerHandler } from "@handlers/client";

/**
 * Вход в аккаунт
 */
export const loginController: AppFastifyRoute<LoginType> = {
  url: "/login",
  method: "POST",
  schema: loginSchema,
  handler: loginHandler,
};

/**
 * Регистрация пользователя
 */
export const registerController: AppFastifyRoute<RegisterType> = {
  url: "/register",
  method: "POST",
  schema: registerSchema,
  handler: registerHandler,
};

/**
 * Выход из аккаунта
 */
export const logoutController: AppFastifyRoute<LogoutType> = {
  url: "/logout",
  method: "POST",
  schema: logoutSchema,
  preHandler: authPreHandler(),
  handler: logoutHandler,
};
