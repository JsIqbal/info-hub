const swaggerJsdoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Info-Hub API",
            description: `
                The Info-Hub API is designed to provide information retrieval functionality.
                It allows users to perform keyword searches on an external API and stores the results in a database.
            `,
            version: "1.0.0",
            contact: {
                name: "Iqbal Hossain",
                email: "zafar.iq3089@gmail.com",
                url: "https://github.com/JsIqbal",
            },
            license: {
                name: "MIT",
                url: "https://opensource.org/licenses/MIT",
            },
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
