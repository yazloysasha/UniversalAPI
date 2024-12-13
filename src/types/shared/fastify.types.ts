import {
  RouteOptions,
  FastifySchema,
  FastifyInstance,
  RawServerDefault,
  FastifyBaseLogger,
  RouteHandlerMethod,
  RouteGenericInterface,
  preHandlerHookHandler,
} from "fastify";
import { StatusCodes } from "@types";
import { SwaggerContract } from "@contracts";
import { JSONSchema } from "json-schema-to-ts";
import { IncomingMessage, ServerResponse } from "http";
import { JsonSchemaToTsProvider } from "@fastify/type-provider-json-schema-to-ts";

export type AppFastifyInstance = FastifyInstance<
  RawServerDefault,
  IncomingMessage,
  ServerResponse<IncomingMessage>,
  FastifyBaseLogger,
  JsonSchemaToTsProvider
>;

export type AppJSONSchema = JSONSchema & {
  items?: AppJSONSchema | readonly AppJSONSchema[];
  additionalItems?: AppJSONSchema;
  contains?: AppJSONSchema;
  properties?: Readonly<Record<string, AppJSONSchema>>;
  patternProperties?: Readonly<Record<string, AppJSONSchema>>;
  additionalProperties?: AppJSONSchema;
  unevaluatedProperties?: AppJSONSchema;
  dependencies?: Readonly<Record<string, AppJSONSchema | readonly string[]>>;
  propertyNames?: AppJSONSchema;
  if?: AppJSONSchema;
  then?: AppJSONSchema;
  else?: AppJSONSchema;
  allOf?: readonly AppJSONSchema[];
  anyOf?: readonly AppJSONSchema[];
  oneOf?: readonly AppJSONSchema[];
  not?: AppJSONSchema;
  definitions?: Readonly<Record<string, AppJSONSchema>>;
  example?: unknown;
};

export interface AppFastifySchema extends FastifySchema {
  tags: SwaggerContract.ClientTag[];
  summary: string;
  body?: AppJSONSchema;
  querystring?: AppJSONSchema;
  params?: AppJSONSchema;
  headers?: AppJSONSchema;
  response?: {
    [Property in StatusCodes]?: AppJSONSchema;
  };
}

export type AppFastifyRoute<SchemaType extends AppFastifySchema> = RouteOptions<
  RawServerDefault,
  IncomingMessage,
  ServerResponse<IncomingMessage>,
  RouteGenericInterface,
  unknown,
  SchemaType,
  JsonSchemaToTsProvider,
  FastifyBaseLogger
>;

export type AppFastifyPreHandler<SchemaType extends AppFastifySchema> =
  preHandlerHookHandler<
    RawServerDefault,
    IncomingMessage,
    ServerResponse<IncomingMessage>,
    RouteGenericInterface,
    unknown,
    SchemaType,
    JsonSchemaToTsProvider,
    FastifyBaseLogger
  >;

export type AppFastifyHandler<SchemaType extends AppFastifySchema> =
  RouteHandlerMethod<
    RawServerDefault,
    IncomingMessage,
    ServerResponse<IncomingMessage>,
    RouteGenericInterface,
    unknown,
    SchemaType,
    JsonSchemaToTsProvider,
    FastifyBaseLogger
  >;
