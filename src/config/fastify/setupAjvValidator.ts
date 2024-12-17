import Ajv from "ajv";
import ajvErrors from "ajv-errors";
import { validate as isValidUUID } from "uuid";
import { AppFastifyInstance, CustomFormat } from "@types";

/**
 * Data Validator for Fastify
 */
export const setupAjvValidator = (fastify: AppFastifyInstance): void => {
  const ajv = new Ajv({
    removeAdditional: true,
    coerceTypes: true,
    strict: "log",
    keywords: ["kind", "modifier", "example"],
    useDefaults: true,
    allErrors: true,
    strictRequired: false,
    strictNumbers: false,
  });

  ajvErrors(ajv);

  /**
   * Format for checking UUID
   */
  ajv.addFormat(CustomFormat.UUID, {
    type: "string",
    validate: (value) => isValidUUID(value),
  });

  fastify.setValidatorCompiler(({ schema }) => {
    return ajv.compile(schema);
  });
};
