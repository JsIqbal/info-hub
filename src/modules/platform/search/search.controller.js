const axios = require("axios");
const path = require("path");
const { getLogger } = require(path.join(process.cwd(), "src/config"));
const UserSearch = require(path.join(
    process.cwd(),
    "src/modules/platform/search/search.model"
));
const Match = require(path.join(
    process.cwd(),
    "src/modules/platform/search/match.model"
));

const search = async (req, res) => {
    const { keyword } = req.query;
    const logger = getLogger();

    try {
        // Fetch data from the external API
        const externalApiResponse = await axios.get(
            "https://jsonplaceholder.typicode.com/posts"
        );

        // Filter matching posts based on the keyword
        const matchingPosts = externalApiResponse.data.filter(
            (post) =>
                post.title.includes(keyword) || post.body.includes(keyword)
        );

        // Save user search
        const userSearch = await UserSearch.create({ keyword });

        // Save matches
        const matchPromises = matchingPosts.map(async (post) => {
            const match = await Match.create({
                postId: post.id,
                userId: post.userId,
                keyword,
                userSearchId: userSearch.dataValues.id, // Set the association
            });
            return match;
        });

        await Promise.all(matchPromises);

        logger.info("Saved user search & matching results");
        res.json(matchingPosts);
    } catch (error) {
        logger.error("Error during search:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports.search = search;
