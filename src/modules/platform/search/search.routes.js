const path = require("path");

const { search } = require(path.join(
    process.cwd(),
    "src/modules/platform/search/search.controller"
));

const healthCheck = (req, res) => {
    res.json({ status: "ok" });
};

module.exports = (app) => {
    app.route("/api/search").get(search);

    app.route("/api/health-check").get(healthCheck);
};
