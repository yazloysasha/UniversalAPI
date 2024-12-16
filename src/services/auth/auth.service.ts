import { ApiError } from "@errors";
import { Repository } from "typeorm";
import { Session, User } from "@entities";
import appConfig from "@consts/appConfig";
import { hashSync, compareSync } from "bcrypt";
import { JwtPayload, sign, verify } from "jsonwebtoken";

/**
 * Сервис для авторизации
 */
export class AuthService {
  constructor(
    private userRepository: Repository<User>,
    private sessionRepository: Repository<Session>
  ) {}

  /**
   * Захешировать значение
   */
  hash(value: string): string {
    return hashSync(value, appConfig.BCRYPT_ROUNDS_COUNT);
  }

  /**
   * Получить JWT
   */
  signJWT({ sessionId }: { sessionId: string }): string {
    return sign({ sessionId }, appConfig.JWT_SECRET_KEY!, {
      algorithm: "HS256",
      expiresIn: "365d",
    });
  }

  /**
   * Проверить JWT
   */
  verifyJWT({ token }: { token: string }): string | JwtPayload {
    return verify(token, appConfig.JWT_SECRET_KEY!);
  }

  /**
   * Получить ID пользователя по ID сессии
   */
  async getUserIdBySessionId({ sessionId }: { sessionId: string }) {
    const session = await this.sessionRepository.findOne({
      where: { id: sessionId },
      select: ["userId"],
    });

    if (!session) throw ApiError.notFound();

    return session.userId;
  }

  /**
   * Новая сессия и получение JWT
   */
  async newSession({ userId }: { userId: string }): Promise<string> {
    const session = this.sessionRepository.create({
      user: { id: userId },
    });

    await this.sessionRepository.insert(session);

    return this.signJWT({ sessionId: session.id });
  }

  /**
   * Уничтожить сессию
   */
  async destroySession({ sessionId }: { sessionId: string }): Promise<void> {
    await this.sessionRepository.delete({ id: sessionId });
  }

  /**
   * Регистрация нового пользователя
   */
  async register({
    name,
    password,
  }: {
    name: string;
    password: string;
  }): Promise<string> {
    try {
      const user = this.userRepository.create({
        name,
        password: this.hash(password),
      });

      await this.userRepository.insert(user);

      return user.id;
    } catch (err) {
      if ((err as Error).message.includes("UQ_065d4d8f3b5adb4a08841eae3c8")) {
        throw ApiError.badRequest({
          msg: "Пользователь с таким именем уже существует",
        });
      }

      throw err;
    }
  }

  /**
   * Аутентификация пользователя в системе
   */
  async login({
    name,
    password,
  }: {
    name: string;
    password: string;
  }): Promise<string> {
    const user: { id: string; password: string } | null =
      await this.userRepository
        .createQueryBuilder("u")
        .select(["u.id", "u.password"])
        .where("LOWER(u.name) = :name", { name: name.toLowerCase() })
        .getOne();

    if (!user || !compareSync(password, user.password)) {
      throw ApiError.badRequest({ msg: "Авторизация не удалась" });
    }

    return user.id;
  }
}
