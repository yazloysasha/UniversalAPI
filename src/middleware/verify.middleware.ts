import { APIError } from "@utils";
import { UserRole } from "@entities";
import { AppFastifySchema, AppFastifyPreHandler } from "@types";

export const verifyPreHandler =
  <SchemaType extends AppFastifySchema>(
    roles: UserRole[] = []
  ): AppFastifyPreHandler<SchemaType> =>
  (req, reply, done) => {
    if (!roles.includes(req.user?.role!)) {
      throw new APIError(403);
    }

    done();
  };
