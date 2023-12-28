const path = require("path");
const axios = require("axios");
const mysql = require("mysql2/promise");

const nodeCache = require(path.join(process.cwd(), "src/config/lib/nodecache"));
const config = require(path.join(process.cwd(), "src/config"));

const logger = config.getLogger();

async function createDatabase() {
    const DB_NAME = nodeCache.getValue("DB_NAME");
    const DB_HOST = nodeCache.getValue("DB_HOST");
    const DB_USER = nodeCache.getValue("DB_USER");
    const DB_PASSWORD = nodeCache.getValue("DB_PASSWORD");

    const connection = await mysql.createConnection({
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
    });

    try {
        await connection.query(`CREATE DATABASE IF NOT EXISTS ${DB_NAME};`);
        logger.info(`Database ${DB_NAME} created successfully.`);
    } catch (error) {
        logger.error("Error creating database:", error);
    } finally {
        await connection.end();
        logger.info("Database connection closed.");
    }
}

async function seedDatabase() {
    const sequelize = require(path.join(
        process.cwd(),
        "src/config/lib/sequelize"
    ));
    const transaction = await sequelize.transaction();

    try {
        const UserSearch = require(path.join(
            process.cwd(),
            "src/modules/platform/search/search.model"
        ));
        const Match = require(path.join(
            process.cwd(),
            "src/modules/platform/search/match.model"
        ));

        await sequelize.sync({ force: true });
        logger.info("Cleared existing data.");

        const EXTERNAL_API = nodeCache.getValue("EXTERNAL_API");
        const externalApiResponse = await axios.get(EXTERNAL_API);
        const posts = externalApiResponse.data;
        logger.info("Fetched external API data.");

        const userSearch = await UserSearch.create(
            {
                keyword: "mango",
            },
            { transaction }
        );

        const matchingPosts = posts.filter(
            (post) =>
                post.title.includes(userSearch.keyword) ||
                post.body.includes(userSearch.keyword)
        );

        const matchPromises = matchingPosts.map((post) =>
            Match.create(
                {
                    postId: post.id,
                    userId: post.userId,
                    keyword: userSearch.keyword,
                    userSearchId: userSearch.id,
                },
                { transaction }
            )
        );

        await Promise.all(matchPromises);

        await transaction.commit();
        logger.info("Transaction committed.");
        logger.info("Database seeded successfully.");
    } catch (error) {
        await transaction.rollback();
        logger.error("Error seeding database:", error);
        throw error;
    } finally {
        await sequelize.close();
        logger.info("Database connection closed.");
    }
}

async function init() {
    try {
        await config.initEnvironmentVariables();
        await createDatabase();
        await seedDatabase();
        logger.info("DB seed completed");
    } catch (error) {
        logger.error("Error initializing seeder.js:", error);
        process.exit(1);
    }
}

init();
