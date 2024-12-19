import { SwaggerContract } from "@contracts";
import { AppJSONSchema, CustomFormat } from "@types";

export const timestampsSample = {
  createdAt: {
    type: "string",
    format: CustomFormat.DATE_TIME,
    description: "Дата создания",
    example: SwaggerContract.DateTimeExample,
  },
  updatedAt: {
    type: "string",
    format: CustomFormat.DATE_TIME,
    description: "Дата обновления",
    example: SwaggerContract.DateTimeExample,
  },
} as const satisfies {
  [Property in string]: AppJSONSchema;
};
