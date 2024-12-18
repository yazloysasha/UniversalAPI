import { ApiError } from "@errors";
import { UserRole } from "@entities";
import { AppFastifySchema, AppFastifyPreHandler } from "@types";

export const verifyPreHandler =
  <SchemaType extends AppFastifySchema>(
    roles: UserRole[] = []
  ): AppFastifyPreHandler<SchemaType> =>
  (req, reply, done) => {
    if (!roles.includes(req.user?.role!)) {
      throw ApiError.new(403);
    }

    done();
  };
