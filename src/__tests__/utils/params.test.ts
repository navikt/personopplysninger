import { decodeRouteParam } from "@/utils/params";

describe("decodeRouteParam", () => {
    it("dekoder en URL-kodet id fra ruten", () => {
        expect(decodeRouteParam("2019-06-18T10%3A45%3A51.634")).toBe("2019-06-18T10:45:51.634");
    });

    it("returnerer verdien uendret når den ikke kan dekodes", () => {
        expect(decodeRouteParam("%E0%A4%A")).toBe("%E0%A4%A");
    });

    it("returnerer undefined når parameteren mangler", () => {
        expect(decodeRouteParam(undefined)).toBeUndefined();
    });
});
