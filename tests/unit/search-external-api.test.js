const path = require("path");
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

jest.mock("axios");

const { searchExternalAPI } = require(path.join(
    process.cwd(),
    "src/modules/platform/search/search.controller"
));

describe("searchExternalAPI", () => {
    it("should filter matching posts based on keyword", async () => {
        const keyword = "example";
        const mockPosts = [
            {
                id: 1,
                title: "Example Post 1",
                body: "This is an example post.",
            },
            { id: 2, title: "Another Post", body: "This post is not related." },
        ];

        axios.get.mockResolvedValue({ data: mockPosts });

        const apiUrl = process.env.EXTERNAL_API;

        const result = await searchExternalAPI(keyword);

        expect(axios.get).toHaveBeenCalledWith(apiUrl);
        expect(result).toEqual([mockPosts[0]]);
    });
});
