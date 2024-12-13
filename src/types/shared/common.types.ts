export enum CustomFormat {
  MONGOOSE_ID = "objectId",
  UUID = "uuid",
}

export interface IAppConfig {
  FASTIFY_PORT?: string;
  DATABASE_URL?: string;
}

export interface IPagination {
  skip: number;
  limit: number;
}
