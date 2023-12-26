const path = require("path");

const { search } = require(path.join(
    process.cwd(),
    "src/modules/platform/search/search.controller"
));

module.exports = (app) => {
    app.route("/api/search").get(search);
};
