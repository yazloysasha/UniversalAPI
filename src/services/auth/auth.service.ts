import { hash } from "@utils";
import { ApiError } from "@errors";
import { Repository } from "typeorm";
import { compareSync } from "bcrypt";
import { Session, User } from "@entities";
import appConfig from "@constants/appConfig";
import { JwtPayload, sign, verify } from "jsonwebtoken";

/**
 * Сервис для авторизации пользователей
 */
export class AuthService {
  constructor(
    private userRepository: Repository<User>,
    private sessionRepository: Repository<Session>
  ) {}

  /**
   * Получить подписанный JWT
   */
  signJWT({ sessionId }: { sessionId: string }): string {
    return sign({ sessionId }, appConfig.JWT_SECRET_KEY!, {
      algorithm: "HS256",
      expiresIn: "365d",
    });
  }

  /**
   * Раскодировать JWT
   */
  verifyJWT({ token }: { token: string }): string | JwtPayload {
    return verify(token, appConfig.JWT_SECRET_KEY!);
  }

  /**
   * Создать новую сессию и получить JWT
   */
  async newSession({ userId }: { userId: string }): Promise<string> {
    const session = this.sessionRepository.create({
      user: { id: userId },
    });

    await this.sessionRepository.insert(session);

    return this.signJWT({ sessionId: session.id });
  }

  /**
   * Получить сессию по ID
   */
  async getSession({
    sessionId,
    extended = false,
  }: {
    sessionId: string;
    extended?: boolean;
  }): Promise<Session> {
    const session = await this.sessionRepository.findOne({
      where: { id: sessionId },
      relations: extended ? ["user"] : [],
    });

    if (!session) throw ApiError.new(404);

    return session;
  }

  /**
   * Уничтожить сессию по ID
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
        password: hash(password),
      });

      await this.userRepository.insert(user);

      return user.id;
    } catch (err) {
      if ((err as Error).message.includes("UQ_065d4d8f3b5adb4a08841eae3c8")) {
        throw ApiError.new(400, { msg: "services.auth.NOT_UNIQUE_NAME" });
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
      throw ApiError.new(400, { msg: "services.auth.AUTH_FAILED" });
    }

    return user.id;
  }
}
