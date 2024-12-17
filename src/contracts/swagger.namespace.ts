import {
  StatusCodes,
  SuccessCode,
  AppJSONSchema,
  FastifyRoutes,
  RedirectionCode,
  ClientErrorCode,
  ServerErrorCode,
  InformationalCode,
} from "@types";
import { FastifySwaggerUiOptions } from "@fastify/swagger-ui";
import { FastifyDynamicSwaggerOptions } from "@fastify/swagger";

export namespace SwaggerContract {
  /**
   * Tag for Client API documentation
   */
  export enum ClientTag {
    AUTH = "Auth",
    TASKS = "Tasks",
  }

  /**
   * Tag for Admin API documentation
   */
  export enum AdminTag {
    USERS = "Users",
  }

  /**
   * Descriptions for REST API response codes
   */
  export const CodeDescriptions = {
    [InformationalCode.CONTINUE]: "Продолжайте",
    [InformationalCode.SWITCHING_PROTOCOLS]: "Переключение протоколов",
    [InformationalCode.PROCESSING]: "Идёт обработка",
    [InformationalCode.EARLY_HINTS]: "Предварительный ответ",

    [SuccessCode.OK]: "Хорошо",
    [SuccessCode.CREATED]: "Создано",
    [SuccessCode.ACCEPTED]: "Принято",
    [SuccessCode.NON_AUTHORITATIVE_INFORMATION]: "Информация не авторитетна",
    [SuccessCode.NO_CONTENT]: "Нет содержимого",
    [SuccessCode.RESET_CONTENT]: "Сбросить содержимое",
    [SuccessCode.PARTIAL_CONTENT]: "Частичное содержимое",
    [SuccessCode.MULTI_STATUS]: "Многостатусный",
    [SuccessCode.ALREADY_REPORTED]: "Уже сообщалось",
    [SuccessCode.IM_USED]: "Использовано IM",

    [RedirectionCode.MULTIPLE_CHOISES]: "Множество выборов",
    [RedirectionCode.MOVED_PERMANENTLY]: "Перемещено навсегда",
    [RedirectionCode.FOUND]: "Найдено",
    [RedirectionCode.SEE_OTHER]: "Смотреть другое",
    [RedirectionCode.NOT_MODIFIED]: "Не изменено",
    [RedirectionCode.USE_PROXY]: "Использовать прокси",
    [RedirectionCode.TEMPORARY_REDIRECT]: "Временное перенаправление",
    [RedirectionCode.PERMANENT_REDIRECT]: "Постоянное перенаправление",

    [ClientErrorCode.BAD_REQUEST]: "Некорректный запрос",
    [ClientErrorCode.UNAUTHORIZED]: "Не авторизован",
    [ClientErrorCode.FORBIDDEN]: "Не уполномочен",
    [ClientErrorCode.NOT_FOUND]: "Не найдено",
    [ClientErrorCode.METHOD_NOT_ALLOWED]: "Метод не поддерживается",
    [ClientErrorCode.NOT_ACCEPTABLE]: "Неприемлемо",
    [ClientErrorCode.PROXY_AUTHENTIFICATION_REQUIRED]:
      "Необходима аутентификация прокси",
    [ClientErrorCode.REQUEST_TIMEOUT]: "Истекло время ожидания",
    [ClientErrorCode.CONFLICT]: "Конфликт",
    [ClientErrorCode.GONE]: "Удалён",
    [ClientErrorCode.LENGTH_REQUIRED]: "Необходима длина",
    [ClientErrorCode.PRECONDITION_FAILED]: "Предусловие ложно",
    [ClientErrorCode.PAYLOAD_TOO_LARGE]: "Полезная нагрузка слишком велика",
    [ClientErrorCode.URI_TOO_LONG]: "URI слишком длинный",
    [ClientErrorCode.UNSUPPORTED_MEDIA_TYPE]: "Неподдерживаемый тип данных",
    [ClientErrorCode.RANGE_NOT_SATISFIABLE]: "Диапазон не достижим",
    [ClientErrorCode.EXPECTATION_FAILED]: "Ожидание не оправдалось",
    [ClientErrorCode.I_AM_A_TEAPOT]: "Я - чайник",
    [ClientErrorCode.MISDIRECTED_REQUEST]: "Этот сервер не способен дать ответ",
    [ClientErrorCode.UNPROCESSABLE_ENTITY]: "Необрабатываемый экземпляр",
    [ClientErrorCode.LOCKED]: "Заблокировано",
    [ClientErrorCode.FAILED_DEPENDENCY]: "Невыполненная зависимость",
    [ClientErrorCode.TOO_EARLY]: "Слишком рано",
    [ClientErrorCode.UPGRADE_REQUIRED]: "Необходимо обновление",
    [ClientErrorCode.PRECONDITION_REQUIRED]: "Необходимо предусловие",
    [ClientErrorCode.TOO_MANY_REQUESTS]: "Слишком много запросов",
    [ClientErrorCode.REQUEST_HEADER_FIELDS_TOO_LARGE]:
      "Поля заголовка слишком большие",
    [ClientErrorCode.RETRY_WITH]: "Повторить с",
    [ClientErrorCode.UNAVAILABLE_FOR_LEGAL_REASONS]:
      "Недоступно по юридическим причинам",
    [ClientErrorCode.CLIENT_CLOSED_REQUEST]: "Клиент закрыл соединение",

    [ServerErrorCode.INTERNAL_SERVER_ERROR]: "Внутренняя ошибка сервера",
    [ServerErrorCode.NOT_IMPLEMENTED]: "Не реализовано",
    [ServerErrorCode.BAD_GATEWAY]: "Некорректный шлюз",
    [ServerErrorCode.SERVICE_UNAVAILABLE]: "Сервис недоступен",
    [ServerErrorCode.GATEWAY_TIMEOUT]: "Шлюз не отвечает",
    [ServerErrorCode.HTTP_VERSION_NOT_SUPPORTED]:
      "Версия HTTP не поддерживается",
    [ServerErrorCode.VARIANT_ALSO_NEGOTIATES]:
      "Вариант тоже проводит согласование",
    [ServerErrorCode.INSUFFICIENT_STORAGE]: "Переполнение хранилища",
    [ServerErrorCode.LOOP_DETECTED]: "Обнаружено бесконечное перенаправление",
    [ServerErrorCode.BANDWIDTH_LIMIT_EXCEEDED]:
      "Исчерпана пропускная ширина канала",
    [ServerErrorCode.NOT_EXTENDED]: "Не расширено",
    [ServerErrorCode.NETWORK_AUTHENTIFICATION_REQUIRED]:
      "Требуется сетевая аутентификация",
    [ServerErrorCode.UNKNOWN_ERROR]: "Неизвестная ошибка",
    [ServerErrorCode.WEB_SERVER_IS_DOWN]: "Веб-сервер не работает",
    [ServerErrorCode.CONNECTION_TIMED_OUT]: "Соединение не отвечает",
    [ServerErrorCode.ORIGIN_IS_UNREACHABLE]: "Источник недоступен",
    [ServerErrorCode.A_TIMEOUT_OCCURRED]: "Время ожидания истекло",
    [ServerErrorCode.SSL_HANDSHAKE_FAILED]: "Квитирование SSL не удалось",
    [ServerErrorCode.INVALID_SSL_CERTIFICATE]:
      "Недействительный сертификат SSL",
  } as const satisfies {
    [Property in StatusCodes]: string;
  };

  export const UUIDExample = "3fa85f64-5717-4562-b3fc-2c963f66afa6";
  export const MongooseIDExample = "66f271c7e1ab2c1ef584e7ec";

  /**
   * Query schema with pagination enabled
   */
  export const EnablePaginationSchema = {
    type: "object",
    properties: {
      skip: {
        type: "integer",
        minimum: 0,
        default: 0,
        description: "How many elements need to be skipped",
        example: 0,
      },
      limit: {
        type: "integer",
        minimum: 1,
        maximum: 100,
        default: 100,
        description: "Maximum count of elements",
        example: 100,
      },
    },
  } as const satisfies AppJSONSchema;

  /**
   * Schema for responding to a request with an action
   */
  export const ActionResponseSchema = {
    type: "object",
    required: ["alert", "message"],
    description: "Response to action",
    properties: {
      alert: {
        type: "boolean",
        description: "Should the notification be shown to the user",
        example: true,
      },
      message: {
        type: "string",
        description: "Message for notification",
        example: "Успешно сохранено",
      },
    },
  } as const satisfies AppJSONSchema;

  /**
   * Schema type for response to request with action
   */
  export type ActionResponseType = {
    type: "object";
    required: readonly ["alert", "message", ...string[]];
    description: string;
    properties: {
      alert: {
        type: "boolean";
        description: string;
        example: boolean;
      };
      message: {
        type: "string";
        description: string;
        example: string;
      };
      [x: string]: AppJSONSchema;
    };
  };

  /**
   * Schema for responding a query with pagination
   */
  export const PaginatedResponseSchema = {
    type: "object",
    required: ["totalSize", "items"],
    description: "Reply to request",
    properties: {
      totalSize: {
        type: "integer",
        description: "Count of all elements",
        example: 128,
      },
      items: {
        type: "array",
        description: "Elements of array",
        // "items" writed by the developer
      },
    },
  } as const satisfies AppJSONSchema;

  /**
   * Schema type for responding a query with pagination
   */
  export type PaginatedResponseType = {
    type: "object";
    required: readonly ["totalSize", "items", ...string[]];
    description: string;
    properties: {
      totalSize: {
        type: "integer";
        description: string;
        example: number;
      };
      items: {
        type: "array";
        description: string;
        items: AppJSONSchema;
      };
      [x: string]: AppJSONSchema;
    };
  };

  /**
   * Get the schema for the response with the error
   */
  export const ClientErrorResponseFactory = (
    clientErrorCode: ClientErrorCode
  ) => {
    return {
      type: ActionResponseSchema.type,
      required: ActionResponseSchema.required,
      description: "Response to request with error",
      properties: {
        alert: ActionResponseSchema.properties.alert,
        message: {
          type: ActionResponseSchema.properties.message.type,
          description: "Error description",
          example: CodeDescriptions[clientErrorCode],
        },
      },
    } as const satisfies ActionResponseType;
  };

  export const GetConfig = (
    routes: FastifyRoutes
  ): FastifyDynamicSwaggerOptions => {
    const openapi: FastifyDynamicSwaggerOptions["openapi"] = {
      openapi: "3.0.0",
      tags: [],
      components: {
        securitySchemes: {
          Bearer: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
    };

    switch (routes) {
      case "admin":
        openapi.info = {
          title: "Admin API",
          version: "1.0.0",
        };

        openapi.tags!.push({
          name: SwaggerContract.AdminTag.USERS,
          description: "Routes for user management",
        });
        break;

      case "client":
        openapi.info = {
          title: "Client API",
          version: "1.0.0",
        };

        openapi.tags!.push(
          {
            name: SwaggerContract.ClientTag.AUTH,
            description: "Authorization routes",
          },
          {
            name: SwaggerContract.ClientTag.TASKS,
            description: "Routes for working with tasks",
          }
        );
        break;
    }

    return {
      swagger: {
        consumes: ["application/json", "text/xml"],
        produces: ["application/json", "text/xml"],
      },
      openapi,
    };
  };

  export const ConfigUi: FastifySwaggerUiOptions = {
    routePrefix: "docs",
    uiConfig: {
      docExpansion: "list",
      deepLinking: false,
    },
  };
}
