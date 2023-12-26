const path = require("path");
const { DataTypes } = require("sequelize");

const sequelize = require(path.join(
    process.cwd(),
    "/src/config/lib/sequelize.js"
));

const UserSearch = sequelize.define("UserSearch", {
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
    },
    keyword: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
});

module.exports = UserSearch;
