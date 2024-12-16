import { Session, User } from "@entities";

export type RegularUser = Pick<
  User,
  "id" | "name" | "role" | "createdAt" | "updatedAt"
>;

export type ExtendedUser = RegularUser & {
  sessions: Pick<Session, "id" | "createdAt" | "updatedAt">[];
};
