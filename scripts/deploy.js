const fs = require("fs");
const child_process = require("child_process");

/**
 * Обновление проекта на сервере
 */
async function deploy() {
  const buildDirectory = `./builds/${Date.now()}-build`;
  const pm2List = JSON.parse(child_process.execSync("pm2 jlist"));

  child_process.execSync("git pull");
  child_process.execSync(
    `tsc --outDir ${buildDirectory} && npx tsconfig-replace-paths -s ./src -o ${buildDirectory}`
  );
  child_process.execSync(
    `pm2 start npm --name "universal-api" --node-args="BUILD_DIRECTORY=${buildDirectory}" -- run start`
  );
}

deploy();
