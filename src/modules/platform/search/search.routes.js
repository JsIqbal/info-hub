const path = require("path");

const { search } = require(path.join(
    process.cwd(),
    "src/modules/platform/search/search.controller"
));

// Health Check Controller
const healthCheck = (req, res) => {
    res.json({ status: "ok" });
};

module.exports = (app) => {
    // Search route
    app.route("/api/search").get(search);

    // Health Check route
    app.route("/api/health-check").get(healthCheck);
};
