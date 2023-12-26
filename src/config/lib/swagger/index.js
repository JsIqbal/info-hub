const swaggerJsdoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Info-Hub",
            description: "API Documentation for Sharetrip",
            version: "1.0.0",
        },
    },
    apis: ["./src/config/lib/swagger/*.yaml"],
};

const specs = swaggerJsdoc(options);

const uiOptions = {
    swaggerOptions: {
        docExpansion: "list",
    },
};

exports.specs = specs;
exports.uiOptions = uiOptions;
