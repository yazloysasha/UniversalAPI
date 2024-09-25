import Ajv from "ajv";
import ajvErrors from "ajv-errors";
import { isValidObjectId } from "mongoose";
import { AppFastifyInstance, CustomFormat } from "@types";

/**
 * Валидатор ошибок для Fastify
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
   * Формат для проверки Mongoose ID
   */
  ajv.addFormat(CustomFormat.MONGOOSE_ID, {
    type: "string",
    validate: (value) => isValidObjectId(value),
  });

  fastify.setValidatorCompiler(({ schema }) => {
    return ajv.compile(schema);
  });
};
