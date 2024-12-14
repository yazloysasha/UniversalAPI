import { StatusCodes } from "../shared";

export interface IErrorLog {
  name: string;
  message?: string;
  stack?: string;
  method?: string;
  url?: string;
}

export interface IRequestLog {
  method: string;
  url: string;
  statusCode: StatusCodes;
  duration: number;
}
