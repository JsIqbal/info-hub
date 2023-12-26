const path = require("path");
const axios = require("axios");

const nodeCache = require(path.join(process.cwd(), "src/config/lib/nodecache"));

async function init() {
    const config = require(path.join(process.cwd(), "src/config"));
    await config.initEnvironmentVariables();

    const sequelize = require(path.join(
        process.cwd(),
        "/src/config/lib/sequelize.js"
    ));

    const UserSearch = require(path.join(
        process.cwd(),
        "/src/modules/platform/search/search.model"
    ));
    const Match = require(path.join(
        process.cwd(),
        "/src/modules/platform/search/match.model"
    ));

    const logger = config.getLogger("Seeder");

    try {
        // Create tables if they don't exist
        await sequelize.sync();

        // Clear existing data
        await sequelize.sync({ force: true });
        logger.info("Cleared existing data.");

        // Seed external API data
        const EXTERNAL_API = nodeCache.getValue("EXTERNAL_API");
        const externalApiResponse = await axios.get(EXTERNAL_API);
        const posts = externalApiResponse.data;
        logger.info("Fetched external API data.");

        // Seed initial data
        const userSearch = await UserSearch.create({
            keyword: "ratione",
        });
        logger.info("Seeded initial data.");

        const matchingPosts = posts.filter(
            (post) =>
                post.title.includes(userSearch.keyword) ||
                post.body.includes(userSearch.keyword)
        );

        const matchPromises = matchingPosts.map((post) =>
            Match.create({
                postId: post.id,
                userId: post.userId,
                keyword: userSearch.keyword,
                userSearchId: userSearch.id, // Set the association
            })
        );

        await Promise.all(matchPromises);
        logger.info("Database seeded successfully.");
    } catch (error) {
        logger.error("Error seeding database:", error);
    } finally {
        // Close the connection after seeding
        await sequelize.close();
        logger.info("Database connection closed.");
    }
}

init()
    .then(() => {
        console.info("DB seed completed");
        process.exit();
    })
    .catch((err) => {
        console.error(err);
        process.exit(1); // Exit with an error code
    });
