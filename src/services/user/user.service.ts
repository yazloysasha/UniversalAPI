import { APIError } from "@utils";
import { Repository } from "typeorm";
import { User, UserRole } from "@entities";
import { ExtendedUser, IPagination, RegularUser } from "@types";

/**
 * Сервис для управления пользователями
 */
export class UserService {
  constructor(private userRepository: Repository<User>) {}

  private regularAttributes: (keyof User)[] = [
    "id",
    "name",
    "role",
    "lastVisitAt",
    "createdAt",
    "updatedAt",
  ];

  /**
   * Получить список пользователей
   */
  async getUsers({ pagination }: { pagination: IPagination }): Promise<{
    totalSize: number;
    users: RegularUser[];
  }> {
    const [totalSize, users] = await Promise.all([
      this.userRepository.count(),
      this.userRepository.find({
        skip: pagination.skip,
        take: pagination.limit,
        select: this.regularAttributes,
      }),
    ]);

    return {
      totalSize,
      users,
    };
  }

  /**
   * Получить пользователя
   */
  async getUser({
    userId,
    extended = false,
  }: {
    userId: string;
    extended?: boolean;
  }): Promise<RegularUser | ExtendedUser> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      select: extended
        ? Object.fromEntries([
            ...this.regularAttributes.map((attribute) => [attribute, true]),
            [
              "sessions",
              {
                id: true,
                createdAt: true,
                updatedAt: true,
              },
            ],
            [
              "tasks",
              {
                id: true,
                content: true,
                status: true,
                createdAt: true,
                updatedAt: true,
              },
            ],
          ])
        : this.regularAttributes,
      relations: extended ? ["sessions", "tasks"] : [],
    });

    if (!user) throw APIError.new(404);

    return user;
  }

  /**
   * Отредактировать пользователя
   */
  async editUser({
    userId,
    name,
    role,
  }: {
    userId: string;
    name?: string;
    role?: UserRole | null;
  }): Promise<RegularUser> {
    const result = await this.userRepository
      .createQueryBuilder()
      .update()
      .set({ name, role })
      .where({ id: userId })
      .returning(this.regularAttributes)
      .execute();

    if (!result.affected) throw APIError.new(404);

    return result.raw[0];
  }
}
