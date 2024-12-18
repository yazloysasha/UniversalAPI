import { AppJSONSchema } from "@types";

export const timestampsSample = {
  createdAt: {
    description: "Дата создания",
    example: "2024-12-16T10:51:47.087Z",
  },
  updatedAt: {
    description: "Дата обновления",
    example: "2024-12-16T10:51:47.087Z",
  },
} as const satisfies {
  [Property in string]: AppJSONSchema;
};
