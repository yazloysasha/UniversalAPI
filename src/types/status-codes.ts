export enum InformationalCode {
  CONTINUE = 100, // Продолжайте
  SWITCHING_PROTOCOLS = 101, // Переключение протоколов
  PROCESSING = 102, // Идёт обработка
  EARLY_HINTS = 103, // Предварительный ответ
}

export enum SuccessCode {
  OK = 200, // Хорошо
  CREATED = 201, // Создано
  ACCEPTED = 202, // Принято
  NON_AUTHORITATIVE_INFORMATION = 203, // Информация не авторитетна
  NO_CONTENT = 204, // Нет содержимого
  RESET_CONTENT = 205, // Сбросить содержимое
  PARTIAL_CONTENT = 206, // Частичное содержимое
  MULTI_STATUS = 207, // Многостатусный
  ALREADY_REPORTED = 208, // Уже сообщалось
  IM_USED = 226, // Использовано IM
}

export enum RedirectionCode {
  MULTIPLE_CHOISES = 300, // Множество выборов
  MOVED_PERMANENTLY = 301, // Перемещено навсегда
  FOUND = 302, // Найдено
  SEE_OTHER = 303, // Смотреть другое
  NOT_MODIFIED = 304, // Не изменено
  USE_PROXY = 305, // Использовать прокси
  TEMPORARY_REDIRECT = 307, // Временное перенаправление
  PERMANENT_REDIRECT = 308, // Постоянное перенаправление
}

export enum ClientErrorCode {
  BAD_REQUEST = 400, // Некорректный запрос
  UNAUTHORIZED = 401, // Не авторизован
  FORBIDDEN = 403, // Не уполномочен
  NOT_FOUND = 404, // Не найдено
  METHOD_NOT_ALLOWED = 405, // Метод не поддерживается
  NOT_ACCEPTABLE = 406, // Неприемлемо
  PROXY_AUTHENTIFICATION_REQUIRED = 407, // Необходима аутентификация прокси
  REQUEST_TIMEOUT = 408, // Истекло время ожидания
  CONFLICT = 409, // Конфликт
  GONE = 410, // Удалён
  LENGTH_REQUIRED = 411, // Необходима длина
  PRECONDITION_FAILED = 412, // Предусловие ложно
  PAYLOAD_TOO_LARGE = 413, // Полезная нагрузка слишком велика
  URI_TOO_LONG = 414, // URI слишком длинный
  UNSUPPORTED_MEDIA_TYPE = 415, // Неподдерживаемый тип данных
  RANGE_NOT_SATISFIABLE = 416, // Диапазон не достижим
  EXPECTATION_FAILED = 417, // Ожидание не оправдалось
  I_AM_A_TEAPOT = 418, // Я - чайник
  MISDIRECTED_REQUEST = 421, // Этот сервер не способен дать ответ
  UNPROCESSABLE_ENTITY = 422, // Необрабатываемый экземпляр
  LOCKED = 423, // Заблокировано
  FAILED_DEPENDENCY = 424, // Невыполненная зависимость
  TOO_EARLY = 425, // Слишком рано
  UPGRADE_REQUIRED = 426, // Необходимо обновление
  PRECONDITION_REQUIRED = 428, // Необходимо предусловие
  TOO_MANY_REQUESTS = 429, // Слишком много запросов
  REQUEST_HEADER_FIELDS_TOO_LARGE = 431, // Поля заголовка слишком большие
  RETRY_WITH = 449, // Повторить с
  UNAVAILABLE_FOR_LEGAL_REASONS = 451, // Недоступно по юридическим причинам
  CLIENT_CLOSED_REQUEST = 499, // Клиент закрыл соединение
}

export enum ServerErrorCode {
  INTERNAL_SERVER_ERROR = 500, // Внутренняя ошибка сервера
  NOT_IMPLEMENTED = 501, // Не реализовано
  BAD_GATEWAY = 502, // Некорректный шлюз
  SERVICE_UNAVAILABLE = 503, // Сервис недоступен
  GATEWAY_TIMEOUT = 504, // Шлюз не отвечает
  HTTP_VERSION_NOT_SUPPORTED = 505, // Версия HTTP не поддерживается
  VARIANT_ALSO_NEGOTIATES = 506, // Вариант тоже проводит согласование
  INSUFFICIENT_STORAGE = 507, // Переполнение хранилища
  LOOP_DETECTED = 508, // Обнаружено бесконечное перенаправление
  BANDWIDTH_LIMIT_EXCEEDED = 509, // Исчерпана пропускная ширина канала
  NOT_EXTENDED = 510, // Не расширено
  NETWORK_AUTHENTIFICATION_REQUIRED = 511, // Требуется сетевая аутентификация
  UNKNOWN_ERROR = 520, // Неизвестная ошибка
  WEB_SERVER_IS_DOWN = 521, // Веб-сервер не работает
  CONNECTION_TIMED_OUT = 522, // Соединение не отвечает
  ORIGIN_IS_UNREACHABLE = 523, // Источник недоступен
  A_TIMEOUT_OCCURRED = 524, // Время ожидания истекло
  SSL_HANDSHAKE_FAILED = 525, // Квитирование SSL не удалось
  INVALID_SSL_CERTIFICATE = 526, // Недействительный сертификат SSL
}

export type StatusCodes =
  | InformationalCode
  | SuccessCode
  | RedirectionCode
  | ClientErrorCode
  | ServerErrorCode;
