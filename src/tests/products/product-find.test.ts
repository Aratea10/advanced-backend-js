import request from "supertest";
import { app } from "../../api";

describe("GET /products/:id", () => {
    test("Should return a 404 if product does not exist", async () => {
        const response = await request(app)
            .get("/products/6979135412042d553e7a8313")
            .send();

        expect(response.status).toBe(404);
        expect(response.body).toStrictEqual({
            message: "Product not found",
        });
    });

    test("Should return the requested product", () => { });
});
