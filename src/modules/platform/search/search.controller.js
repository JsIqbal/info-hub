const axios = require("axios");
const path = require("path");

const { getLogger } = require(path.join(process.cwd(), "src/config"));
const sequelize = require(path.join(process.cwd(), "src/config/lib/sequelize"));
const UserSearch = require(path.join(
    process.cwd(),
    "src/modules/platform/search/search.model"
));
const Match = require(path.join(
    process.cwd(),
    "src/modules/platform/search/match.model"
));

// External API interaction and Keyword Search Logic
const searchExternalAPI = async (keyword) => {
    const externalApiResponse = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
    );
    return externalApiResponse.data.filter(
        (post) => post.title.includes(keyword) || post.body.includes(keyword)
    );
};

// Database Operations and Transaction Management
const saveSearchResults = async (keyword, matchingPosts) => {
    const transaction = await sequelize.transaction();

    try {
        const userSearch = await UserSearch.create(
            { keyword },
            { transaction }
        );

        const matchPromises = matchingPosts.map(async (post) => {
            const match = await Match.create(
                {
                    postId: post.id,
                    userId: post.userId,
                    title: post.title,
                    body: post.body,
                    keyword,
                    userSearchId: userSearch.id,
                },
                { transaction }
            );
            return match;
        });

        await Promise.all(matchPromises);

        await transaction.commit();
        return userSearch;
    } catch (error) {
        await transaction.rollback();
        throw error;
    }
};

// Search function orchestrating the flow
const search = async (req, res) => {
    const { keyword } = req.query;
    const logger = getLogger();

    try {
        const matchingPosts = await searchExternalAPI(keyword);
        const userSearch = await saveSearchResults(keyword, matchingPosts);

        logger.info(
            `Saved user search & matching results for keyword: ${keyword}`
        );

        res.json(matchingPosts);
    } catch (error) {
        logger.error(`Error during search for keyword: ${keyword}`);

        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports.search = search;
