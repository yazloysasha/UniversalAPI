const fs = require("fs");
const child_process = require("child_process");

/**
 * Process name in PM2
 */
const PROCESS_NAME = "universal-api";

/**
 * Updating the project on the server
 */
async function deploy() {
  console.log("Installing packages...");

  child_process.execSync("npm install");

  console.log("Compilation to JavaScript...");

  child_process.execSync("npm run build");

  console.log("Performing migrations...");

  try {
    const migrationRunResult = child_process
      .execSync("npm run migration:run")
      .toString();

    if (migrationRunResult.includes("Error during migration run")) {
      throw migrationRunResult;
    }
  } catch (data) {
    console.log(data);

    throw Error("Failed to perform migration!");
  }

  console.log("Checking data integrity...");

  try {
    const schemaLogResult = child_process
      .execSync("npm run schema:log")
      .toString();

    if (schemaLogResult.includes("Schema synchronization will execute")) {
      throw schemaLogResult;
    }
  } catch (data) {
    console.log(data);

    throw Error("Data loss detected!");
  }

  console.log("Running a project in shadow mode...");

  let stdout = "";

  const shadowProcess = child_process
    .spawn("npm run pre-start", { shell: true })
    .on("exit", (code, signal) => {
      if (code || signal !== "SIGINT") {
        console.log(stdout);

        throw Error("Running a project in shadow mode!");
      }

      console.log("Getting a list of processes...");

      const pm2List = JSON.parse(child_process.execSync("pm2 jlist"));
      const processIsExists = !!pm2List.find(
        (pm2Process) => pm2Process.name === PROCESS_NAME
      );

      console.log("Resource movement...");

      fs.cpSync("./build", "./dist", { recursive: true });

      console.log("Launching a project in PRODUCTION mode...");

      if (processIsExists) {
        child_process.execSync(`pm2 restart "${PROCESS_NAME}"`);
      } else {
        child_process.execSync(
          `pm2 start npm --name "${PROCESS_NAME}" -- run start`
        );
      }

      removeBuildDirectory();

      console.log("The project has been successfully launched!");

      process.exit();
    });

  shadowProcess.stdout.on("data", (data) => {
    const message = data.toString();

    stdout += message;

    if (
      message.includes("FATAL:") &&
      !message.includes("listen EADDRINUSE: address already in use")
    ) {
      shadowProcess.kill(9);
    } else if (message.includes("Project launch completed")) {
      shadowProcess.kill(2);
    }
  });
}

/**
 * Clear temporary build directory
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
