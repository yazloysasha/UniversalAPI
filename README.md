# UniversalAPI

Шаблон является идеальным решением для разработчиков, тимлидов и архитекторов ПО, начинающим создавать новый проект, потому что включает сразу несколько преимуществ:

1. Низкий порог входа для новых разработчиков (достаточно знать **JavaScript** и базовый **TypeScript**).
2. Строгая типизация, отслеживающая ошибки после каждой написанной строки кода.
3. Тщательно продуманная архитектура, которая уже используется на реальных проектах и гарантирует быстроту масштабирования.

Список заранее готовых возможностей:

1. Регистрация зависимостей через **DI-контейнер**.
2. **Лог-менеджер**, который можно перенаправить с консоли в другую среду для отслеживания состояния проекта.
3. **Отложенные задачи**, выполняющиеся по расписанию или по интервалу и не накладывающиеся друг на друга.
4. Разделение на <ins>операционную</ins>, <ins>аналитическую</ins> и <ins>кэширующую</ins> базы данных (**PostgreSQL**, **MongoDB** и **Redis** соответственно).
5. Мультиязычность (проект поддерживает несколько языков, сейчас это **русский** и **английский**).
6. Для API выбран **Fastify**, как самый быстрый фреймворк для работы с **REST** (в 2-3 раза быстрее **Express**).
7. Написание всего одной <ins>схемы</ins> создаст новый <ins>маршрут</ins> в <ins>сваггере</ins> с <ins>валидацией</ins> и <ins>интерфейсом</ins> для разработчика (описанные данные не будут потеряны).
8. Разбиение на <ins>админские</ins> и <ins>клиентские</ins> маршруты с авторизацией, правами и функционалом для тестирования (TODO-лист).
9. **TypeORM** для работы с **PostgreSQL**, облегчающая поддержку реляционной базы данных и добавляющая механизм безопасных миграций.
10. Возможность гибкой настройки через конфигурацию для оптимизации денежных расходов (например, включить одновременно админские и клиентские маршруты, отключить аналитику или настроить конкретные задачи).

## Начало работы

1. Для работы с кодом использовать **Visual Studio Code**.
2. Клонировать репозиторий: `git clone git@github.com:yazloysasha/UniversalAPI.git`.
3. Установить зависимости: `npm install`.
4. Установить плагин **Prettier - Code formatter**.
5. Прожать CTRL + SHIFT + P и ввести `User Settings`.
6. Выбрать `Preferences: Open User Settings (JSON)`.
7. Добавить строки:
   1. `"editor.defaultFormatter": "esbenp.prettier-vscode",`
   2. `"editor.formatOnSave": true,`
   3. `"notebook.formatOnSave.enabled": true`
8. Установить плагин **TypeScript Barrel Generator**.
9. Создать в корне проекта файл `.env` и скопировать в него содержимое из `.env.example`.
10. Настроить конфигурацию `.env` под свою среду.
11. Подготовить базу данных командой `npm run migration:run`.
12. Запустить проект через `npm run dev`.

## Работа с Git

Основные ветки (в них не работаем!):

1. `main` - установлена на сервере и включает готовый и протестированный код.
2. `release` - включает все протестированные новые изменения, готовые к релизу на продакшен (не обязательно).
3. `dev` - ветка для разработки, используется для тестирования.

Префиксы веток для работы:

1. `feature` - используется при добавлении нового функционала.
2. `fix` - используется при исправлении бага.
3. `refactor` - используется при рефакторинге кода.
4. `test` - используется при тестировании кода.

Например, при исправлении бага с авторизацией, ветку необходимо назвать `fix/auth`.

## Общие правила работы с проектом

1. Для написания кода и работы с Git использовать нейминг в CamelCase.
2. Называть переменные так, чтобы было понятно их назначение, даже если название будет слегка длинным.
3. Весь неочевидный функционал сопровождать комментариями (функции, переменные, классы и прочие определения через `/** **/`, элементарные вызовы и описания можно через `//`).
4. Импорты в заглавии файлов должны идти лесенкой.

## Структура проекта

Для работы над проектом необходимо понимать его структуру.

```
├─ /scripts [скрипты]
├─ /src [корень]
│  ├─ /config [инициализация проекта]
│  ├─ /constants [константы]
│  ├─ /contracts [настройки сервисов]
│  ├─ /controllers [контроллеры для маршрутов API]
│  ├─ /entities [сущности PostgreSQL]
│  ├─ /handlers [обработчики запросов API]
│  ├─ /helpers [специализированные помощники]
│  ├─ /locales [файлы перевода]
│  ├─ /middleware [промежуточное ПО для маршрутов API]
│  ├─ /migrations [миграции PostgreSQL]
│  ├─ /models [модели MongoDB]
│  ├─ /schemas [схемы маршрутов API для сваггера и валидации]
│  ├─ /services [сервисы]
│  ├─ /tasks [отложенные задачи]
│  ├─ /types [типизация]
│  ├─ /utils [вспомогательные функции]
│  └─ main.ts [файл запуска]
├─ .env.example [пример конфигурации]
└─ .env [конфигурация разработчика]
```

## Типичный день разработчика

Предположим, что нам нужно создать новый маршрут для API. Для этого нужно воспользоваться следующей последовательностью действий:

1. Добавить новую схему в `/schemas`.
2. Добавить новый обработчик в `/handlers`.
3. Добавить новый контроллер в `/controllers`, указав промежуточное ПО (если нужно), схему и обработчик.
4. Добавить новый метод в существующем сервисе или создать новый в `/services`, обязательно включив его в DI-контейнер (`/config/DIContainer/setupDIContainer`).
5. Если требуется отредактировать структуру в PostgreSQL:
   1. Внести изменения в сущности и убедиться, что они конечны.
   2. Выполнить команду `npm run migration:generate` для создания миграции.
   3. Найти новый файл миграции в `/migrations`, проверить и сохранить его.
   4. Выполнить миграцию в локальную базу данных по команде `npm run migration:run`.
   5. Если потребовалось изменить структуру снова, то прописать `npm run migration:revert` и повторить предыдущие шаги.
6. Если типизатор в обработчике `reply.send(...)` жалуется на невозможность приведения типов `Date` или `ObjectId` к `string`, использовать утилиту `primitive(...)` для приведения указанных типов к строке.
7. Выполнить команду `npm run lint`, чтобы проверить работоспособность кода.
8. Открыть сваггер в браузере и протестировать свою работу.
