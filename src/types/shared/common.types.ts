export enum CustomFormat {
  MONGOOSE_ID = "objectId",
  UUID = "uuid",
}

export interface IAppConfig {
  FASTIFY_PORT?: string;
  OPERATIONAL_DATABASE_URL?: string;
  ANALYTICAL_DATABASE_URL?: string;
}

export interface IPagination {
  skip: number;
  limit: number;
}
