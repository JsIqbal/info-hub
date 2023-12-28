const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");

const swagger = require("./swagger");
const config = require(path.join(process.cwd(), "src/config"));
const nodeCache = require(path.join(process.cwd(), "src/config/lib/nodecache"));

module.exports = () => {
    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    const corsOptions = {
        credentials: true,
        origin: (origin, callback) => {
            return callback(null, true);
        },
    };
    app.use(cors(corsOptions));

    app.set("port", nodeCache.getValue("PORT") || 3000);

    const globalConfig = config.getGlobalConfig();

    globalConfig.routes.forEach((routePath) => {
        require(path.resolve(routePath))(app);
    });

    // strategies are to be implemented after
    globalConfig.strategies.forEach((strategyPath) => {
        require(path.resolve(strategyPath))();
    });

    app.use(
        "/api-docs",
        swaggerUi.serve,
        swaggerUi.setup(swagger.specs, swagger.uiOptions)
    );

    return app;
};
