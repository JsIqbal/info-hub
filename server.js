(async function () {
    const path = require("path");
    const config = require(path.join(process.cwd(), "src/config"));

    await config.initEnvironmentVariables();

    const app = require(path.join(process.cwd(), "src/config/lib/app"));
    app.start();
})();
