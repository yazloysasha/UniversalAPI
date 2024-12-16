const fs = require("fs");
const child_process = require("child_process");

/**
 * Название процесса в PM2
 */
const PROCESS_NAME = "universal-api";

/**
 * Обновление проекта на сервере
 */
async function deploy() {
  console.log("Установка пакетов...");

  child_process.execSync("npm install");

  console.log("Компиляция в JavaScript...");

  child_process.execSync("npm run build");

  console.log("Выполнение миграций...");

  try {
    const migrationRunResult = child_process
      .execSync("npm run migration:run")
      .toString();

    if (migrationRunResult.includes("Error during migration run")) {
      throw migrationRunResult;
    }
  } catch (data) {
    console.log(data);

    throw Error("Не удалось выполнить миграцию!");
  }

  console.log("Проверка целостности данных...");

  try {
    const schemaLogResult = child_process
      .execSync("npm run schema:log")
      .toString();

    if (schemaLogResult.includes("Schema synchronization will execute")) {
      throw schemaLogResult;
    }
  } catch (data) {
    console.log(data);

    throw Error("Обнаружена потеря данных!");
  }

  console.log("Запуск проекта в теневом режиме...");

  let stdout = "";

  const backgroundProcess = child_process
    .spawn("npm run pre-start", { shell: true })
    .on("exit", (code, signal) => {
      if (code || signal !== "SIGINT") {
        console.log(stdout);

        throw Error("Произошла ошибка при запуске проекта в теневом режиме!");
      }

      console.log("Получение списка процессов...");

      const pm2List = JSON.parse(child_process.execSync("pm2 jlist"));
      const processIsExists = !!pm2List.find(
        (pm2Process) => pm2Process.name === PROCESS_NAME
      );

      console.log("Перемещение ресурсов...");

      fs.cpSync("./build", "./dist", { recursive: true });

      console.log("Запуск проекта в режиме PRODUCTION...");

      if (processIsExists) {
        child_process.execSync(`pm2 restart "${PROCESS_NAME}"`);
      } else {
        child_process.execSync(
          `pm2 start npm --name "${PROCESS_NAME}" -- run start`
        );
      }

      removeBuildDirectory();

      console.log("Проект успешно запущен!");

      process.exit();
    });

  backgroundProcess.stdout.on("data", (data) => {
    const message = data.toString();

    stdout += message;

    if (
      message.includes("FATAL:") &&
      !message.includes("listen EADDRINUSE: address already in use")
    ) {
      backgroundProcess.kill(9);
    } else if (message.includes("Запуск проекта завершён")) {
      backgroundProcess.kill(2);
    }
  });
}

/**
 * Очистить директорию со временной сборкой
 */
function removeBuildDirectory() {
  if (fs.existsSync("./build")) {
    fs.rmSync("./build", { recursive: true });
  }
}

deploy().catch((err) => {
  removeBuildDirectory();

  console.error(err.message);

  process.exit(1);
});
