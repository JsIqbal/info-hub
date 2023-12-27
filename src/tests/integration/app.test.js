const path = require("path");
const request = require("supertest");

describe("Application Startup", () => {
    it("should start the application without errors", async () => {
        const app = require(path.join(
            process.cwd(),
            "src/config/lib/express"
        ))();

        const response = await request(app).get("/api/health-check");

        // Assertions based on the expected behavior
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ status: "ok" });
    });
});
