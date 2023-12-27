const path = require("path");
const { getLogger } = require(path.join(process.cwd(), "src/config"));

module.exports.start = () => {
    const app = require("./express")();
    const logger = getLogger();

    app.listen(app.get("port"), () => {
        const port = app.get("port");
        const environment = app.settings.env;
        logger.info(`Server running on port ${port} in ${environment} mode...`);
    });

    // Handling errors during server startup
    app.on("error", (error) => {
        logger.error("Server failed to start:", error);
    });
};
