# UniversalAPI
Шаблон является идеальным решением для разработчиков, тимлидов и архитекторов ПО, начинающим создавать новый проект, потому что включает сразу несколько преимуществ:
1. Низкий порог входа для новых разработчиков (достаточно знать **JavaScript** и базовый **TypeScript**).
2. Строгая типизация, отслеживающая ошибки после каждой написанной строки кода.
3. Тщательно продуманная архитектура, которая уже используется на реальных проектах.

Список заранее готовых возможностей:
1. Регистрация зависимостей через **DI-контейнер**.
2. **Лог-менеджер**, который можно перенаправить с консоли в другую среду для отслеживания состояния проекта.
3. **Отложенные задачи**, выполняющиеся по расписанию или по интервалу и не накладывающиеся друг на друга.
4. Разделение на __операционную__, __аналитическую__ и __кэширующую__ базы данных (**PostgreSQL**, **MongoDB** и **Redis** соответственно).
5. Мультиязычность (проект поддерживает несколько языков, сейчас это **русский** и **английский**).
6. Для API выбран **Fastify**, как самый быстрый фреймворк для работы с **REST** (в 2-3 раза быстрее **Express**).
7. Написание всего одной __схемы__ даст новый __маршрут__ в __сваггере__ с __валидацией__ и __интерфейсом__ для разработчика (описанные данные не будут потеряны).
8. Разбиение на __админские__ и __клиентские__ маршруты с авторизацией и функционалом для тестирования (TODO-лист).
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
11. Запустить проект через `npm run dev`.
