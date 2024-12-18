import { AppJSONSchema } from "@types";
import { userIdSchema } from "@schemas/client";

export const paramsWithUserId = {
  type: "object",
  required: ["userId"],
  properties: {
    userId: userIdSchema,
  },
} as const satisfies AppJSONSchema;
