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
  const pm2List = JSON.parse(child_process.execSync("pm2 jlist"));
  if (!Array.isArray(pm2List)) {
    throw Error(`Не удалось выполнить команду "pm2 list"`);
  }

  const processIsExists = !!pm2List.find(
    (pm2Process) => pm2Process.name === PROCESS_NAME
  );

  child_process.execSync("npm install");
  child_process.execSync("npm run build");

  /**
   * TODO: Валидация данных в БД и возможных ошибок при запуске
   */

  fs.cpSync("./build", "./dist", { recursive: true });

  if (processIsExists) {
    child_process.execSync(`pm2 restart "${PROCESS_NAME}"`);
  } else {
    child_process.execSync(
      `pm2 start npm --name "${PROCESS_NAME}" -- run start`
    );
  }

  fs.rmSync("./build", { recursive: true });
}

deploy();
