const path = require("path");
const { DataTypes } = require("sequelize");

const sequelize = require(path.join(
    process.cwd(),
    "src/config/lib/sequelize.js"
));

const UserSearch = require(path.join(
    process.cwd(),
    "src/modules/platform/search/search.model"
));

const Match = sequelize.define("Match", {
    id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
    },
    postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    keyword: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    body: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    userSearchId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
});

// Define the association
Match.belongsTo(UserSearch, { foreignKey: "userSearchId" });

module.exports = Match;
