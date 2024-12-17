import { hash } from "@utils";
import { ApiError } from "@errors";
import { Repository } from "typeorm";
import { compareSync } from "bcrypt";
import { Session, User } from "@entities";
import appConfig from "@consts/appConfig";
import { JwtPayload, sign, verify } from "jsonwebtoken";

/**
 * User authorization service
 */
export class AuthService {
  constructor(
    private userRepository: Repository<User>,
    private sessionRepository: Repository<Session>
  ) {}

  signJWT({ sessionId }: { sessionId: string }): string {
    return sign({ sessionId }, appConfig.JWT_SECRET_KEY!, {
      algorithm: "HS256",
      expiresIn: "365d",
    });
  }

  verifyJWT({ token }: { token: string }): string | JwtPayload {
    return verify(token, appConfig.JWT_SECRET_KEY!);
  }

  /**
   * New session and getting signed JWT
   */
  async newSession({ userId }: { userId: string }): Promise<string> {
    const session = this.sessionRepository.create({
      user: { id: userId },
    });

    await this.sessionRepository.insert(session);

    return this.signJWT({ sessionId: session.id });
  }

  /**
   * Get session by ID
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

    if (!session) throw ApiError.notFound();

    return session;
  }

  /**
   * Destroy session by ID
   */
  async destroySession({ sessionId }: { sessionId: string }): Promise<void> {
    await this.sessionRepository.delete({ id: sessionId });
  }

  /**
   * New user registration
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
        throw ApiError.badRequest({
          msg: "Пользователь с таким именем уже существует",
        });
      }

      throw err;
    }
  }

  /**
   * User login in the system
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
