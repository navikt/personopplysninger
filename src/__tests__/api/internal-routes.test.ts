import { GET as isAlive } from "@/pages/api/internal/isAlive";
import { GET as isReady } from "@/pages/api/internal/isReady";

describe("internal health routes", () => {
    it("isAlive responds with HTTP 200", async () => {
        const response = await isAlive({} as never);
        expect(response.status).toBe(200);
    });

    it("isReady responds with HTTP 200", async () => {
        const response = await isReady({} as never);
        expect(response.status).toBe(200);
    });
});
