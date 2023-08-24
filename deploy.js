const { exec } = require("child_process");

console.log("Building the project...");
exec("sudo npm run build", async (buildError) => {
  if (buildError) {
    console.error(`Build error: ${buildError.message}`);
    return;
  }

  console.log("Deployment started...");
  await exec("sudo npx netlify init --manual");
  exec("sudo npx netlify deploy --prod", (deployError, stdout) => {
    if (deployError) {
      console.error(`Deployment error: ${deployError.message}`);
      return;
    }

    const deploymentStatus = stdout.match(/https:\/\/.+$/m);
    console.log({ deploymentStatus: deploymentStatus.input });
    if (deploymentStatus && deploymentStatus.input) {
      for (const deploymentStr of deploymentStatus.input.split("\n")) {
        console.log(deploymentStr);
      }
    }
  });
});
