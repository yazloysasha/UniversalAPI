import { AppJSONSchema } from "@types";

export const timestampsSample = {
  createdAt: {
    type: "string",
    description: "Дата создания",
    example: "2024-12-16T10:51:47.087Z",
  },
  updatedAt: {
    type: "string",
    description: "Дата обновления",
    example: "2024-12-16T10:51:47.087Z",
  },
} as const satisfies {
  [Property in string]: AppJSONSchema;
};
